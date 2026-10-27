import type { L } from '../i18n/ui';

/**
 * Portfolio records. To add a project, copy a record, give it a unique slug and set visible: true.
 * category decides which group it appears in; never mark speculative work as 'published'.
 */
export type ProjectCategory = 'published' | 'demonstration' | 'development';
export type Ownership = 'own' | 'independent' | 'commissioned' | 'proposal' | 'tbc';

export type Project = {
  slug: string;
  visible: boolean;
  featured?: boolean;
  name: string;
  sector: L;
  industries: string[];
  category: ProjectCategory;
  status: L;
  ownership: Ownership;
  ownershipNote: L;
  url?: string;
  summary: L;
  challenge: L;
  solution: L;
  features: L[];
  tech?: L;
  disclosure?: L;
  preview?: string; // image under /work/ ; otherwise a typographic preview is drawn
  /** Internal verification note. Never rendered. */
  verify?: string;
};

const l = (en: string, fr: string): L => ({ en, fr });

export const ownershipLabel: Record<Ownership, L> = {
  own: l('Affiliated initiative, not a client engagement', 'Initiative affiliée, pas un mandat client'),
  independent: l('Independently developed, not commissioned', 'Développé de façon indépendante, sans commande'),
  commissioned: l('Commissioned work', 'Travail commandé'),
  proposal: l('Unsolicited proposal', 'Proposition spontanée'),
  tbc: l('Engagement status to be confirmed', 'Nature de l’engagement à confirmer'),
};

export const categoryLabel: Record<ProjectCategory, L> = {
  published: l('Published projects', 'Projets en ligne'),
  demonstration: l('Functional demonstrations', 'Démonstrations fonctionnelles'),
  development: l('Innovation lab: in development', 'Laboratoire : en développement'),
};

export const projects: Project[] = [
  {
    slug: 'senegal-consulaire-digital',
    visible: true,
    featured: true,
    name: 'Sénégal Consulaire Digital',
    sector: l('Government and diplomatic digital services', 'Services numériques diplomatiques et publics'),
    industries: ['government'],
    category: 'demonstration',
    status: l('Functional demonstration', 'Démonstration fonctionnelle'),
    ownership: 'independent',
    ownershipNote: l(
      'Independent, unofficial demonstration. Not commissioned, endorsed or operated by the Embassy or the Government of Senegal.',
      'Démonstration indépendante et non officielle. Ni commandée, ni approuvée, ni exploitée par l’Ambassade ou le Gouvernement du Sénégal.',
    ),
    url: 'https://wdcsenegaltest.netlify.app/',
    summary: l(
      'A working concept of a modern, mobile-first digital experience for the Embassy of Senegal in Washington, DC, built on an architecture that other missions could reuse.',
      'Un concept fonctionnel d’expérience numérique moderne, pensée d’abord pour le mobile, pour l’Ambassade du Sénégal à Washington, sur une architecture réutilisable par d’autres missions.',
    ),
    challenge: l(
      'People who need a passport, a civil-status document or a visa usually arrive on a consular website from a phone, with one question. Information is often arranged by institution rather than by task, which sends them to the telephone or to the counter for answers they could have found online.',
      'Les usagers qui ont besoin d’un passeport, d’un acte d’état civil ou d’un visa arrivent généralement sur un site consulaire depuis leur téléphone, avec une seule question. L’information y est souvent organisée par institution plutôt que par démarche, ce qui les renvoie au téléphone ou au guichet pour des réponses qu’ils auraient pu trouver en ligne.',
    ),
    solution: l(
      'A task-first platform: a search console as the main entry point, a directory of consular services with a consistent page template, a guided service finder and printable checklists. Assistance, request tracking, an operations console and a content workflow are included as clearly labeled simulations to show what a later phase could offer.',
      'Une plateforme pensée par démarche : une console de recherche comme point d’entrée principal, un annuaire des services consulaires avec un gabarit de page unique, un outil d’orientation guidée et des listes de pièces imprimables. L’assistance, le suivi des demandes, une console d’opérations et un circuit de publication sont présentés comme des simulations clairement signalées pour montrer ce qu’une phase ultérieure pourrait offrir.',
    ),
    features: [
      l('Mobile-first interface, responsive from small phones upward', 'Interface pensée d’abord pour le mobile, adaptée dès les petits écrans'),
      l('Site-wide search with keyboard shortcut and accent-insensitive matching', 'Recherche globale avec raccourci clavier et prise en compte des accents'),
      l('Directory of consular services with theme filters and shareable links', 'Annuaire des services consulaires avec filtres thématiques et liens partageables'),
      l('Guided service finder and checklists that can be printed or downloaded', 'Orientation guidée et listes de pièces imprimables ou téléchargeables'),
      l('Opening status computed in Washington time', 'Statut d’ouverture calculé à l’heure de Washington'),
      l('French and English content, with the structure prepared for Wolof', 'Contenus en français et en anglais, structure prête pour le wolof'),
      l('Simulated assistance requests with a five-stage tracker and an operations console (synthetic data)', 'Demandes d’assistance simulées avec suivi en cinq étapes et console d’opérations (données synthétiques)'),
      l('Reusable multi-mission architecture: the same code can serve another embassy or consulate', 'Architecture multi-missions réutilisable : le même code peut servir une autre ambassade ou un consulat'),
    ],
    tech: l(
      'React and TypeScript, bundled with esbuild, deployed as a static site on Netlify, with an automated end-to-end test suite run in Playwright.',
      'React et TypeScript, assemblés avec esbuild, déployés en site statique sur Netlify, avec une suite de tests automatisés de bout en bout sous Playwright.',
    ),
    disclosure: l(
      'This is an independent, unofficial demonstration. It is not commissioned, endorsed or operated by the Embassy or the Government of Senegal, and it does not provide real consular services.',
      'Il s’agit d’une démonstration indépendante et non officielle. Elle n’est ni commandée, ni approuvée, ni exploitée par l’Ambassade ou le Gouvernement du Sénégal, et ne fournit aucun service consulaire réel.',
    ),
    preview: '/work/senegal-consulaire-digital.jpg',
    verify: 'Features taken from the project repository README and QA report (Oct 2026). Confirm the demo URL is the one you want public.',
  },
  {
    slug: 'lintel-meridian-advisory',
    visible: true,
    featured: true,
    name: 'Lintel & Meridian Advisory',
    sector: l('Infrastructure, technology advisory and industrial innovation', 'Infrastructures, conseil technologique et innovation industrielle'),
    industries: ['infrastructure'],
    category: 'published',
    status: l('Published', 'En ligne'),
    ownership: 'own',
    ownershipNote: l(
      'Corporate website for an affiliated advisory firm. Not a third-party client engagement.',
      'Site d’entreprise d’un cabinet de conseil affilié. Il ne s’agit pas d’un mandat pour un client tiers.',
    ),
    url: 'https://lintelmeridian.com',
    summary: l(
      'A corporate presence for an advisory business that connects infrastructure project owners with specialized technology providers and industrial solutions.',
      'Une présence numérique pour un cabinet qui met en relation des porteurs de projets d’infrastructure avec des fournisseurs de technologies spécialisées et de solutions industrielles.',
    ),
    challenge: l(
      'Complex B2B services are hard to explain in a few seconds. The firm needed to be understood by technology suppliers and by project owners in North America and the Gulf, across several sectors, without sounding generic.',
      'Des services B2B complexes sont difficiles à expliquer en quelques secondes. Le cabinet devait être compris à la fois par des fournisseurs de technologies et par des porteurs de projets en Amérique du Nord et dans le Golfe, dans plusieurs secteurs, sans tomber dans le discours générique.',
    ),
    solution: l(
      'A clear positioning statement, sector-by-sector content written for search, and a single contact path. The site is published in English, French and Arabic for an international audience.',
      'Un positionnement clair, des contenus par secteur rédigés pour le référencement et un parcours de contact unique. Le site est publié en anglais, en français et en arabe pour un public international.',
    ),
    features: [
      l('Corporate digital presence and brand presentation', 'Présence numérique et présentation de la marque'),
      l('English, French and Arabic versions', 'Versions anglaise, française et arabe'),
      l('Sector pages written for search visibility', 'Pages sectorielles rédigées pour le référencement'),
      l('Contact form as the single inquiry path', 'Formulaire de contact comme unique point d’entrée'),
    ],
    tech: l('Static website hosted on Netlify.', 'Site statique hébergé sur Netlify.'),
    verify: 'The live site could not be inspected from the build environment. Confirm the three languages, sector pages and contact form are live before publishing.',
  },
  {
    slug: 'teranga-city',
    visible: true,
    featured: true,
    name: 'Teranga City',
    sector: l('Real estate, planned communities and investment', 'Immobilier, quartiers planifiés et investissement'),
    industries: ['real-estate'],
    category: 'published',
    status: l('Published website for a development initiative', 'Site en ligne pour une initiative en développement'),
    ownership: 'own',
    ownershipNote: l(
      'Website for an affiliated planned residential community initiative. The community itself is in its consultation phase and has not been built.',
      'Site d’une initiative affiliée de quartier résidentiel planifié. Le quartier est en phase de consultation et n’a pas été construit.',
    ),
    url: 'https://terangacity.net',
    summary: l(
      'A digital platform presenting Teranga City, a planned residential community concept in Senegal for diaspora and local families, and gathering their views before any design is fixed.',
      'Une plateforme numérique qui présente Teranga City, un concept de quartier résidentiel planifié au Sénégal pour les familles de la diaspora et du pays, et qui recueille leur avis avant que la conception ne soit arrêtée.',
    ),
    challenge: l(
      'Real-estate projects in the region often ask buyers for trust before they show a plan. The initiative needed to explain its approach, including financing, governance and risks, and to collect the views of future residents before choosing a site.',
      'Dans la région, les projets immobiliers demandent souvent la confiance des acheteurs avant de montrer un plan. L’initiative devait expliquer sa démarche, financement, gouvernance et risques compris, et recueillir l’avis des futurs résidents avant de choisir un site.',
    ),
    solution: l(
      'A long-form, story-led page that walks through the concept, the commitments, who finances and decides what, what could go wrong and how it is mitigated, and where the project stands. A consultation sign-up replaces any sales pitch: no sale is open and no payment is requested.',
      'Une page narrative qui présente le concept, les engagements, qui finance et qui décide, ce qui pourrait mal tourner et comment l’éviter, et l’état d’avancement. Une inscription à la consultation remplace tout argumentaire de vente : aucune vente n’est ouverte et aucun paiement n’est demandé.',
    ),
    features: [
      l('Project storytelling with a video presentation', 'Récit du projet avec présentation vidéo'),
      l('Sections on financing, governance and risk', 'Sections consacrées au financement, à la gouvernance et aux risques'),
      l('Transparent project-status section and FAQ', 'Section d’avancement transparente et FAQ'),
      l('Consultation sign-up form with confirmation email', 'Formulaire d’inscription à la consultation avec courriel de confirmation'),
      l('Multilingual content for local and diaspora audiences', 'Contenus multilingues pour les publics locaux et de la diaspora'),
    ],
    tech: l(
      'Static single-page site on Netlify with Netlify Forms; confirmation emails sent through a transactional email service.',
      'Site statique d’une page sur Netlify avec Netlify Forms ; courriels de confirmation envoyés par un service d’e-mail transactionnel.',
    ),
    disclosure: l(
      'Teranga City is a development initiative. It is not an existing or delivered community, and the site has not yet been chosen.',
      'Teranga City est une initiative en développement. Ce n’est pas un quartier existant ou livré, et le site n’a pas encore été choisi.',
    ),
    preview: '/work/teranga-city.jpg',
    verify: 'Features taken from the site source (Oct 2026). Source shows French, English, Spanish and Arabic strings; confirm which languages to list.',
  },
  {
    slug: 'cabinet-magaye-sene',
    visible: true,
    name: 'Cabinet Magaye Sène',
    sector: l('Real estate appraisal and valuation', 'Expertise et évaluation immobilières'),
    industries: ['real-estate'],
    category: 'published',
    status: l('Published', 'En ligne'),
    ownership: 'own',
    ownershipNote: l(
      'Professional website for an affiliated real estate appraisal firm in Dakar. Not a third-party client engagement.',
      'Site professionnel d’un cabinet d’expertise immobilière affilié, à Dakar. Il ne s’agit pas d’un mandat pour un client tiers.',
    ),
    summary: l(
      'A bilingual professional website for an independent real estate appraisal and valuation firm in Dakar, with a dedicated path for clients living abroad.',
      'Un site professionnel bilingue pour un cabinet indépendant d’expertise et d’évaluation immobilières à Dakar, avec un parcours dédié aux clients vivant à l’étranger.',
    ),
    challenge: l(
      'A registered appraiser needs to be found and trusted by individuals, businesses, institutions and members of the diaspora, while respecting the rules that limit how the profession may advertise.',
      'Un expert agréé doit être trouvé et inspirer confiance aux particuliers, entreprises, institutions et membres de la diaspora, tout en respectant les règles qui encadrent la communication de sa profession.',
    ),
    solution: l(
      'A sober, information-led site that explains each type of appraisal, how an assignment unfolds and how clients abroad can have a property assessed remotely, ending with a structured appraisal request form.',
      'Un site sobre et informatif qui présente chaque type d’expertise, le déroulement d’une mission et la manière dont les clients à l’étranger peuvent faire évaluer un bien à distance, avec un formulaire structuré de demande d’expertise.',
    ),
    features: [
      l('French and English versions with a language switch', 'Versions française et anglaise avec sélecteur de langue'),
      l('Appraisal services organized by client situation', 'Services d’expertise organisés selon la situation du client'),
      l('Step-by-step explanation of how an appraisal works', 'Explication pas à pas du déroulement d’une expertise'),
      l('Dedicated section for clients living abroad', 'Section dédiée aux clients vivant à l’étranger'),
      l('FAQ and legal notice', 'FAQ et mentions légales'),
      l('Appraisal request form with spam protection (Netlify Forms)', 'Formulaire de demande d’expertise protégé contre le spam (Netlify Forms)'),
    ],
    tech: l('Static website deployed on Netlify from GitHub.', 'Site statique déployé sur Netlify depuis GitHub.'),
    preview: '/work/cabinet-magaye-sene.jpg',
    verify: 'Add the live URL in `url` once confirmed.',
  },
  {
    slug: 'sant-yalla-boutique',
    visible: true,
    name: 'Sant Yalla Boutique',
    sector: l('Retail and digital commerce', 'Commerce de détail et vente en ligne'),
    industries: ['retail'],
    category: 'development',
    status: l('In development', 'En développement'),
    ownership: 'tbc',
    ownershipNote: l('Website project for a fabric retailer in Dakar. Engagement terms to be confirmed.', 'Projet de site pour un commerce de tissus à Dakar. Modalités de l’engagement à confirmer.'),
    summary: l(
      'A product-catalogue website to give a Dakar fabric boutique and its new showroom visibility online.',
      'Un site catalogue pour donner de la visibilité en ligne à une boutique de tissus de Dakar et à son nouveau showroom.',
    ),
    challenge: l(
      'Customers discover fabric through word of mouth and messaging apps. The boutique has no place online where its range, its new showroom and its contact details can be found.',
      'Les clients découvrent les tissus par le bouche-à-oreille et les messageries. La boutique n’a aucun espace en ligne où trouver sa gamme, son nouveau showroom et ses coordonnées.',
    ),
    solution: l(
      'A simple, photo-led catalogue that staff can feed with photos and prices, with direct contact by messaging, designed to be maintained remotely.',
      'Un catalogue simple et visuel, alimenté par l’équipe avec photos et prix, avec contact direct par messagerie, conçu pour être géré à distance.',
    ),
    features: [
      l('Product catalogue organized by category', 'Catalogue de produits organisé par catégorie'),
      l('Showroom location and opening information', 'Adresse du showroom et informations pratiques'),
      l('Direct contact through messaging', 'Contact direct par messagerie'),
    ],
    verify: 'Confirm spelling (Sant Yalla / Sante Yalla), status, whether the owner agrees to be shown, and any live URL.',
  },
  {
    slug: 'sankara-mbaye',
    visible: true,
    name: 'Sankara Mbaye',
    sector: l('Creator and media', 'Créateur de contenu et médias'),
    industries: [],
    category: 'development',
    status: l('In development', 'En développement'),
    ownership: 'tbc',
    ownershipNote: l('Official website project for a content creator. Engagement terms to be confirmed.', 'Projet de site officiel pour un créateur de contenu. Modalités de l’engagement à confirmer.'),
    summary: l(
      'A bilingual French and English official website for a Senegalese content creator based in the United States.',
      'Un site officiel bilingue français-anglais pour un créateur de contenu sénégalais installé aux États-Unis.',
    ),
    challenge: l(
      'A creator’s audience is spread across social platforms that he does not control. Partners and audiences need one official address.',
      'L’audience d’un créateur est dispersée sur des plateformes qu’il ne maîtrise pas. Partenaires et publics ont besoin d’une adresse officielle unique.',
    ),
    solution: l(
      'A bilingual official site that gathers his presence and gives partners a clear way to get in touch.',
      'Un site officiel bilingue qui rassemble sa présence et offre aux partenaires un moyen clair de le contacter.',
    ),
    features: [
      l('French and English content', 'Contenus en français et en anglais'),
      l('Single official home for social channels', 'Point d’entrée officiel vers les réseaux sociaux'),
      l('Partnership contact path', 'Parcours de contact pour les partenariats'),
    ],
    verify: 'Brief said "service category to be confirmed". Confirm category, status, live URL and the client’s consent to be listed.',
  },
  {
    slug: 'o3s',
    visible: true,
    name: 'O3S',
    sector: l('Energy services, fleet and equipment operations', 'Services énergétiques, flottes et équipements'),
    industries: ['infrastructure'],
    category: 'development',
    status: l('Concept', 'Concept'),
    ownership: 'proposal',
    ownershipNote: l('Unsolicited proposal. Not commissioned.', 'Proposition spontanée. Non commandée.'),
    summary: l(
      'A bilingual corporate website and a client-portal concept for an oil and gas support-services company in Senegal.',
      'Un site d’entreprise bilingue et un concept de portail client pour une société de services pétroliers et gaziers au Sénégal.',
    ),
    challenge: l(
      'Service companies in the energy sector manage fleets, equipment and service requests for demanding clients, often through phone calls and spreadsheets.',
      'Les sociétés de services du secteur énergétique gèrent flottes, équipements et demandes d’intervention pour des clients exigeants, souvent par téléphone et tableur.',
    ),
    solution: l(
      'A corporate website in French and English, with an illustrative client-portal concept for service requests and equipment status.',
      'Un site d’entreprise en français et en anglais, accompagné d’un concept illustratif de portail client pour les demandes d’intervention et l’état des équipements.',
    ),
    features: [
      l('Bilingual corporate website', 'Site d’entreprise bilingue'),
      l('Illustrative service-request workflow', 'Circuit illustratif de demande d’intervention'),
      l('Equipment and fleet status concept', 'Concept de suivi des équipements et de la flotte'),
    ],
    verify: 'Unsolicited proposal: consider hiding (visible: false) until O3S responds. Confirm the portal concept exists before publishing.',
  },
  {
    slug: 'dealer-performance-intelligence',
    visible: true,
    name: 'ServiceOps: Dealer Performance Intelligence',
    sector: l('Automotive aftersales analytics', 'Analyse de l’après-vente automobile'),
    industries: ['automotive'],
    category: 'development',
    status: l('Concept', 'Concept'),
    ownership: 'independent',
    ownershipNote: l(
      'Independent concept. Uses only synthetic, anonymized data. It contains no employer or dealer information.',
      'Concept indépendant. Utilise uniquement des données synthétiques et anonymisées. Ne contient aucune information d’employeur ou de concessionnaire.',
    ),
    summary: l(
      'A business intelligence and KPI decision-support concept for automotive parts and service networks.',
      'Un concept d’intelligence d’affaires et d’aide à la décision par indicateurs pour les réseaux pièces et service automobiles.',
    ),
    challenge: l(
      'Field managers responsible for many dealerships receive large volumes of scorecard data but little help deciding which gap to address first, and with whom.',
      'Les responsables terrain qui suivent de nombreuses concessions reçoivent beaucoup de données de performance mais peu d’aide pour décider quel écart traiter en premier, et avec qui.',
    ),
    solution: l(
      'A concept that ranks KPI gaps by impact, links each gap to likely root causes and produces a short action plan for the next dealer visit.',
      'Un concept qui classe les écarts d’indicateurs par impact, relie chaque écart à ses causes probables et produit un court plan d’action pour la prochaine visite en concession.',
    ),
    features: [
      l('KPI gap ranking by business impact', 'Classement des écarts par impact économique'),
      l('Root-cause prompts for each indicator', 'Pistes de causes pour chaque indicateur'),
      l('Visit-ready action plans', 'Plans d’action prêts pour la visite'),
    ],
    disclosure: l(
      'Illustrative concept using synthetic data only. It is not affiliated with, and does not use information from, any manufacturer or dealer.',
      'Concept illustratif utilisant uniquement des données synthétiques. Il n’est affilié à aucun constructeur ou concessionnaire et n’utilise aucune de leurs informations.',
    ),
    verify: 'Confirm nothing in this concept reproduces employer tools or proprietary data before publishing.',
  },
];

export const visibleProjects = projects.filter((p) => p.visible);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
