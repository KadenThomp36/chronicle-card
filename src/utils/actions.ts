import { ChronicleAction, ChronicleEvent } from '../models/event';
import { ActionConfig } from '../models/config';
import { expandActionConfig } from './action-placeholders';

/**
 * Hand an action to Home Assistant's own handler via the `hass-action` event,
 * so every native action type works — perform-action (with confirmation),
 * navigate, url, toggle, more-info, assist, fire-dom-event — exactly as in
 * built-in cards. `{field}` placeholders are expanded against the event first.
 */
export function fireHassAction(
  node: HTMLElement,
  event: ChronicleEvent,
  action: ActionConfig,
  which: 'tap' | 'hold' = 'tap',
): void {
  const config = expandActionConfig(action, event);
  if (config.action === 'more-info' && !event.entityId && !config.entity) return;
  node.dispatchEvent(
    new CustomEvent('hass-action', {
      bubbles: true,
      composed: true,
      detail: {
        config: { entity: event.entityId, [`${which}_action`]: config },
        action: which,
      },
    }),
  );
}

/** Native action config for an action button (legacy `type:` shapes mapped). */
export function buttonActionConfig(button: ChronicleAction): ActionConfig | undefined {
  const { label: _label, icon: _icon, type, serviceData, url, eventType: _et, eventData: _ed, ...rest } = button;
  if (button.action) return rest as ActionConfig;
  switch (type) {
    case 'service':
      return button.service
        ? { action: 'perform-action', perform_action: button.service, data: serviceData, target: button.target }
        : undefined;
    case 'navigate':
      if (!url) return undefined;
      return /^https?:\/\//.test(url)
        ? { action: 'url', url_path: url }
        : { action: 'navigate', navigation_path: url };
    default:
      return undefined;
  }
}

/**
 * Run an event's tap/hold action. No config (or `default`) means tap opens
 * Chronicle's detail dialog and hold does nothing.
 */
export function handleEventAction(node: HTMLElement, event: ChronicleEvent, which: 'tap' | 'hold'): void {
  const config = which === 'hold' ? event.holdAction : event.tapAction;
  if (!config || config.action === 'default') {
    if (which === 'tap') {
      node.dispatchEvent(new CustomEvent('chronicle-show-detail', {
        bubbles: true,
        composed: true,
        detail: { event },
      }));
    }
    return;
  }
  fireHassAction(node, event, config, which);
}
