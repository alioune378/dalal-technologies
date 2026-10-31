import type { L } from '../i18n/ui';

export type AiStatus = 'demonstrated' | 'developing' | 'advisory';
export type Offering = { label: L; ai?: AiStatus };

export type Service = {
  slug: string;
  tier: 'core' | 'complementary';
  icon: 'bi' | 'consulting' | 'platforms' | 'ai' | 'gov' | 'web';
  title: L;
  short: L;
  headline: L;
  intro: L;
  challenges: L[];
  offerings: Offering[];
  deliverables: L[];
  background: L;
  related: string[];
  showcase?: 'dashboard' | 'workflow';
};

const o = (en: string, fr: string, ai?: AiStatus): Offering => ({ label: { en, fr }, ai });
const l = (en: string, fr: string): L => ({ en, fr });

export const services: Service[] = [
  {
    slug: 'business-intelligence',
    tier: 'core',
    icon: 'bi',
    title: l('Business Intelligence & Data Analytics', 'Intelligence d’affaires et analyse de données'),
    short: l(
      'Executive dashboards, automated reporting and analysis that turn operational data into decisions.',
      'Tableaux de bord de direction, rapports automatisés et analyses qui transforment les données opérationnelles en décisions.',
    ),
    headline: l('From scattered reports to decision-ready intelligence.', 'Des rapports éparpillés à une information prête pour la décision.'),
    intro: l(
      'Most organizations already have the data they need. It sits in spreadsheets, exports and systems that do not talk to each other, and it reaches decision-makers late. We design reporting that answers the questions leaders actually ask, automate the work behind it, and make the numbers trustworthy.',
      'La plupart des organisations disposent déjà des données nécessaires. Elles dorment dans des tableurs, des exports et des systèmes qui ne communiquent pas, et parviennent tard aux décideurs. Nous concevons des rapports qui répondent aux vraies questions des dirigeants, nous automatisons le travail en amont et nous rendons les chiffres fiables.',
    ),
    challenges: [
      l('Monthly reporting that takes days of manual consolidation', 'Des rapports mensuels qui exigent des jours de consolidation manuelle'),
      l('Different teams quoting different numbers for the same indicator', 'Des équipes qui citent des chiffres différents pour le même indicateur'),
      l('Dashboards that look good but do not change any decision', 'Des tableaux de bord séduisants qui ne changent aucune décision'),
      l('Performance gaps discovered after the quarter has closed', 'Des écarts de performance découverts une fois le trimestre clos'),
    ],
    offerings: [
      o('Power BI dashboards', 'Tableaux de bord Power BI'),
      o('Tableau reporting and visualization', 'Rapports et visualisations Tableau'),
      o('SQL-based reporting and analysis', 'Rapports et analyses fondés sur SQL'),
      o('Excel and Power Query automation', 'Automatisation Excel et Power Query'),
      o('Executive KPI dashboards', 'Tableaux de bord d’indicateurs pour la direction'),
      o('Financial and operational performance reporting', 'Suivi de la performance financière et opérationnelle'),
      o('Sales and service analytics', 'Analyse des ventes et du service'),
      o('Inventory and logistics analytics', 'Analyse des stocks et de la logistique'),
      o('Data transformation and reporting automation', 'Transformation des données et automatisation des rapports'),
      o('Business performance scorecards', 'Tableaux de performance (scorecards)'),
      o('Data quality and validation', 'Qualité et validation des données'),
      o('Root-cause and trend analysis', 'Analyse des causes et des tendances'),
      o('Decision-support tools', 'Outils d’aide à la décision'),
    ],
    deliverables: [
      l('A KPI dictionary that defines every indicator once', 'Un dictionnaire d’indicateurs qui définit chaque KPI une seule fois'),
      l('Automated data preparation from your existing sources', 'Une préparation automatisée des données à partir de vos sources existantes'),
      l('Dashboards designed around specific recurring decisions', 'Des tableaux de bord conçus autour de décisions récurrentes précises'),
      l('Validation checks so figures can be trusted', 'Des contrôles de validation pour des chiffres fiables'),
      l('Documentation and hand-over so your team can maintain it', 'Une documentation et un transfert pour que votre équipe en assure le suivi'),
    ],
    background: l(
      'This is where our experience runs deepest: years of business intelligence and performance reporting inside the automotive and financial services sectors, including KPI dashboards, SQL reporting, Power BI and Tableau, parts and inventory analytics, and dealer performance scorecards used in field management.',
      'C’est là que notre expérience est la plus profonde : des années d’intelligence d’affaires et de suivi de la performance au cœur de l’automobile et des services financiers, notamment tableaux de bord d’indicateurs, rapports SQL, Power BI et Tableau, analyse des pièces et des stocks, et tableaux de performance des concessionnaires utilisés sur le terrain.',
    ),
    related: ['dealer-performance-intelligence', 'senegal-consulaire-digital'],
    showcase: 'dashboard',
  },
  {
    slug: 'technology-consulting',
    tier: 'core',
    icon: 'consulting',
    title: l('Technology Consulting & Digital Transformation', 'Conseil technologique et transformation numérique'),
    short: l(
      'Roadmaps, requirements and solution choices grounded in how your operation really works.',
      'Feuilles de route, expression des besoins et choix de solutions fondés sur la réalité de vos opérations.',
    ),
    headline: l('Clarity before code.', 'La clarté avant le code.'),
    intro: l(
      'Technology programs fail most often at the beginning: unclear requirements, the wrong tool, or a plan nobody owns. We help you understand your current processes, define what needs to change, choose solutions on evidence, and keep stakeholders aligned through delivery.',
      'Les programmes technologiques échouent le plus souvent dès le départ : besoins flous, mauvais outil ou plan sans responsable. Nous vous aidons à comprendre vos processus actuels, à définir ce qui doit changer, à choisir les solutions sur des faits et à maintenir l’alignement des parties prenantes jusqu’à la livraison.',
    ),
    challenges: [
      l('A transformation agenda without a sequenced, funded roadmap', 'Un programme de transformation sans feuille de route séquencée et financée'),
      l('Vendors proposing solutions before the problem is defined', 'Des fournisseurs qui proposent des solutions avant que le problème soit défini'),
      l('Processes that differ from site to site and team to team', 'Des processus qui varient d’un site et d’une équipe à l’autre'),
      l('Projects that stall between business and IT', 'Des projets qui s’enlisent entre les métiers et l’informatique'),
    ],
    offerings: [
      o('Digital transformation strategy', 'Stratégie de transformation numérique'),
      o('Technology roadmaps', 'Feuilles de route technologiques'),
      o('Business requirements analysis', 'Analyse et expression des besoins'),
      o('Digital operating models', 'Modèles opérationnels numériques'),
      o('Business process assessment', 'Évaluation des processus métier'),
      o('Technology solution selection', 'Sélection de solutions technologiques'),
      o('Digital product strategy', 'Stratégie de produits numériques'),
      o('Transformation program coordination', 'Coordination de programmes de transformation'),
      o('Project and stakeholder management', 'Gestion de projet et des parties prenantes'),
    ],
    deliverables: [
      l('Current-state process maps and pain-point assessment', 'Cartographie des processus actuels et diagnostic des points de friction'),
      l('Prioritized requirements with acceptance criteria', 'Besoins priorisés avec critères d’acceptation'),
      l('Options analysis and solution recommendation', 'Analyse des options et recommandation de solution'),
      l('A phased roadmap with owners, milestones and measures', 'Une feuille de route par étapes avec responsables, jalons et indicateurs'),
    ],
    background: l(
      'Our background is in being the link between operations, finance and technology teams: gathering business requirements, coordinating cross-functional projects, and measuring whether changes improved performance in the field.',
      'Notre parcours s’est construit dans le lien entre les équipes opérationnelles, financières et technologiques : recueil des besoins, coordination de projets transverses et mesure de l’effet réel des changements sur le terrain.',
    ),
    related: ['senegal-consulaire-digital', 'lintel-meridian-advisory'],
  },
  {
    slug: 'enterprise-software',
    tier: 'core',
    icon: 'platforms',
    title: l('Enterprise Software & Digital Platforms', 'Logiciels d’entreprise et plateformes numériques'),
    short: l(
      'Portals, workflow systems and business applications built to fit the way your organization works.',
      'Portails, systèmes de workflow et applications métier conçus pour s’adapter au fonctionnement de votre organisation.',
    ),
    headline: l('Software shaped around the work, not the other way round.', 'Des logiciels façonnés autour du travail, et non l’inverse.'),
    intro: l(
      'When off-the-shelf tools force teams into workarounds, a focused custom application or portal can remove the friction. We scope carefully, prototype early, and build maintainable platforms that integrate with the systems you already rely on.',
      'Quand les outils standards obligent les équipes à contourner leurs limites, une application ou un portail sur mesure peut supprimer la friction. Nous cadrons avec soin, prototypons tôt et construisons des plateformes maintenables, intégrées aux systèmes que vous utilisez déjà.',
    ),
    challenges: [
      l('Approvals and requests managed by email and spreadsheets', 'Des validations et demandes gérées par courriel et tableur'),
      l('Clients or staff with no single place to find information or track requests', 'Des clients ou employés sans point d’accès unique pour s’informer ou suivre une demande'),
      l('Legacy applications that are hard to change', 'Des applications anciennes difficiles à faire évoluer'),
      l('Systems that hold the same data but never exchange it', 'Des systèmes qui détiennent les mêmes données sans jamais les échanger'),
    ],
    offerings: [
      o('Custom business applications', 'Applications métier sur mesure'),
      o('Corporate and institutional portals', 'Portails d’entreprise et institutionnels'),
      o('Government digital service platforms', 'Plateformes de services publics numériques'),
      o('Workflow and approval systems', 'Systèmes de workflow et de validation'),
      o('Client and employee portals', 'Portails clients et collaborateurs'),
      o('CRM and business systems integration', 'Intégration CRM et systèmes métier'),
      o('API-enabled applications', 'Applications ouvertes par API'),
      o('Scalable web applications', 'Applications web évolutives'),
      o('Product prototyping and modernization', 'Prototypage et modernisation de produits'),
    ],
    deliverables: [
      l('Clickable prototype validated with real users', 'Un prototype cliquable validé avec de vrais utilisateurs'),
      l('A documented architecture designed for maintenance', 'Une architecture documentée pensée pour la maintenance'),
      l('Incremental releases with automated tests', 'Des livraisons progressives avec tests automatisés'),
      l('Deployment, training and support plan', 'Un plan de déploiement, de formation et d’accompagnement'),
    ],
    background: l(
      'Dalal Technologies’ published work includes multilingual websites with structured request and consultation forms, spam protection and confirmation emails, deployed on Netlify from version-controlled source.',
      'Les réalisations en ligne de Dalal Technologies comprennent des sites multilingues avec formulaires structurés de demande et de consultation, protection contre le spam et courriels de confirmation, déployés sur Netlify depuis un code source versionné.',
    ),
    related: ['senegal-consulaire-digital', 'o3s'],
  },
  {
    slug: 'ai-automation',
    tier: 'complementary',
    icon: 'ai',
    title: l('Artificial Intelligence & Intelligent Automation', 'Intelligence artificielle et automatisation intelligente'),
    short: l(
      'Practical, governed use of AI and automation, starting with one workflow and a human in the loop.',
      'Un usage pragmatique et encadré de l’IA et de l’automatisation, en commençant par un processus et une validation humaine.',
    ),
    headline: l('Useful AI starts with a well-understood workflow.', 'Une IA utile commence par un processus bien compris.'),
    intro: l(
      'We help organizations identify where AI and automation can remove repetitive work safely, prototype those use cases, and put governance in place before scaling. We are explicit about maturity: each offering below is labeled as a demonstrated concept, a capability under development, or an advisory service.',
      'Nous aidons les organisations à repérer où l’IA et l’automatisation peuvent supprimer des tâches répétitives en toute sécurité, à prototyper ces cas d’usage et à mettre en place une gouvernance avant tout déploiement à grande échelle. Nous sommes transparents sur la maturité : chaque offre ci-dessous est qualifiée de concept démontré, de capacité en développement ou d’offre de conseil.',
    ),
    challenges: [
      l('Interest in AI without a clear first use case', 'Un intérêt pour l’IA sans premier cas d’usage clair'),
      l('Teams re-keying information between documents and systems', 'Des équipes qui ressaisissent des informations entre documents et systèmes'),
      l('Requests that wait in shared inboxes before anyone triages them', 'Des demandes qui attendent dans des boîtes partagées avant d’être triées'),
      l('Concerns about data protection, accuracy and accountability', 'Des inquiétudes sur la protection des données, la fiabilité et la responsabilité'),
    ],
    offerings: [
      o('Workflow automation', 'Automatisation des processus', 'demonstrated'),
      o('Intelligent request classification and routing', 'Classification et orientation intelligentes des demandes', 'demonstrated'),
      o('AI-powered business assistants', 'Assistants métier fondés sur l’IA', 'developing'),
      o('Intelligent document workflows', 'Traitement intelligent des documents', 'developing'),
      o('AI-assisted customer support', 'Support client assisté par l’IA', 'developing'),
      o('Knowledge-base search and retrieval', 'Recherche dans les bases de connaissances', 'developing'),
      o('AI-enabled reporting', 'Rapports enrichis par l’IA', 'developing'),
      o('Business process automation assessment', 'Évaluation des opportunités d’automatisation', 'advisory'),
      o('Predictive analytics use-case exploration', 'Exploration de cas d’usage d’analyse prédictive', 'advisory'),
      o('Responsible AI adoption and governance planning', 'Adoption responsable de l’IA et plan de gouvernance', 'advisory'),
    ],
    deliverables: [
      l('A short list of use cases ranked by value and risk', 'Une courte liste de cas d’usage classés par valeur et par risque'),
      l('A working prototype on representative, non-sensitive data', 'Un prototype fonctionnel sur des données représentatives et non sensibles'),
      l('Human-review points and escalation rules', 'Des points de validation humaine et des règles d’escalade'),
      l('A governance checklist covering data, accuracy and accountability', 'Une grille de gouvernance couvrant données, fiabilité et responsabilité'),
    ],
    background: l(
      'Our experience includes daily use of AI-enabled analytical and productivity tools in field management and an internal AI innovation competition inside a large automotive group. Dalal Technologies has not yet deployed AI systems in production for clients; the workflow on this page is an illustrative demonstration.',
      'Notre expérience comprend l’usage quotidien d’outils d’analyse et de productivité fondés sur l’IA dans le pilotage terrain, ainsi qu’un concours interne d’innovation en IA au sein d’un grand groupe automobile. Dalal Technologies n’a pas encore déployé de systèmes d’IA en production pour des clients ; le processus présenté sur cette page est une démonstration illustrative.',
    ),
    related: ['senegal-consulaire-digital', 'dealer-performance-intelligence'],
    showcase: 'workflow',
  },
  {
    slug: 'digital-government',
    tier: 'complementary',
    icon: 'gov',
    title: l('Government & Institutional Digital Solutions', 'Solutions numériques pour les institutions'),
    short: l(
      'Citizen-facing portals and institutional websites that make public services easier to find and use.',
      'Portails citoyens et sites institutionnels qui rendent les services publics plus faciles à trouver et à utiliser.',
    ),
    headline: l('Public services people can find, understand and complete.', 'Des services publics que l’on trouve, que l’on comprend et que l’on mène à bien.'),
    intro: l(
      'Citizens judge an institution by how easily they can get something done. We organize public information around the tasks people come to complete, write it in plain language across several languages, and design for mobile phones first, since that is how most people arrive.',
      'Les citoyens jugent une institution à la facilité avec laquelle ils accomplissent leurs démarches. Nous organisons l’information publique autour des tâches que les usagers viennent réaliser, nous la rédigeons en langage clair et en plusieurs langues, et nous concevons d’abord pour le mobile, puisque c’est ainsi que la plupart des usagers arrivent.',
    ),
    challenges: [
      l('Websites organized by department instead of by citizen need', 'Des sites organisés par direction plutôt que par besoin de l’usager'),
      l('Requirements and documents that are hard to find or out of date', 'Des pièces et conditions difficiles à trouver ou obsolètes'),
      l('Diaspora and multilingual audiences poorly served', 'Des publics de la diaspora et multilingues mal servis'),
      l('Staff answering the same questions by phone every day', 'Des agents qui répondent chaque jour aux mêmes questions au téléphone'),
    ],
    offerings: [
      o('Embassy and consular information platforms', 'Plateformes d’information consulaire et diplomatique'),
      o('Digital citizen-service portals', 'Portails de services aux citoyens'),
      o('Government agency websites', 'Sites d’agences publiques'),
      o('Digital service discovery', 'Orientation dans les démarches en ligne'),
      o('Multilingual institutional experiences', 'Expériences institutionnelles multilingues'),
      o('Public information architecture', 'Architecture de l’information publique'),
      o('Accessible digital services', 'Services numériques accessibles'),
      o('Administrative workflow concepts', 'Concepts de workflows administratifs'),
      o('Digital modernization roadmaps', 'Feuilles de route de modernisation numérique'),
    ],
    deliverables: [
      l('A service inventory written from the user’s point of view', 'Un inventaire des démarches rédigé du point de vue de l’usager'),
      l('A mobile-first, accessible design system', 'Un système de design accessible, pensé d’abord pour le mobile'),
      l('Content templates that keep requirements consistent', 'Des gabarits de contenu qui harmonisent les pièces demandées'),
      l('A phased plan from information site to online services', 'Un plan progressif, du site d’information aux services en ligne'),
    ],
    background: l(
      'We approach public-sector work with the same task-first, mobile-first and multilingual methods used in our published websites. We have no government client to date, and we will say so plainly in any proposal.',
      'Nous abordons le secteur public avec les mêmes méthodes que dans nos sites en ligne : une conception centrée sur les démarches, pensée d’abord pour le mobile et multilingue. Nous n’avons pas de client public à ce jour, et nous le disons clairement dans toute proposition.',
    ),
    related: ['senegal-consulaire-digital'],
  },
  {
    slug: 'digital-experience',
    tier: 'complementary',
    icon: 'web',
    title: l('Digital Experience & Web Engineering', 'Expérience numérique et ingénierie web'),
    short: l(
      'Fast, accessible, multilingual websites and web applications that represent an organization with precision.',
      'Des sites et applications web rapides, accessibles et multilingues qui représentent une organisation avec justesse.',
    ),
    headline: l('A precise first impression, in every language.', 'Une première impression juste, dans chaque langue.'),
    intro: l(
      'Your website is often the first serious encounter a partner, investor or official has with your organization. We build corporate and institutional sites that load quickly, read clearly on a phone, and are easy to keep up to date.',
      'Votre site est souvent le premier contact sérieux d’un partenaire, d’un investisseur ou d’un responsable public avec votre organisation. Nous réalisons des sites d’entreprise et institutionnels qui se chargent vite, se lisent bien sur téléphone et se mettent à jour facilement.',
    ),
    challenges: [
      l('A website that no longer reflects what the organization does', 'Un site qui ne reflète plus l’activité de l’organisation'),
      l('Poor performance and readability on mobile', 'Des performances et une lisibilité médiocres sur mobile'),
      l('One language only, for an international audience', 'Une seule langue pour un public international'),
      l('Content nobody on the team can update', 'Des contenus que personne dans l’équipe ne sait mettre à jour'),
    ],
    offerings: [
      o('Enterprise corporate websites', 'Sites d’entreprise'),
      o('Institutional websites', 'Sites institutionnels'),
      o('High-performance web applications', 'Applications web performantes'),
      o('Mobile-responsive interfaces', 'Interfaces adaptées au mobile'),
      o('UX/UI design', 'Design UX/UI'),
      o('Website modernization', 'Modernisation de sites'),
      o('Content management', 'Gestion de contenu'),
      o('Search optimization', 'Référencement naturel'),
      o('Website maintenance and continuous improvement', 'Maintenance et amélioration continue'),
    ],
    deliverables: [
      l('Messaging and page structure agreed before design', 'Un message et une arborescence validés avant le design'),
      l('Professionally written bilingual content', 'Des contenus bilingues rédigés avec soin'),
      l('Accessible, responsive build with search metadata', 'Une réalisation accessible et responsive, avec métadonnées de référencement'),
      l('Hosting set-up and an update routine', 'La mise en ligne et une routine de mise à jour'),
    ],
    background: l(
      'Published examples include the multilingual websites for Lintel & Meridian Advisory and Teranga City, both affiliated initiatives.',
      'Parmi les réalisations en ligne figurent les sites multilingues de Lintel & Meridian Advisory et de Teranga City, deux initiatives affiliées.',
    ),
    related: ['lintel-meridian-advisory', 'teranga-city', 'cabinet-magaye-sene'],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug)!;
