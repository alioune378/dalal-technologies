import type { Locale } from '../config/site';

export type L = { en: string; fr: string };
export const t = (l: L, locale: Locale) => l[locale];

/** Interface strings. Long-form content lives in src/content. */
export const ui = {
  skip: { en: 'Skip to main content', fr: 'Aller au contenu principal' },
  nav: {
    services: { en: 'Services', fr: 'Expertises' },
    industries: { en: 'Industries', fr: 'Secteurs' },
    work: { en: 'Work & Innovation', fr: 'Réalisations' },
    about: { en: 'About', fr: 'À propos' },
    insights: { en: 'Insights', fr: 'Analyses' },
    contact: { en: 'Contact', fr: 'Contact' },
    cta: { en: 'Discuss your project', fr: 'Parlons de votre projet' },
    menu: { en: 'Menu', fr: 'Menu' },
    close: { en: 'Close menu', fr: 'Fermer le menu' },
    primary: { en: 'Primary', fr: 'Navigation principale' },
    langLabel: { en: 'Language', fr: 'Langue' },
    switchTo: { en: 'Lire en français', fr: 'Read in English' },
  },
  footer: {
    tagline: {
      en: 'Business intelligence, technology strategy and digital engineering for organizations that want better decisions and better services.',
      fr: 'Intelligence d’affaires, stratégie technologique et ingénierie numérique pour les organisations qui veulent mieux décider et mieux servir.',
    },
    company: { en: 'Company', fr: 'Entreprise' },
    capabilities: { en: 'Capabilities', fr: 'Expertises' },
    reach: { en: 'Get in touch', fr: 'Nous joindre' },
    privacy: { en: 'Privacy', fr: 'Confidentialité' },
    terms: { en: 'Terms of use', fr: 'Conditions d’utilisation' },
    note: {
      en: 'Descriptions of prior professional experience do not imply any client relationship or endorsement.',
      fr: 'La description de notre expérience professionnelle antérieure n’implique aucune relation client ni aucune caution.',
    },
  },
  common: {
    learnMore: { en: 'Learn more', fr: 'En savoir plus' },
    readCase: { en: 'Read the case study', fr: 'Lire l’étude de cas' },
    viewAll: { en: 'View all work', fr: 'Voir toutes les réalisations' },
    visit: { en: 'Visit the website', fr: 'Visiter le site' },
    openDemo: { en: 'Open the demonstration', fr: 'Ouvrir la démonstration' },
    back: { en: 'Back', fr: 'Retour' },
    related: { en: 'Related work', fr: 'Réalisations liées' },
    startConversation: { en: 'Start a conversation', fr: 'Engager la conversation' },
    explore: { en: 'Explore our capabilities', fr: 'Découvrir nos expertises' },
    discuss: { en: 'Discuss your project', fr: 'Parlons de votre projet' },
    allServices: { en: 'All services', fr: 'Toutes les expertises' },
    allIndustries: { en: 'All industries', fr: 'Tous les secteurs' },
    allInsights: { en: 'All insights', fr: 'Toutes les analyses' },
    minutes: { en: 'min read', fr: 'min de lecture' },
    home: { en: 'Home', fr: 'Accueil' },
    breadcrumb: { en: 'Breadcrumb', fr: 'Fil d’Ariane' },
    newWindow: { en: '(opens in a new tab)', fr: '(s’ouvre dans un nouvel onglet)' },
  },
  status: {
    published: { en: 'Published', fr: 'En ligne' },
    demonstration: { en: 'Functional demonstration', fr: 'Démonstration fonctionnelle' },
    development: { en: 'In development', fr: 'En développement' },
    concept: { en: 'Concept', fr: 'Concept' },
  },
  aiStatus: {
    demonstrated: { en: 'Demonstrated independent concept', fr: 'Concept indépendant démontré' },
    developing: { en: 'Capability under development', fr: 'Capacité en cours de développement' },
    advisory: { en: 'Advisory offering', fr: 'Offre de conseil' },
  },
};
