import { HomeAssistant } from '../types';

const JINJA_RE = /\{[%{]/;
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
 * Render a user template for multiple event contexts.
 *
 * Each context is rendered individually via HA's `render_template` WS call,
 * passing variables directly so they're available at the top-level Jinja2 scope.
 * Processes in parallel chunks to balance speed and WS load.
 */
export async function renderTemplateBatch(
  hass: HomeAssistant,
  userTemplate: string,
  contexts: TemplateContext[],
): Promise<string[]> {
  if (contexts.length === 0) return [];

  const allResults: string[] = [];

  for (let i = 0; i < contexts.length; i += BATCH_CHUNK_SIZE) {
    const chunk = contexts.slice(i, i + BATCH_CHUNK_SIZE);
    const results = await Promise.allSettled(
      chunk.map((ctx) => renderTemplate(hass, userTemplate, { ...ctx })),
    );
    for (const r of results) {
      allResults.push(r.status === 'fulfilled' ? r.value.trim() : '');
    }
  }

  return allResults;
}
