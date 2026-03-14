import { HomeAssistant } from '../types';

const JINJA_RE = /\{[%{]/;
const BATCH_DELIMITER = '|||DELIM|||';
const TEMPLATE_TIMEOUT = 5000;
const BATCH_CHUNK_SIZE = 50;

/** True if `str` contains Jinja2 template syntax. */
export function isJinjaTemplate(str: string): boolean {
  return JINJA_RE.test(str);
}

export interface TemplateContext {
  entity_id: string;
  state: string;
  old_state: string;
  timestamp: string;
  attributes: Record<string, unknown>;
  source_name: string;
}

/**
 * Render a single Jinja2 template via the HA WebSocket `render_template` call.
 * Subscribes, grabs the first result, then unsubscribes. Times out after 5s.
 */
export async function renderTemplate(
  hass: HomeAssistant,
  template: string,
  variables: Record<string, unknown> = {},
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let unsub: (() => void) | undefined;
    let settled = false;

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        unsub?.();
        reject(new Error('Template render timed out'));
      }
    }, TEMPLATE_TIMEOUT);

    hass.connection
      .subscribeMessage<{ result: string }>(
        (msg) => {
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            unsub?.();
            resolve(msg.result);
          }
        },
        { type: 'render_template', template, variables },
      )
      .then((u) => {
        unsub = u;
        // If already settled (e.g. result came before promise resolved), clean up
        if (settled) unsub();
      })
      .catch((err) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          reject(err);
        }
      });
  });
}

/**
 * Render a user template for multiple event contexts in a single WS call.
 *
 * Wraps the user template in a Jinja2 `{% for %}` loop, passing an `_events`
 * array as variables, and splits the result by a delimiter.
 */
export async function renderTemplateBatch(
  hass: HomeAssistant,
  userTemplate: string,
  contexts: TemplateContext[],
): Promise<string[]> {
  if (contexts.length === 0) return [];

  // Process in chunks to avoid oversized WS messages
  const allResults: string[] = [];

  for (let i = 0; i < contexts.length; i += BATCH_CHUNK_SIZE) {
    const chunk = contexts.slice(i, i + BATCH_CHUNK_SIZE);
    const results = await _renderChunk(hass, userTemplate, chunk);
    allResults.push(...results);
  }

  return allResults;
}

async function _renderChunk(
  hass: HomeAssistant,
  userTemplate: string,
  contexts: TemplateContext[],
): Promise<string[]> {
  // Build batch template:
  // {% for _ctx in _events %}
  //   {% set entity_id = _ctx.entity_id %}{% set state = _ctx.state %}...
  //   {{ USER_TEMPLATE }}{% if not loop.last %}|||DELIM|||{% endif %}
  // {% endfor %}
  const batchTemplate = [
    '{% for _ctx in _events %}',
    '{% set entity_id = _ctx.entity_id %}',
    '{% set state = _ctx.state %}',
    '{% set old_state = _ctx.old_state %}',
    '{% set timestamp = _ctx.timestamp %}',
    '{% set attributes = _ctx.attributes %}',
    '{% set source_name = _ctx.source_name %}',
    userTemplate,
    `{% if not loop.last %}${BATCH_DELIMITER}{% endif %}`,
    '{% endfor %}',
  ].join('');

  try {
    const raw = await renderTemplate(hass, batchTemplate, { _events: contexts });
    return raw.split(BATCH_DELIMITER).map((s) => s.trim());
  } catch (err) {
    console.warn('[chronicle-card] Batch template render failed:', err);
    return contexts.map(() => '');
  }
}
