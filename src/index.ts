import './components/chronicle-card';
import './components/chronicle-editor';
import { CARD_NAME, CARD_VERSION } from './constants';

// Register card with HA card picker
const windowWithCards = window as any;
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
  type: CARD_NAME,
  name: 'Chronicle Card',
  description: 'A universal, extensible timeline card for Home Assistant',
  preview: true,
  documentationURL: 'https://github.com/chronicle-card/chronicle-card',
});

console.info(
  `%c CHRONICLE-CARD %c v${CARD_VERSION} `,
  'color: #fff; background: #2196F3; font-weight: 700; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #2196F3; background: #e3f2fd; font-weight: 500; padding: 2px 6px; border-radius: 0 4px 4px 0;',
);
