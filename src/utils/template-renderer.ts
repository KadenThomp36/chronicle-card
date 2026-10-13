import { HomeAssistant } from '../types';

const JINJA_RE = /\{[%{]/;
const TEMPLATE_TIMEOUT = 5000;

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
 * Render a Jinja2 template once via HA's `render_template` subscription:
 * take the first result, then unsubscribe (the server otherwise keeps
 * re-rendering on every dependency change). Times out after 5s.
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
        { type: 'render_template', template, variables, timeout: TEMPLATE_TIMEOUT / 1000 },
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
