/**
 * Localisation module for the Chronicle Card.
 *
 * Provides translated strings for the card UI.  When a requested key or
 * language is missing, the function falls back to English.
 */

type TranslationDict = Record<string, string>;

const translations: Record<string, TranslationDict> = {
  // -----------------------------------------------------------------------
  // English (default / fallback)
  // -----------------------------------------------------------------------
  en: {
    'chronicle.no_events': 'No events',
    'chronicle.group_events': '{count} {label} events',

    // Detail dialog
    'chronicle.detail.more_info': 'More Info',
    'chronicle.detail.entity': 'Entity',
    'chronicle.detail.entity_id': 'Entity ID',
    'chronicle.detail.source': 'Source',
    'chronicle.detail.start': 'Start',
    'chronicle.detail.end': 'End',
    'chronicle.detail.location': 'Location',
    'chronicle.detail.open_clip': 'Open clip',
    'chronicle.detail.close': 'Close',

    // Severity levels
    'chronicle.severity.critical': 'Critical',
    'chronicle.severity.warning': 'Warning',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Debug',
  },

  // -----------------------------------------------------------------------
  // German
  // -----------------------------------------------------------------------
  de: {
    'chronicle.no_events': 'Keine Ereignisse',
    'chronicle.group_events': '{count} {label} Ereignisse',

    // Detail dialog
    'chronicle.detail.more_info': 'Mehr Infos',
    'chronicle.detail.entity': 'Entität',
    'chronicle.detail.entity_id': 'Entitäts-ID',
    'chronicle.detail.source': 'Quelle',
    'chronicle.detail.start': 'Start',
    'chronicle.detail.end': 'Ende',
    'chronicle.detail.location': 'Ort',
    'chronicle.detail.open_clip': 'Clip öffnen',
    'chronicle.detail.close': 'Schließen',

    'chronicle.severity.critical': 'Kritisch',
    'chronicle.severity.warning': 'Warnung',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Debug',
  },

  // -----------------------------------------------------------------------
  // French
  // -----------------------------------------------------------------------
  fr: {
    'chronicle.no_events': "Aucun événement",
    'chronicle.group_events': '{count} événements {label}',

    // Detail dialog
    'chronicle.detail.more_info': 'Plus d\'infos',
    'chronicle.detail.entity': 'Entité',
    'chronicle.detail.entity_id': 'ID d\'entité',
    'chronicle.detail.source': 'Source',
    'chronicle.detail.start': 'Début',
    'chronicle.detail.end': 'Fin',
    'chronicle.detail.location': 'Lieu',
    'chronicle.detail.open_clip': 'Ouvrir le clip',
    'chronicle.detail.close': 'Fermer',

    'chronicle.severity.critical': 'Critique',
    'chronicle.severity.warning': 'Avertissement',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Débogage',
  },

  // -----------------------------------------------------------------------
  // Spanish
  // -----------------------------------------------------------------------
  es: {
    'chronicle.no_events': 'Sin eventos',
    'chronicle.group_events': '{count} eventos de {label}',

    // Detail dialog
    'chronicle.detail.more_info': 'Más información',
    'chronicle.detail.entity': 'Entidad',
    'chronicle.detail.entity_id': 'ID de entidad',
    'chronicle.detail.source': 'Fuente',
    'chronicle.detail.start': 'Inicio',
    'chronicle.detail.end': 'Fin',
    'chronicle.detail.location': 'Ubicación',
    'chronicle.detail.open_clip': 'Abrir clip',
    'chronicle.detail.close': 'Cerrar',

    'chronicle.severity.critical': 'Crítico',
    'chronicle.severity.warning': 'Advertencia',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Depuración',
  },

  // -----------------------------------------------------------------------
  // Italian
  // -----------------------------------------------------------------------
  it: {
    'chronicle.no_events': 'Nessun evento',
    'chronicle.group_events': '{count} eventi {label}',

    // Detail dialog
    'chronicle.detail.more_info': 'Maggiori info',
    'chronicle.detail.entity': 'Entità',
    'chronicle.detail.entity_id': 'ID entità',
    'chronicle.detail.source': 'Sorgente',
    'chronicle.detail.start': 'Inizio',
    'chronicle.detail.end': 'Fine',
    'chronicle.detail.location': 'Luogo',
    'chronicle.detail.open_clip': 'Apri clip',
    'chronicle.detail.close': 'Chiudi',

    'chronicle.severity.critical': 'Critico',
    'chronicle.severity.warning': 'Avviso',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Debug',
  },

  // -----------------------------------------------------------------------
  // Portuguese
  // -----------------------------------------------------------------------
  pt: {
    'chronicle.no_events': 'Sem eventos',
    'chronicle.group_events': '{count} eventos de {label}',

    // Detail dialog
    'chronicle.detail.more_info': 'Mais informações',
    'chronicle.detail.entity': 'Entidade',
    'chronicle.detail.entity_id': 'ID da entidade',
    'chronicle.detail.source': 'Fonte',
    'chronicle.detail.start': 'Início',
    'chronicle.detail.end': 'Fim',
    'chronicle.detail.location': 'Local',
    'chronicle.detail.open_clip': 'Abrir clipe',
    'chronicle.detail.close': 'Fechar',

    'chronicle.severity.critical': 'Crítico',
    'chronicle.severity.warning': 'Aviso',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Depuração',
  },

  // -----------------------------------------------------------------------
  // Dutch
  // -----------------------------------------------------------------------
  nl: {
    'chronicle.no_events': 'Geen gebeurtenissen',
    'chronicle.group_events': '{count} {label} gebeurtenissen',

    // Detail dialog
    'chronicle.detail.more_info': 'Meer info',
    'chronicle.detail.entity': 'Entiteit',
    'chronicle.detail.entity_id': 'Entiteits-ID',
    'chronicle.detail.source': 'Bron',
    'chronicle.detail.start': 'Start',
    'chronicle.detail.end': 'Einde',
    'chronicle.detail.location': 'Locatie',
    'chronicle.detail.open_clip': 'Clip openen',
    'chronicle.detail.close': 'Sluiten',

    'chronicle.severity.critical': 'Kritiek',
    'chronicle.severity.warning': 'Waarschuwing',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Debug',
  },

  // -----------------------------------------------------------------------
  // Swedish
  // -----------------------------------------------------------------------
  sv: {
    'chronicle.no_events': 'Inga händelser',
    'chronicle.group_events': '{count} {label}-händelser',

    // Detail dialog
    'chronicle.detail.more_info': 'Mer info',
    'chronicle.detail.entity': 'Entitet',
    'chronicle.detail.entity_id': 'Entitets-ID',
    'chronicle.detail.source': 'Källa',
    'chronicle.detail.start': 'Start',
    'chronicle.detail.end': 'Slut',
    'chronicle.detail.location': 'Plats',
    'chronicle.detail.open_clip': 'Öppna klipp',
    'chronicle.detail.close': 'Stäng',

    'chronicle.severity.critical': 'Kritisk',
    'chronicle.severity.warning': 'Varning',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Felsökning',
  },

  // -----------------------------------------------------------------------
  // Polish
  // -----------------------------------------------------------------------
  pl: {
    'chronicle.no_events': 'Brak zdarzeń',
    'chronicle.group_events': '{count} zdarzeń: {label}',

    // Detail dialog
    'chronicle.detail.more_info': 'Więcej informacji',
    'chronicle.detail.entity': 'Encja',
    'chronicle.detail.entity_id': 'ID encji',
    'chronicle.detail.source': 'Źródło',
    'chronicle.detail.start': 'Początek',
    'chronicle.detail.end': 'Koniec',
    'chronicle.detail.location': 'Lokalizacja',
    'chronicle.detail.open_clip': 'Otwórz klip',
    'chronicle.detail.close': 'Zamknij',

    // Severity levels
    'chronicle.severity.critical': 'Krytyczny',
    'chronicle.severity.warning': 'Ostrzeżenie',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Debug',
  },
};

/**
 * Look up a translated string by key.
 *
 * @param key      Dot-separated translation key, e.g. 'chronicle.today'
 * @param language BCP-47 language code (e.g. 'en', 'de'). Defaults to 'en'.
 * @returns        The translated string, or the English fallback, or the raw
 *                 key if no translation exists at all.
 */
/**
 * Module-level active language. Set by <chronicle-card> from
 * `config.language` (override) or `hass.locale.language` / `hass.language`
 * (auto-detect), so pure helpers like date-utils can localize without
 * threading a language parameter through every call site.
 */
let currentLanguage = 'en';

export function setLocale(language: string): void {
  currentLanguage = language || 'en';
}

export function getLocale(): string {
  return currentLanguage;
}

export function localize(key: string, language?: string): string {
  const lang = language ?? currentLanguage;

  // Try the exact requested language
  const langDict = translations[lang];
  if (langDict && langDict[key] !== undefined) {
    return langDict[key];
  }

  // Try just the base language code (e.g. 'pt' from 'pt-BR')
  const baseLang = lang.split('-')[0];
  if (baseLang !== lang) {
    const baseDict = translations[baseLang];
    if (baseDict && baseDict[key] !== undefined) {
      return baseDict[key];
    }
  }

  // Fall back to English
  const enDict = translations.en;
  if (enDict && enDict[key] !== undefined) {
    return enDict[key];
  }

  // Final fallback: return the raw key
  return key;
}

/**
 * Get all supported language codes.
 */
export function getSupportedLanguages(): string[] {
  return Object.keys(translations);
}
