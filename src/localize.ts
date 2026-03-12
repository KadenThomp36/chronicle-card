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
    'chronicle.today': 'Today',
    'chronicle.yesterday': 'Yesterday',
    'chronicle.no_events': 'No events',
    'chronicle.events_count': '{count} events',
    'chronicle.group_summary': '{count} similar events',
    'chronicle.loading': 'Loading...',
    'chronicle.error': 'Error loading events',
    'chronicle.refresh': 'Refresh',

    // Severity levels
    'chronicle.severity.critical': 'Critical',
    'chronicle.severity.warning': 'Warning',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Debug',

    // Time labels
    'chronicle.time.just_now': 'just now',
    'chronicle.time.minutes_ago': '{count} min ago',
    'chronicle.time.hours_ago': '{count}h ago',
    'chronicle.time.yesterday': 'Yesterday',

    // Editor labels
    'chronicle.editor.title': 'Title',
    'chronicle.editor.layout': 'Layout',
    'chronicle.editor.layout_vertical': 'Vertical',
    'chronicle.editor.layout_horizontal': 'Horizontal',
    'chronicle.editor.sources': 'Sources',
    'chronicle.editor.add_source': 'Add source',
    'chronicle.editor.remove_source': 'Remove source',
    'chronicle.editor.source_type': 'Source type',
    'chronicle.editor.entity': 'Entity',
    'chronicle.editor.entities': 'Entities',
    'chronicle.editor.filters': 'Filters',
    'chronicle.editor.categories': 'Categories',
    'chronicle.editor.severities': 'Severities',
    'chronicle.editor.search': 'Search',
    'chronicle.editor.grouping': 'Grouping',
    'chronicle.editor.group_by': 'Group by',
    'chronicle.editor.appearance': 'Appearance',
    'chronicle.editor.card_height': 'Card height',
    'chronicle.editor.compact': 'Compact mode',
    'chronicle.editor.show_images': 'Show images',
    'chronicle.editor.show_icons': 'Show icons',
    'chronicle.editor.show_header': 'Show header',
    'chronicle.editor.max_events': 'Max events',
    'chronicle.editor.days_back': 'Days back',
    'chronicle.editor.time_format': 'Time format',
    'chronicle.editor.language': 'Language',
    'chronicle.editor.severity_colors': 'Severity colors',
    'chronicle.editor.animate_new': 'Animate new events',
    'chronicle.editor.show_severity_badge': 'Show severity badge',
    'chronicle.editor.show_source_badge': 'Show source badge',
    'chronicle.editor.show_layout_toggle': 'Show layout toggle',
  },

  // -----------------------------------------------------------------------
  // German
  // -----------------------------------------------------------------------
  de: {
    'chronicle.today': 'Heute',
    'chronicle.yesterday': 'Gestern',
    'chronicle.no_events': 'Keine Ereignisse',
    'chronicle.events_count': '{count} Ereignisse',
    'chronicle.group_summary': '{count} ähnliche Ereignisse',
    'chronicle.loading': 'Laden...',
    'chronicle.error': 'Fehler beim Laden',
    'chronicle.refresh': 'Aktualisieren',

    'chronicle.severity.critical': 'Kritisch',
    'chronicle.severity.warning': 'Warnung',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Debug',

    'chronicle.time.just_now': 'gerade eben',
    'chronicle.time.minutes_ago': 'vor {count} Min.',
    'chronicle.time.hours_ago': 'vor {count} Std.',
    'chronicle.time.yesterday': 'Gestern',

    'chronicle.editor.title': 'Titel',
    'chronicle.editor.layout': 'Layout',
    'chronicle.editor.layout_vertical': 'Vertikal',
    'chronicle.editor.layout_horizontal': 'Horizontal',
    'chronicle.editor.sources': 'Quellen',
    'chronicle.editor.add_source': 'Quelle hinzufügen',
    'chronicle.editor.remove_source': 'Quelle entfernen',
    'chronicle.editor.source_type': 'Quellentyp',
    'chronicle.editor.entity': 'Entität',
    'chronicle.editor.entities': 'Entitäten',
    'chronicle.editor.filters': 'Filter',
    'chronicle.editor.categories': 'Kategorien',
    'chronicle.editor.severities': 'Schweregrade',
    'chronicle.editor.search': 'Suche',
    'chronicle.editor.grouping': 'Gruppierung',
    'chronicle.editor.group_by': 'Gruppieren nach',
    'chronicle.editor.appearance': 'Darstellung',
    'chronicle.editor.card_height': 'Kartenhöhe',
    'chronicle.editor.compact': 'Kompaktmodus',
    'chronicle.editor.show_images': 'Bilder anzeigen',
    'chronicle.editor.show_icons': 'Icons anzeigen',
    'chronicle.editor.show_header': 'Kopfzeile anzeigen',
    'chronicle.editor.max_events': 'Max. Ereignisse',
    'chronicle.editor.days_back': 'Tage zurück',
    'chronicle.editor.time_format': 'Zeitformat',
    'chronicle.editor.language': 'Sprache',
    'chronicle.editor.severity_colors': 'Schweregradfarben',
    'chronicle.editor.animate_new': 'Neue Ereignisse animieren',
    'chronicle.editor.show_severity_badge': 'Schweregrad-Badge anzeigen',
    'chronicle.editor.show_source_badge': 'Quellen-Badge anzeigen',
    'chronicle.editor.show_layout_toggle': 'Layout-Umschalter anzeigen',
  },

  // -----------------------------------------------------------------------
  // French
  // -----------------------------------------------------------------------
  fr: {
    'chronicle.today': "Aujourd'hui",
    'chronicle.yesterday': 'Hier',
    'chronicle.no_events': "Aucun événement",
    'chronicle.events_count': '{count} événements',
    'chronicle.group_summary': '{count} événements similaires',
    'chronicle.loading': 'Chargement...',
    'chronicle.error': 'Erreur de chargement',
    'chronicle.refresh': 'Actualiser',

    'chronicle.severity.critical': 'Critique',
    'chronicle.severity.warning': 'Avertissement',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Débogage',

    'chronicle.time.just_now': "à l'instant",
    'chronicle.time.minutes_ago': 'il y a {count} min',
    'chronicle.time.hours_ago': 'il y a {count}h',
    'chronicle.time.yesterday': 'Hier',

    'chronicle.editor.title': 'Titre',
    'chronicle.editor.layout': 'Disposition',
    'chronicle.editor.layout_vertical': 'Vertical',
    'chronicle.editor.layout_horizontal': 'Horizontal',
    'chronicle.editor.sources': 'Sources',
    'chronicle.editor.add_source': 'Ajouter une source',
    'chronicle.editor.remove_source': 'Supprimer la source',
    'chronicle.editor.source_type': 'Type de source',
    'chronicle.editor.entity': 'Entité',
    'chronicle.editor.entities': 'Entités',
    'chronicle.editor.filters': 'Filtres',
    'chronicle.editor.categories': 'Catégories',
    'chronicle.editor.severities': 'Sévérités',
    'chronicle.editor.search': 'Recherche',
    'chronicle.editor.grouping': 'Regroupement',
    'chronicle.editor.group_by': 'Grouper par',
    'chronicle.editor.appearance': 'Apparence',
    'chronicle.editor.card_height': 'Hauteur de la carte',
    'chronicle.editor.compact': 'Mode compact',
    'chronicle.editor.show_images': 'Afficher les images',
    'chronicle.editor.show_icons': 'Afficher les icônes',
    'chronicle.editor.show_header': "Afficher l'en-tête",
    'chronicle.editor.max_events': "Nombre max d'événements",
    'chronicle.editor.days_back': 'Jours en arrière',
    'chronicle.editor.time_format': 'Format horaire',
    'chronicle.editor.language': 'Langue',
    'chronicle.editor.severity_colors': 'Couleurs de sévérité',
    'chronicle.editor.animate_new': 'Animer les nouveaux événements',
    'chronicle.editor.show_severity_badge': 'Afficher le badge de sévérité',
    'chronicle.editor.show_source_badge': 'Afficher le badge de source',
    'chronicle.editor.show_layout_toggle': "Afficher le bouton de disposition",
  },

  // -----------------------------------------------------------------------
  // Spanish
  // -----------------------------------------------------------------------
  es: {
    'chronicle.today': 'Hoy',
    'chronicle.yesterday': 'Ayer',
    'chronicle.no_events': 'Sin eventos',
    'chronicle.events_count': '{count} eventos',
    'chronicle.group_summary': '{count} eventos similares',
    'chronicle.loading': 'Cargando...',
    'chronicle.error': 'Error al cargar',
    'chronicle.refresh': 'Actualizar',

    'chronicle.severity.critical': 'Crítico',
    'chronicle.severity.warning': 'Advertencia',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Depuración',

    'chronicle.time.just_now': 'ahora mismo',
    'chronicle.time.minutes_ago': 'hace {count} min',
    'chronicle.time.hours_ago': 'hace {count}h',
    'chronicle.time.yesterday': 'Ayer',

    'chronicle.editor.title': 'Título',
    'chronicle.editor.layout': 'Diseño',
    'chronicle.editor.layout_vertical': 'Vertical',
    'chronicle.editor.layout_horizontal': 'Horizontal',
    'chronicle.editor.sources': 'Fuentes',
    'chronicle.editor.add_source': 'Añadir fuente',
    'chronicle.editor.remove_source': 'Eliminar fuente',
    'chronicle.editor.source_type': 'Tipo de fuente',
    'chronicle.editor.entity': 'Entidad',
    'chronicle.editor.entities': 'Entidades',
    'chronicle.editor.filters': 'Filtros',
    'chronicle.editor.categories': 'Categorías',
    'chronicle.editor.severities': 'Severidades',
    'chronicle.editor.search': 'Buscar',
    'chronicle.editor.grouping': 'Agrupación',
    'chronicle.editor.group_by': 'Agrupar por',
    'chronicle.editor.appearance': 'Apariencia',
    'chronicle.editor.card_height': 'Altura de la tarjeta',
    'chronicle.editor.compact': 'Modo compacto',
    'chronicle.editor.show_images': 'Mostrar imágenes',
    'chronicle.editor.show_icons': 'Mostrar iconos',
    'chronicle.editor.show_header': 'Mostrar encabezado',
    'chronicle.editor.max_events': 'Máx. eventos',
    'chronicle.editor.days_back': 'Días atrás',
    'chronicle.editor.time_format': 'Formato de hora',
    'chronicle.editor.language': 'Idioma',
    'chronicle.editor.severity_colors': 'Colores de severidad',
    'chronicle.editor.animate_new': 'Animar nuevos eventos',
    'chronicle.editor.show_severity_badge': 'Mostrar insignia de severidad',
    'chronicle.editor.show_source_badge': 'Mostrar insignia de fuente',
    'chronicle.editor.show_layout_toggle': 'Mostrar cambio de diseño',
  },

  // -----------------------------------------------------------------------
  // Italian
  // -----------------------------------------------------------------------
  it: {
    'chronicle.today': 'Oggi',
    'chronicle.yesterday': 'Ieri',
    'chronicle.no_events': 'Nessun evento',
    'chronicle.events_count': '{count} eventi',
    'chronicle.group_summary': '{count} eventi simili',
    'chronicle.loading': 'Caricamento...',
    'chronicle.error': 'Errore di caricamento',
    'chronicle.refresh': 'Aggiorna',

    'chronicle.severity.critical': 'Critico',
    'chronicle.severity.warning': 'Avviso',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Debug',

    'chronicle.time.just_now': 'proprio ora',
    'chronicle.time.minutes_ago': '{count} min fa',
    'chronicle.time.hours_ago': '{count}h fa',
    'chronicle.time.yesterday': 'Ieri',

    'chronicle.editor.title': 'Titolo',
    'chronicle.editor.layout': 'Layout',
    'chronicle.editor.layout_vertical': 'Verticale',
    'chronicle.editor.layout_horizontal': 'Orizzontale',
    'chronicle.editor.sources': 'Fonti',
    'chronicle.editor.add_source': 'Aggiungi fonte',
    'chronicle.editor.remove_source': 'Rimuovi fonte',
    'chronicle.editor.source_type': 'Tipo di fonte',
    'chronicle.editor.entity': 'Entità',
    'chronicle.editor.entities': 'Entità',
    'chronicle.editor.filters': 'Filtri',
    'chronicle.editor.categories': 'Categorie',
    'chronicle.editor.severities': 'Severità',
    'chronicle.editor.search': 'Cerca',
    'chronicle.editor.grouping': 'Raggruppamento',
    'chronicle.editor.group_by': 'Raggruppa per',
    'chronicle.editor.appearance': 'Aspetto',
    'chronicle.editor.card_height': 'Altezza della scheda',
    'chronicle.editor.compact': 'Modalità compatta',
    'chronicle.editor.show_images': 'Mostra immagini',
    'chronicle.editor.show_icons': 'Mostra icone',
    'chronicle.editor.show_header': 'Mostra intestazione',
    'chronicle.editor.max_events': 'Max eventi',
    'chronicle.editor.days_back': 'Giorni indietro',
    'chronicle.editor.time_format': 'Formato ora',
    'chronicle.editor.language': 'Lingua',
    'chronicle.editor.severity_colors': 'Colori di severità',
    'chronicle.editor.animate_new': 'Anima nuovi eventi',
    'chronicle.editor.show_severity_badge': 'Mostra badge severità',
    'chronicle.editor.show_source_badge': 'Mostra badge fonte',
    'chronicle.editor.show_layout_toggle': 'Mostra pulsante layout',
  },

  // -----------------------------------------------------------------------
  // Portuguese
  // -----------------------------------------------------------------------
  pt: {
    'chronicle.today': 'Hoje',
    'chronicle.yesterday': 'Ontem',
    'chronicle.no_events': 'Sem eventos',
    'chronicle.events_count': '{count} eventos',
    'chronicle.group_summary': '{count} eventos semelhantes',
    'chronicle.loading': 'Carregando...',
    'chronicle.error': 'Erro ao carregar',
    'chronicle.refresh': 'Atualizar',

    'chronicle.severity.critical': 'Crítico',
    'chronicle.severity.warning': 'Aviso',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Depuração',

    'chronicle.time.just_now': 'agora mesmo',
    'chronicle.time.minutes_ago': 'há {count} min',
    'chronicle.time.hours_ago': 'há {count}h',
    'chronicle.time.yesterday': 'Ontem',

    'chronicle.editor.title': 'Título',
    'chronicle.editor.layout': 'Layout',
    'chronicle.editor.layout_vertical': 'Vertical',
    'chronicle.editor.layout_horizontal': 'Horizontal',
    'chronicle.editor.sources': 'Fontes',
    'chronicle.editor.add_source': 'Adicionar fonte',
    'chronicle.editor.remove_source': 'Remover fonte',
    'chronicle.editor.source_type': 'Tipo de fonte',
    'chronicle.editor.entity': 'Entidade',
    'chronicle.editor.entities': 'Entidades',
    'chronicle.editor.filters': 'Filtros',
    'chronicle.editor.categories': 'Categorias',
    'chronicle.editor.severities': 'Severidades',
    'chronicle.editor.search': 'Pesquisar',
    'chronicle.editor.grouping': 'Agrupamento',
    'chronicle.editor.group_by': 'Agrupar por',
    'chronicle.editor.appearance': 'Aparência',
    'chronicle.editor.card_height': 'Altura do cartão',
    'chronicle.editor.compact': 'Modo compacto',
    'chronicle.editor.show_images': 'Mostrar imagens',
    'chronicle.editor.show_icons': 'Mostrar ícones',
    'chronicle.editor.show_header': 'Mostrar cabeçalho',
    'chronicle.editor.max_events': 'Máx. eventos',
    'chronicle.editor.days_back': 'Dias atrás',
    'chronicle.editor.time_format': 'Formato de hora',
    'chronicle.editor.language': 'Idioma',
    'chronicle.editor.severity_colors': 'Cores de severidade',
    'chronicle.editor.animate_new': 'Animar novos eventos',
    'chronicle.editor.show_severity_badge': 'Mostrar distintivo de severidade',
    'chronicle.editor.show_source_badge': 'Mostrar distintivo de fonte',
    'chronicle.editor.show_layout_toggle': 'Mostrar botão de layout',
  },

  // -----------------------------------------------------------------------
  // Dutch
  // -----------------------------------------------------------------------
  nl: {
    'chronicle.today': 'Vandaag',
    'chronicle.yesterday': 'Gisteren',
    'chronicle.no_events': 'Geen gebeurtenissen',
    'chronicle.events_count': '{count} gebeurtenissen',
    'chronicle.group_summary': '{count} vergelijkbare gebeurtenissen',
    'chronicle.loading': 'Laden...',
    'chronicle.error': 'Fout bij laden',
    'chronicle.refresh': 'Vernieuwen',

    'chronicle.severity.critical': 'Kritiek',
    'chronicle.severity.warning': 'Waarschuwing',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Debug',

    'chronicle.time.just_now': 'zojuist',
    'chronicle.time.minutes_ago': '{count} min geleden',
    'chronicle.time.hours_ago': '{count}u geleden',
    'chronicle.time.yesterday': 'Gisteren',

    'chronicle.editor.title': 'Titel',
    'chronicle.editor.layout': 'Lay-out',
    'chronicle.editor.layout_vertical': 'Verticaal',
    'chronicle.editor.layout_horizontal': 'Horizontaal',
    'chronicle.editor.sources': 'Bronnen',
    'chronicle.editor.add_source': 'Bron toevoegen',
    'chronicle.editor.remove_source': 'Bron verwijderen',
    'chronicle.editor.source_type': 'Brontype',
    'chronicle.editor.entity': 'Entiteit',
    'chronicle.editor.entities': 'Entiteiten',
    'chronicle.editor.filters': 'Filters',
    'chronicle.editor.categories': 'Categorieën',
    'chronicle.editor.severities': 'Ernstniveaus',
    'chronicle.editor.search': 'Zoeken',
    'chronicle.editor.grouping': 'Groepering',
    'chronicle.editor.group_by': 'Groeperen op',
    'chronicle.editor.appearance': 'Uiterlijk',
    'chronicle.editor.card_height': 'Kaartrij hoogte',
    'chronicle.editor.compact': 'Compacte modus',
    'chronicle.editor.show_images': 'Afbeeldingen tonen',
    'chronicle.editor.show_icons': 'Iconen tonen',
    'chronicle.editor.show_header': 'Koptekst tonen',
    'chronicle.editor.max_events': 'Max. gebeurtenissen',
    'chronicle.editor.days_back': 'Dagen terug',
    'chronicle.editor.time_format': 'Tijdformaat',
    'chronicle.editor.language': 'Taal',
    'chronicle.editor.severity_colors': 'Ernstkleuren',
    'chronicle.editor.animate_new': 'Nieuwe gebeurtenissen animeren',
    'chronicle.editor.show_severity_badge': 'Ernstbadge tonen',
    'chronicle.editor.show_source_badge': 'Bronbadge tonen',
    'chronicle.editor.show_layout_toggle': 'Lay-outschakelaar tonen',
  },

  // -----------------------------------------------------------------------
  // Swedish
  // -----------------------------------------------------------------------
  sv: {
    'chronicle.today': 'Idag',
    'chronicle.yesterday': 'Igår',
    'chronicle.no_events': 'Inga händelser',
    'chronicle.events_count': '{count} händelser',
    'chronicle.group_summary': '{count} liknande händelser',
    'chronicle.loading': 'Laddar...',
    'chronicle.error': 'Fel vid laddning',
    'chronicle.refresh': 'Uppdatera',

    'chronicle.severity.critical': 'Kritisk',
    'chronicle.severity.warning': 'Varning',
    'chronicle.severity.info': 'Info',
    'chronicle.severity.debug': 'Felsökning',

    'chronicle.time.just_now': 'just nu',
    'chronicle.time.minutes_ago': '{count} min sedan',
    'chronicle.time.hours_ago': '{count}t sedan',
    'chronicle.time.yesterday': 'Igår',

    'chronicle.editor.title': 'Titel',
    'chronicle.editor.layout': 'Layout',
    'chronicle.editor.layout_vertical': 'Vertikal',
    'chronicle.editor.layout_horizontal': 'Horisontell',
    'chronicle.editor.sources': 'Källor',
    'chronicle.editor.add_source': 'Lägg till källa',
    'chronicle.editor.remove_source': 'Ta bort källa',
    'chronicle.editor.source_type': 'Källtyp',
    'chronicle.editor.entity': 'Entitet',
    'chronicle.editor.entities': 'Entiteter',
    'chronicle.editor.filters': 'Filter',
    'chronicle.editor.categories': 'Kategorier',
    'chronicle.editor.severities': 'Allvarlighetsgrader',
    'chronicle.editor.search': 'Sök',
    'chronicle.editor.grouping': 'Gruppering',
    'chronicle.editor.group_by': 'Gruppera efter',
    'chronicle.editor.appearance': 'Utseende',
    'chronicle.editor.card_height': 'Korthöjd',
    'chronicle.editor.compact': 'Kompakt läge',
    'chronicle.editor.show_images': 'Visa bilder',
    'chronicle.editor.show_icons': 'Visa ikoner',
    'chronicle.editor.show_header': 'Visa rubrik',
    'chronicle.editor.max_events': 'Max händelser',
    'chronicle.editor.days_back': 'Dagar tillbaka',
    'chronicle.editor.time_format': 'Tidsformat',
    'chronicle.editor.language': 'Språk',
    'chronicle.editor.severity_colors': 'Allvarlighetsfärger',
    'chronicle.editor.animate_new': 'Animera nya händelser',
    'chronicle.editor.show_severity_badge': 'Visa allvarlighetsmärke',
    'chronicle.editor.show_source_badge': 'Visa källmärke',
    'chronicle.editor.show_layout_toggle': 'Visa layoutväxlare',
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
export function localize(key: string, language?: string): string {
  const lang = language ?? 'en';

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
