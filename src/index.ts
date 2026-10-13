import './components/chronicle-card';
import './components/chronicle-editor';
import { CARD_NAME, CARD_VERSION } from './constants';
import { HomeAssistant } from './types';

/** Domains whose state changes read naturally as a timeline. */
const SUGGEST_HISTORY = /^(binary_sensor|lock|cover|person|device_tracker|alarm_control_panel|climate|vacuum)\./;

// Register card with HA card picker
const windowWithCards = window as unknown as { customCards?: unknown[] };
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
  type: CARD_NAME,
  name: 'Chronicle Card',
  description: 'A universal, extensible timeline card for Home Assistant',
  preview: true,
  documentationURL: 'https://github.com/KadenThomp36/chronicle-card',
  // HA 2026.6+: offer the card under "Community" when adding a card for an entity
  getEntitySuggestion: (hass: HomeAssistant, entityId: string) => {
    const name = (hass.states[entityId]?.attributes?.friendly_name as string) || entityId;
    if (entityId.startsWith('calendar.')) {
      return { config: { type: `custom:${CARD_NAME}`, title: name, days_forward: 7, sources: [{ type: 'calendar', entity: entityId }] } };
    }
    if (SUGGEST_HISTORY.test(entityId)) {
      return { config: { type: `custom:${CARD_NAME}`, title: name, sources: [{ type: 'history', entities: [entityId] }] } };
    }
    return null;
  },
});

console.info(
  `%c CHRONICLE-CARD %c v${CARD_VERSION} `,
  'color: #fff; background: #2196F3; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #2196F3; background: #e3f2fd; font-weight: 500; padding: 2px 6px; border-radius: 0 4px 4px 0;',
);
