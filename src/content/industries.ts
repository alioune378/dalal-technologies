import type { L } from '../i18n/ui';

/**
 * Industries are sectors of focus, not client portfolios.
 * Each one separates professional experience, published work, demonstrations and proposed applications.
 */
export type Industry = {
  slug: string;
  title: L;
  short: L;
  intro: L;
  challenges: L[];
  experience: L[]; // prior professional experience (not company delivery)
  projects: string[]; // project slugs (their category tells published / demo / development)
  proposed: L[];
  services: string[];
};

const l = (en: string, fr: string): L => ({ en, fr });

export const industries: Industry[] = [
  {
    slug: 'government',
    title: l('Government & Public Sector', 'Administrations et secteur public'),
    short: l('Citizen services, institutional websites and modernization roadmaps.', 'Services aux citoyens, sites institutionnels et feuilles de route de modernisation.'),
    intro: l(
      'Ministries, agencies and diplomatic missions are under pressure to serve citizens online, in several languages, with limited staff. Our focus is on making services easy to find and complete, and on a realistic path from information to transactions.',
      'Ministères, agences et missions diplomatiques doivent servir les citoyens en ligne, en plusieurs langues, avec des effectifs limités. Notre priorité : des démarches faciles à trouver et à accomplir, et un chemin réaliste de l’information vers les services transactionnels.',
    ),
    challenges: [
      l('Fragmented, out-of-date service information', 'Une information sur les démarches fragmentée et obsolète'),
      l('Large diaspora and multilingual populations', 'Des diasporas importantes et des publics multilingues'),
      l('Accessibility and mobile performance', 'L’accessibilité et la performance sur mobile'),
    ],
    experience: [],
    projects: ['senegal-consulaire-digital'],
    proposed: [
      l('Consular and embassy information platforms shared across missions', 'Plateformes d’information consulaire mutualisées entre missions'),
      l('Service catalogues written around citizen tasks', 'Catalogues de démarches rédigés autour des besoins des usagers'),
      l('Request triage and tracking with human review', 'Tri et suivi des demandes avec validation humaine'),
    ],
    services: ['digital-government', 'technology-consulting', 'enterprise-software'],
  },
  {
    slug: 'financial-services',
    title: l('Financial Services', 'Services financiers'),
    short: l('Operational reporting, process quality and decision support.', 'Suivi opérationnel, qualité des processus et aide à la décision.'),
    intro: l(
      'Lenders, captive finance companies and microfinance institutions live on accurate, timely operational data. We focus on the reporting, controls and process improvements that make that data dependable.',
      'Prêteurs, sociétés de financement captives et institutions de microfinance dépendent de données opérationnelles exactes et à jour. Nous nous concentrons sur le reporting, les contrôles et l’amélioration des processus qui rendent ces données fiables.',
    ),
    challenges: [
      l('Manual reconciliation between operational systems', 'Des rapprochements manuels entre systèmes opérationnels'),
      l('Quality-control findings that recur', 'Des anomalies de contrôle qualité récurrentes'),
      l('Portfolio performance visible only after month-end', 'Une performance de portefeuille visible seulement après la clôture'),
    ],
    experience: [
      l('Financial services operations, quality control and process improvement at an automotive captive finance company', 'Opérations, contrôle qualité et amélioration des processus au sein d’une société de financement automobile captive'),
      l('Business requirements analysis and performance reporting', 'Analyse des besoins et suivi de la performance'),
    ],
    projects: [],
    proposed: [
      l('Operational KPI dashboards and automated month-end reporting', 'Tableaux de bord opérationnels et automatisation de la clôture mensuelle'),
      l('Data-quality checks on loan and account data', 'Contrôles de qualité sur les données de prêts et de comptes'),
      l('Process assessment for back-office workflows', 'Diagnostic des processus de back-office'),
    ],
    services: ['business-intelligence', 'technology-consulting', 'ai-automation'],
  },
  {
    slug: 'automotive',
    title: l('Automotive & Mobility', 'Automobile et mobilité'),
    short: l('Aftersales analytics, network performance and parts logistics.', 'Analyse de l’après-vente, performance des réseaux et logistique des pièces.'),
    intro: l(
      'Manufacturers, importers and dealer groups manage performance across many sites, where small gaps in parts availability or service retention add up. This is the sector we know best from the inside.',
      'Constructeurs, importateurs et groupes de distribution pilotent la performance de nombreux sites, où de petits écarts de disponibilité des pièces ou de fidélisation au service finissent par peser lourd. C’est le secteur que nous connaissons le mieux, de l’intérieur.',
    ),
    challenges: [
      l('Scorecards with many indicators and no clear priority', 'Des tableaux de performance riches en indicateurs mais sans priorité claire'),
      l('Parts availability and inventory balance across locations', 'La disponibilité des pièces et l’équilibre des stocks entre sites'),
      l('Turning field visits into measurable action plans', 'Transformer les visites terrain en plans d’action mesurables'),
    ],
    experience: [
      l('Supply chain and parts logistics analytics, inventory and availability analysis for a premium automaker’s North American operations', 'Analyse de la chaîne logistique des pièces, des stocks et de la disponibilité pour les opérations nord-américaines d’un constructeur premium'),
      l('Parts and service network performance management, dealer scorecards and KPI gap analysis for a multinational automotive group', 'Pilotage de la performance du réseau pièces et service, tableaux de performance et analyse des écarts pour un groupe automobile multinational'),
    ],
    projects: ['dealer-performance-intelligence'],
    proposed: [
      l('Network performance dashboards for importers and dealer groups', 'Tableaux de bord de performance réseau pour importateurs et groupes de distribution'),
      l('Parts availability and inventory analytics', 'Analyse de la disponibilité des pièces et des stocks'),
      l('Visit planning and action-tracking tools', 'Outils de préparation des visites et de suivi des actions'),
    ],
    services: ['business-intelligence', 'enterprise-software', 'technology-consulting'],
  },
  {
    slug: 'infrastructure',
    title: l('Infrastructure & Energy', 'Infrastructures et énergie'),
    short: l('Digital presence, project information and operations tools for complex B2B sectors.', 'Présence numérique, information projet et outils opérationnels pour des secteurs B2B complexes.'),
    intro: l(
      'Infrastructure and energy businesses sell complex, long-cycle services to technical buyers. Clear digital communication and simple operational tools can shorten the path from first contact to a qualified conversation.',
      'Les entreprises d’infrastructures et d’énergie vendent des services complexes à cycle long à des acheteurs techniques. Une communication numérique claire et des outils opérationnels simples peuvent raccourcir le chemin entre le premier contact et un échange qualifié.',
    ),
    challenges: [
      l('Explaining technical offerings to non-specialist decision-makers', 'Expliquer des offres techniques à des décideurs non spécialistes'),
      l('Service requests and equipment status tracked by phone', 'Des demandes d’intervention et un suivi d’équipements gérés par téléphone'),
      l('Reaching international audiences in several languages', 'Toucher des publics internationaux dans plusieurs langues'),
    ],
    experience: [],
    projects: ['lintel-meridian-advisory', 'o3s'],
    proposed: [
      l('Multilingual corporate and sector websites', 'Sites d’entreprise et sectoriels multilingues'),
      l('Client portals for service requests and asset status', 'Portails clients pour les demandes d’intervention et l’état des équipements'),
      l('Project reporting dashboards', 'Tableaux de bord de suivi de projets'),
    ],
    services: ['digital-experience', 'enterprise-software', 'business-intelligence'],
  },
  {
    slug: 'real-estate',
    title: l('Real Estate & Development', 'Immobilier et aménagement'),
    short: l('Project storytelling, buyer engagement and professional services online.', 'Récit de projet, relation acquéreurs et services professionnels en ligne.'),
    intro: l(
      'Developers and real-estate professionals need to earn trust before they can sell. Digital platforms that explain a project honestly, and gather buyer input early, are a strong start.',
      'Promoteurs et professionnels de l’immobilier doivent gagner la confiance avant de vendre. Des plateformes qui expliquent un projet avec honnêteté et recueillent tôt l’avis des acquéreurs sont un excellent point de départ.',
    ),
    challenges: [
      l('Building buyer trust before construction starts', 'Gagner la confiance des acquéreurs avant le début des travaux'),
      l('Reaching diaspora buyers abroad', 'Toucher les acquéreurs de la diaspora à l’étranger'),
      l('Managing interest and inquiries at scale', 'Gérer les marques d’intérêt et demandes en volume'),
    ],
    experience: [],
    projects: ['teranga-city', 'cabinet-magaye-sene'],
    proposed: [
      l('Project websites with consultation and lead capture', 'Sites de projet avec consultation et collecte de contacts'),
      l('Buyer pipeline dashboards', 'Tableaux de bord de suivi des acquéreurs'),
      l('Professional-practice websites', 'Sites de cabinets professionnels'),
    ],
    services: ['digital-experience', 'business-intelligence', 'enterprise-software'],
  },
  {
    slug: 'retail',
    title: l('Retail & Commerce', 'Commerce et distribution'),
    short: l('Online catalogues, sales analytics and simple digital tools for merchants.', 'Catalogues en ligne, analyse des ventes et outils numériques simples pour les commerçants.'),
    intro: l(
      'Independent retailers and growing commercial businesses often sell through physical stores and messaging apps. Modest digital tools, well chosen, can widen their reach and show them what sells.',
      'Les commerçants indépendants et les entreprises commerciales en croissance vendent souvent en boutique et via les messageries. Des outils numériques modestes, bien choisis, peuvent élargir leur clientèle et leur montrer ce qui se vend.',
    ),
    challenges: [
      l('No online presence beyond social media', 'Aucune présence en ligne au-delà des réseaux sociaux'),
      l('Stock and sales tracked on paper', 'Des stocks et des ventes suivis sur papier'),
      l('Limited time to maintain digital channels', 'Peu de temps pour entretenir les canaux numériques'),
    ],
    experience: [
      l('Sales and service analytics, and retail business performance in automotive retail networks', 'Analyse des ventes et du service, et performance commerciale dans les réseaux de distribution automobile'),
    ],
    projects: ['sant-yalla-boutique'],
    proposed: [
      l('Product catalogues maintained by store staff', 'Catalogues de produits mis à jour par l’équipe en boutique'),
      l('Simple sales and stock dashboards', 'Tableaux de bord simples des ventes et des stocks'),
      l('Messaging-integrated contact paths', 'Parcours de contact intégrés aux messageries'),
    ],
    services: ['digital-experience', 'business-intelligence'],
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug)!;
