import type { L } from '../i18n/ui';

const l = (en: string, fr: string): L => ({ en, fr });

export const home = {
  metaTitle: l('Dalal Technologies | Technology Consulting & Digital Engineering', 'Dalal Technologies | Conseil technologique et ingénierie numérique'),
  metaDescription: l(
    'Dalal Technologies helps organizations turn complex challenges into intelligent digital platforms, actionable data and more effective ways of working. United States, Canada, Senegal and international.',
    'Dalal Technologies aide les organisations à transformer des défis complexes en plateformes numériques intelligentes, en données exploitables et en méthodes de travail plus efficaces. États-Unis, Canada, Sénégal et international.',
  ),
  heroTitle: l('Technology that moves business forward.', 'Une technologie qui fait avancer l’entreprise.'),
  heroLead: l(
    'Dalal Technologies helps organizations turn complex challenges into intelligent digital platforms, actionable data, and more effective ways of working.',
    'Dalal Technologies aide les organisations à transformer des défis complexes en plateformes numériques intelligentes, en données exploitables et en méthodes de travail plus efficaces.',
  ),
  heroMarkets: l('United States, Canada, Senegal and international', 'États-Unis, Canada, Sénégal et international'),
  signal: { data: l('Data', 'Données'), insight: l('Insight', 'Analyse'), action: l('Action', 'Action') },
  whatTitle: l('From strategy to intelligent execution.', 'De la stratégie à une exécution intelligente.'),
  whatLead: l(
    'Three core capabilities lead our work. Three complementary ones extend it into automation, public services and the web.',
    'Trois expertises principales structurent notre travail. Trois expertises complémentaires le prolongent vers l’automatisation, les services publics et le web.',
  ),
  core: l('Core capabilities', 'Expertises principales'),
  complementary: l('Complementary capabilities', 'Expertises complémentaires'),
  whyTitle: l('Built on business understanding. Driven by technology.', 'Fondée sur la compréhension des métiers. Portée par la technologie.'),
  whyLead: l(
    'Dalal Technologies brings enterprise operations experience, analytical discipline and digital engineering ambition to the same table. We start from how your organization actually runs, and we judge technology by what it improves.',
    'Dalal Technologies réunit l’expérience des opérations en grande entreprise, la rigueur analytique et l’ambition de l’ingénierie numérique. Nous partons du fonctionnement réel de votre organisation et nous jugeons la technologie à ce qu’elle améliore.',
  ),
  principles: [
    {
      title: l('Business-first thinking', 'Le métier d’abord'),
      body: l(
        'We define the operational problem and the decision it affects before we discuss tools.',
        'Nous définissons le problème opérationnel et la décision concernée avant de parler d’outils.',
      ),
    },
    {
      title: l('Data-informed decisions', 'Des décisions éclairées par les données'),
      body: l(
        'We measure the current state, agree definitions and show results with evidence.',
        'Nous mesurons la situation de départ, harmonisons les définitions et démontrons les résultats par des faits.',
      ),
    },
    {
      title: l('Practical, scalable technology', 'Une technologie pragmatique et évolutive'),
      body: l(
        'We prefer the simplest solution your team can run, built so that it can grow.',
        'Nous privilégions la solution la plus simple que votre équipe peut faire vivre, conçue pour évoluer.',
      ),
    },
  ],
  workTitle: l('Selected work and active initiatives.', 'Réalisations et initiatives en cours.'),
  workLead: l(
    'Each project is labeled with its status and whether it was commissioned, independently developed or an affiliated initiative.',
    'Chaque projet indique son statut et précise s’il a été commandé, développé de façon indépendante ou s’il s’agit d’une initiative affiliée.',
  ),
  biTitle: l('See how data becomes a decision.', 'Voyez comment une donnée devient une décision.'),
  biLead: l(
    'An interactive executive performance view of the kind we design. Change the period or the business unit and the indicators, charts and written insights update together.',
    'Une vue interactive de la performance, du type de celles que nous concevons. Changez la période ou l’unité, et les indicateurs, graphiques et commentaires se mettent à jour ensemble.',
  ),
  aiTitle: l('Automation with a human in the loop.', 'L’automatisation, avec l’humain dans la boucle.'),
  aiLead: l(
    'Choose a sample request and follow it through classification, processing and human review. This demonstration runs entirely in your browser and is not connected to any live system.',
    'Choisissez une demande type et suivez-la : classification, traitement, puis validation humaine. Cette démonstration fonctionne entièrement dans votre navigateur et n’est reliée à aucun système réel.',
  ),
  industriesTitle: l('Sectors of focus.', 'Secteurs d’intervention.'),
  industriesLead: l(
    'Where our professional background, published work and demonstrations give us a useful point of view. These are areas of focus, not a list of clients.',
    'Là où notre parcours, nos réalisations et nos démonstrations nous donnent un point de vue utile. Ce sont des secteurs d’intervention, pas une liste de clients.',
  ),
  founderTitle: l('Technology works best when it understands the business.', 'La technologie est plus efficace quand elle comprend le métier.'),
  founderBody: l(
    'Dalal Technologies was founded on more than fifteen years inside the automotive and financial services industries, building the reports, dashboards and performance routines that people relied on to run their operations. We carry that conviction forward: technology should solve operational problems, not simply look impressive.',
    'Dalal Technologies est née de plus de quinze ans au cœur de l’automobile et des services financiers, à concevoir les rapports, tableaux de bord et routines de performance sur lesquels les équipes s’appuyaient pour piloter leurs opérations. Nous prolongeons cette conviction : la technologie doit résoudre des problèmes opérationnels, pas seulement impressionner.',
  ),
  founderLink: l('About our experience', 'Découvrir notre parcours'),
  approachTitle: l('How we work.', 'Notre démarche.'),
  approachLead: l(
    'A five-step method that keeps business owners involved from the first interview to continuous improvement.',
    'Une méthode en cinq étapes qui associe les responsables métier du premier entretien à l’amélioration continue.',
  ),
  ctaTitle: l('Let’s build what comes next.', 'Construisons la suite ensemble.'),
  ctaBody: l(
    'Whether you’re modernizing an institution, improving operational intelligence or developing a new digital platform, let’s explore the right solution.',
    'Que vous modernisiez une institution, renforciez votre pilotage opérationnel ou développiez une nouvelle plateforme numérique, explorons ensemble la bonne solution.',
  ),
};

export const approach = [
  {
    title: l('Discover', 'Comprendre'),
    body: l(
      'Interviews, process walk-throughs and a look at the data you already have. We document the current state and what success should look like.',
      'Entretiens, observation des processus et examen des données existantes. Nous documentons la situation actuelle et la définition du succès.',
    ),
  },
  {
    title: l('Define', 'Définir'),
    body: l(
      'Prioritized requirements, acceptance criteria and agreed measures. Stakeholders sign off on scope before anything is built.',
      'Besoins priorisés, critères d’acceptation et indicateurs partagés. Les parties prenantes valident le périmètre avant toute réalisation.',
    ),
  },
  {
    title: l('Design', 'Concevoir'),
    body: l(
      'Prototypes tested with the people who will use them. Architecture and data choices documented and reviewed.',
      'Des prototypes testés avec les futurs utilisateurs. Choix d’architecture et de données documentés et revus.',
    ),
  },
  {
    title: l('Build', 'Réaliser'),
    body: l(
      'Incremental delivery with testing at each step, and stakeholder validation before each release goes live.',
      'Une livraison progressive, testée à chaque étape, avec validation des parties prenantes avant chaque mise en service.',
    ),
  },
  {
    title: l('Improve', 'Améliorer'),
    body: l(
      'We measure results against the starting point, hand over documentation, and plan the next round of improvements.',
      'Nous mesurons les résultats par rapport au point de départ, transmettons la documentation et planifions les améliorations suivantes.',
    ),
  },
];

export const about = {
  metaTitle: l('About Dalal Technologies', 'À propos de Dalal Technologies'),
  metaDescription: l(
    'Dalal Technologies is a technology consulting and digital engineering firm built on more than fifteen years of business intelligence and operations experience in the automotive and financial services industries.',
    'Dalal Technologies est un cabinet de conseil technologique et d’ingénierie numérique fondé sur plus de quinze ans d’expérience en intelligence d’affaires et en opérations dans l’automobile et les services financiers.',
  ),
  title: l('A consultancy built on operational experience.', 'Un cabinet né de l’expérience opérationnelle.'),
  lead: l(
    'Dalal Technologies is a young technology consulting and digital engineering firm working across the United States, Canada, Senegal and international markets. We combine business intelligence, technology strategy and digital engineering to help organizations make better decisions, modernize operations and create useful digital experiences.',
    'Dalal Technologies est un jeune cabinet de conseil technologique et d’ingénierie numérique actif aux États-Unis, au Canada, au Sénégal et à l’international. Nous associons intelligence d’affaires, stratégie technologique et ingénierie numérique pour aider les organisations à mieux décider, à moderniser leurs opérations et à créer des expériences numériques utiles.',
  ),
  nameTitle: l('The name', 'Le nom'),
  nameBody: l(
    'In Wolof, “dalal” carries the idea of welcome, of making someone feel at ease. We think good technology should do the same: meet people where they are and make their work easier.',
    'En wolof, « dalal » évoque l’accueil, le fait de mettre quelqu’un à l’aise. Nous pensons qu’une bonne technologie doit faire de même : aller vers les gens là où ils sont et leur faciliter le travail.',
  ),
  stageTitle: l('Where we are today', 'Où nous en sommes'),
  stageBody: l(
    'We are at an early stage, and we say so plainly. Our portfolio combines published websites, functional demonstrations and initiatives in development, each labeled for what it is. Experience gained in prior roles inside large organizations is described separately from the company’s own work.',
    'Nous sommes à un stade précoce, et nous le disons clairement. Notre portfolio réunit des sites en ligne, des démonstrations fonctionnelles et des initiatives en développement, chacun présenté pour ce qu’il est. L’expérience acquise dans des fonctions antérieures au sein de grandes organisations est décrite séparément des réalisations du cabinet.',
  ),
  experienceKicker: l('Our foundation', 'Nos fondations'),
  experienceTitle: l('Fifteen years inside the business before building for it.', 'Quinze ans au cœur des métiers avant de concevoir pour eux.'),
  experienceBio: [
    l(
      'Dalal Technologies was built on more than fifteen years of professional experience across the international automotive industry, financial services, business intelligence, logistics, business operations and dealer network performance.',
      'Dalal Technologies s’appuie sur plus de quinze ans d’expérience professionnelle dans l’industrie automobile internationale, les services financiers, l’intelligence d’affaires, la logistique, les opérations et la performance des réseaux de concessionnaires.',
    ),
    l(
      'That experience began in enterprise operations, learning how large organizations really run: the handoffs between teams, the controls that keep processes honest, and the reports that leaders depend on. Within the North American operations and captive finance arm of a global premium automaker, it grew into business intelligence work: gathering requirements, building SQL reporting and KPI dashboards in Power BI and Tableau, automating reporting, and analyzing parts logistics, inventory and availability.',
      'Cette expérience a commencé dans les opérations de grandes entreprises, à comprendre leur fonctionnement réel : les relais entre équipes, les contrôles qui garantissent la rigueur des processus et les rapports sur lesquels s’appuient les dirigeants. Au sein des opérations nord-américaines et de la filiale de financement d’un constructeur automobile premium mondial, elle s’est prolongée dans l’intelligence d’affaires : recueil des besoins, rapports SQL et tableaux de bord d’indicateurs sous Power BI et Tableau, automatisation du reporting, analyse de la logistique des pièces, des stocks et de la disponibilité.',
    ),
    l(
      'In parts and service area management for a multinational automotive group, it moved from producing analysis to using it in the field: managing network performance, working with dealer scorecards and KPI gap analysis, and turning data into action plans with dealerships. Along the way came practical performance-support tools, daily use of AI-enabled analytical and productivity tools, and a successful entry in an internal AI innovation competition.',
      'Dans le pilotage régional des pièces et du service pour un groupe automobile multinational, elle est passée de la production d’analyses à leur usage sur le terrain : pilotage de la performance du réseau, tableaux de performance des concessionnaires, analyse des écarts d’indicateurs et transformation des données en plans d’action avec les concessions. En chemin sont venus des outils pratiques d’aide à la performance, l’usage quotidien d’outils d’analyse et de productivité fondés sur l’IA, et une participation réussie à un concours interne d’innovation en IA.',
    ),
    l(
      'Dalal Technologies is the next step in that progression, from enterprise operations, to business intelligence, to digital innovation, to technology entrepreneurship. It rests on a simple conviction: organizations need technology that solves operational problems, not simply technology that looks impressive.',
      'Dalal Technologies est l’étape suivante de ce parcours : des opérations à l’intelligence d’affaires, puis à l’innovation numérique et à l’entrepreneuriat technologique. Le cabinet repose sur une conviction simple : les organisations ont besoin d’une technologie qui résout leurs problèmes opérationnels, pas seulement d’une technologie qui impressionne.',
    ),
  ],
  pathTitle: l('How the experience was built', 'Comment cette expérience s’est construite'),
  path: [
    { stage: l('Enterprise operations', 'Opérations'), detail: l('Financial services operations, quality control and process improvement', 'Opérations de services financiers, contrôle qualité et amélioration des processus') },
    { stage: l('Business intelligence', 'Intelligence d’affaires'), detail: l('Premium automotive and captive finance: KPI dashboards, SQL, Power BI, Tableau, logistics analytics', 'Automobile premium et financement captif : tableaux de bord, SQL, Power BI, Tableau, analyse logistique') },
    { stage: l('Field performance and digital innovation', 'Performance terrain et innovation numérique'), detail: l('Multinational automotive group: network performance, dealer scorecards, AI-enabled tools', 'Groupe automobile multinational : performance du réseau, tableaux de performance, outils fondés sur l’IA') },
    { stage: l('Technology entrepreneurship', 'Entrepreneuriat technologique'), detail: l('Dalal Technologies', 'Dalal Technologies') },
  ],
  biTitle: l('Automotive and automotive finance', 'Automobile et financement automobile'),
  bi: [
    l('Business intelligence and performance reporting', 'Intelligence d’affaires et suivi de la performance'),
    l('Business requirements analysis', 'Analyse des besoins métier'),
    l('KPI dashboard development in Power BI and Tableau', 'Tableaux de bord d’indicateurs sous Power BI et Tableau'),
    l('SQL reporting, data transformation and reporting automation', 'Rapports SQL, transformation des données et automatisation du reporting'),
    l('Supply chain, parts logistics, inventory and availability analytics', 'Analyse de la chaîne logistique, des pièces, des stocks et de la disponibilité'),
    l('Financial services operations, quality control and process improvement', 'Opérations de services financiers, contrôle qualité et amélioration des processus'),
    l('Cross-functional collaboration, project coordination and performance measurement', 'Collaboration transverse, coordination de projets et mesure de la performance'),
  ],
  fieldTitle: l('Dealer network performance', 'Performance des réseaux de concessionnaires'),
  field: [
    l('Parts and service network performance management', 'Pilotage de la performance du réseau pièces et service'),
    l('Dealer performance scorecards and KPI gap analysis', 'Tableaux de performance des concessionnaires et analyse des écarts'),
    l('Retail and aftersales business performance', 'Performance commerciale et après-vente'),
    l('Operational improvement initiatives and dealer action planning', 'Initiatives d’amélioration opérationnelle et plans d’action avec les concessions'),
    l('Data-informed field management', 'Pilotage terrain fondé sur les données'),
    l('AI-enabled productivity and analytical tools', 'Outils de productivité et d’analyse fondés sur l’IA'),
  ],
  strengthsTitle: l('Strengths', 'Points forts'),
  strengths: [
    l('Business intelligence', 'Intelligence d’affaires'),
    l('Data visualization', 'Visualisation de données'),
    l('Digital strategy', 'Stratégie numérique'),
    l('Business analysis', 'Analyse métier'),
    l('Project management', 'Gestion de projet'),
    l('Stakeholder management', 'Gestion des parties prenantes'),
    l('Process improvement', 'Amélioration des processus'),
    l('Technology-enabled problem solving', 'Résolution de problèmes par la technologie'),
    l('English and French', 'Anglais et français'),
    l('United States, Canada and Senegal', 'États-Unis, Canada et Sénégal'),
  ],
  disclaimer: l(
    'This experience was gained in prior employment. Those organizations are not clients of Dalal Technologies and do not sponsor or endorse it.',
    'Cette expérience a été acquise dans des fonctions antérieures. Les organisations concernées ne sont pas clientes de Dalal Technologies et ne la parrainent ni ne la cautionnent.',
  ),
};

export const contactCopy = {
  metaTitle: l('Contact Dalal Technologies', 'Contacter Dalal Technologies'),
  metaDescription: l(
    'Start a conversation with Dalal Technologies about business intelligence, technology consulting, digital platforms or institutional websites.',
    'Échangez avec Dalal Technologies sur l’intelligence d’affaires, le conseil technologique, les plateformes numériques ou les sites institutionnels.',
  ),
  title: l('Start a conversation.', 'Engageons la conversation.'),
  lead: l(
    'Tell us about the challenge you are working on. A short description is enough to begin.',
    'Parlez-nous du défi qui vous occupe. Une courte description suffit pour commencer.',
  ),
  direct: l('Reach us directly', 'Nous joindre directement'),
  email: l('Email', 'Courriel'),
  phone: l('Phone', 'Téléphone'),
  location: l('Based in', 'Basés à'),
  markets: l('Markets', 'Marchés'),
  form: {
    name: l('Full name', 'Nom complet'),
    org: l('Organization', 'Organisation'),
    orgHint: l('Optional', 'Facultatif'),
    email: l('Work email', 'Adresse e-mail professionnelle'),
    topic: l('What would you like to discuss?', 'Quel sujet souhaitez-vous aborder ?'),
    topics: [
      l('Business intelligence and analytics', 'Intelligence d’affaires et analyse de données'),
      l('Technology consulting or transformation', 'Conseil technologique ou transformation'),
      l('A software platform or portal', 'Une plateforme logicielle ou un portail'),
      l('AI and automation', 'IA et automatisation'),
      l('A government or institutional project', 'Un projet public ou institutionnel'),
      l('A website', 'Un site web'),
      l('Something else', 'Autre sujet'),
    ],
    message: l('Your message', 'Votre message'),
    messageHint: l('Please do not include passwords, ID numbers or other sensitive personal data.', 'Merci de ne pas inclure de mots de passe, de numéros d’identité ni d’autres données personnelles sensibles.'),
    consent: l(
      'I agree that Dalal Technologies may use the information above to respond to my inquiry.',
      'J’accepte que Dalal Technologies utilise les informations ci-dessus pour répondre à ma demande.',
    ),
    notice: l(
      'We collect your name, organization, email address, topic and message, and use them only to respond to your business inquiry. We do not sell them or add you to a mailing list.',
      'Nous recueillons votre nom, votre organisation, votre adresse e-mail, le sujet et votre message, uniquement pour répondre à votre demande professionnelle. Nous ne les vendons pas et ne vous inscrivons à aucune liste de diffusion.',
    ),
    send: l('Send message', 'Envoyer le message'),
    sending: l('Sending…', 'Envoi en cours…'),
    errors: {
      name: l('Enter your name.', 'Indiquez votre nom.'),
      email: l('Enter a valid email address, for example name@company.com.', 'Indiquez une adresse e-mail valide, par exemple nom@entreprise.com.'),
      topic: l('Choose a topic.', 'Choisissez un sujet.'),
      message: l('Write a message of at least 20 characters.', 'Rédigez un message d’au moins 20 caractères.'),
      consent: l('Confirm that we may use your information to respond.', 'Confirmez que nous pouvons utiliser vos informations pour vous répondre.'),
      summary: l('Please correct the highlighted fields.', 'Merci de corriger les champs signalés.'),
      network: l(
        'Your message could not be sent. Check your connection and try again, or email us directly.',
        'Votre message n’a pas pu être envoyé. Vérifiez votre connexion et réessayez, ou écrivez-nous directement.',
      ),
    },
    sentTitle: l('Message sent', 'Message envoyé'),
    sentBody: l('Thank you. Your message has reached us, and we will reply by email.', 'Merci. Votre message nous est bien parvenu ; nous vous répondrons par e-mail.'),
    sendAnother: l('Send another message', 'Envoyer un autre message'),
  },
};
