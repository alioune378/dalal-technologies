import type { L } from '../i18n/ui';

export type Insight = {
  slug: string;
  date: string; // ISO
  minutes: number;
  topic: L;
  title: L;
  dek: L;
  body: { en: string[]; fr: string[] };
  services: string[];
};

const l = (en: string, fr: string): L => ({ en, fr });

export const insights: Insight[] = [
  {
    slug: 'dashboards-and-decisions',
    date: '2026-10-27',
    minutes: 4,
    topic: l('Business intelligence', 'Intelligence d’affaires'),
    title: l('Dashboards do not change decisions. Decision routines do.', 'Ce ne sont pas les tableaux de bord qui changent les décisions, ce sont les routines.'),
    dek: l(
      'Why the most useful reporting starts with a meeting on the calendar, not a chart library.',
      'Pourquoi le reporting le plus utile commence par une réunion inscrite à l’agenda, et non par une bibliothèque de graphiques.',
    ),
    body: {
      en: [
        'Many organizations have more dashboards than they can name. Few can point to a decision that changed because of one. The problem is rarely the software. It is that the dashboard was designed around the data that was available, not around a decision someone makes on a regular basis.',
        'A better starting point is the decision routine: the weekly operations review, the monthly performance call, the quarterly budget discussion. For each routine, ask three questions. What decision is made here? Which three to five indicators would change that decision? How early must those indicators be known to act on them?',
        'Those answers define the scope. An indicator that does not influence any routine can wait. An indicator that arrives after the meeting has no value, however attractive the chart. Timeliness and agreed definitions matter more than visual polish.',
        'The second discipline is a single definition for each indicator. When finance and operations calculate the same measure differently, every meeting begins with a debate about whose number is right. A short KPI dictionary, agreed once and built into the data preparation, removes that debate.',
        'Finally, a good dashboard proposes the next question. If service retention is falling, the view should help the reader see where, since when and alongside what. That is the difference between reporting that informs and reporting that drives action.',
      ],
      fr: [
        'Beaucoup d’organisations possèdent plus de tableaux de bord qu’elles ne peuvent en citer. Peu peuvent désigner une décision qui a changé grâce à l’un d’eux. Le problème vient rarement du logiciel : le tableau de bord a été conçu à partir des données disponibles, et non autour d’une décision prise régulièrement.',
        'Mieux vaut partir de la routine de décision : la revue opérationnelle hebdomadaire, le point mensuel de performance, l’arbitrage budgétaire trimestriel. Pour chacune, trois questions. Quelle décision y est prise ? Quels trois à cinq indicateurs pourraient la faire changer ? Combien de temps à l’avance faut-il les connaître pour agir ?',
        'Ces réponses définissent le périmètre. Un indicateur qui n’influence aucune routine peut attendre. Un indicateur qui arrive après la réunion n’a aucune valeur, aussi élégant soit le graphique. La fraîcheur des données et des définitions partagées comptent davantage que la finition visuelle.',
        'Deuxième discipline : une définition unique par indicateur. Quand la finance et les opérations calculent différemment la même mesure, chaque réunion commence par un débat sur le bon chiffre. Un court dictionnaire d’indicateurs, validé une fois et intégré à la préparation des données, met fin à ce débat.',
        'Enfin, un bon tableau de bord suggère la question suivante. Si la fidélisation au service recule, la vue doit aider à voir où, depuis quand et en lien avec quoi. C’est toute la différence entre un reporting qui informe et un reporting qui fait agir.',
      ],
    },
    services: ['business-intelligence'],
  },
  {
    slug: 'public-services-start-with-the-question',
    date: '2026-10-27',
    minutes: 4,
    topic: l('Digital government', 'Administration numérique'),
    title: l('Digital public services start with the question, not the organization chart.', 'Les services publics numériques commencent par la question de l’usager, pas par l’organigramme.'),
    dek: l(
      'What consular and administrative websites can gain by organizing information around tasks.',
      'Ce que les sites consulaires et administratifs gagnent à organiser l’information autour des démarches.',
    ),
    body: {
      en: [
        'A citizen who visits an institutional website almost always arrives with one task: renew a passport, register a birth, obtain a certificate. Yet many sites are arranged like the institution itself, with sections for each department and news on the home page.',
        'Task-first design reverses that logic. The entry point is a search box and a short list of the most common services. Each service follows the same template: who it is for, what documents are required, what it costs, how long it takes and what to do next. Consistency matters as much as content, because people learn the pattern once and reuse it.',
        'Mobile comes first. For diaspora audiences in particular, the phone is the main and often the only screen. Pages must load quickly on modest connections, read well on a small display and be usable by people with disabilities.',
        'Language is part of access. Professionally written content in each language the community uses, rather than machine translation presented as authoritative, is a basic form of respect and reduces errors.',
        'Transactions can come later. A clear, accurate, well-structured information service already reduces calls and repeat visits, and it creates the foundation that online forms and appointment systems will need.',
      ],
      fr: [
        'Un citoyen qui consulte un site institutionnel arrive presque toujours avec une seule démarche en tête : renouveler un passeport, déclarer une naissance, obtenir un certificat. Pourtant, de nombreux sites reproduisent l’organisation de l’institution, avec une rubrique par direction et des actualités en page d’accueil.',
        'Une conception centrée sur les démarches inverse cette logique. Le point d’entrée est un champ de recherche et une courte liste des services les plus demandés. Chaque démarche suit le même gabarit : à qui elle s’adresse, quelles pièces fournir, combien elle coûte, quels délais, quelle suite donner. La cohérence compte autant que le contenu : l’usager apprend le modèle une fois et le réutilise.',
        'Le mobile d’abord. Pour la diaspora en particulier, le téléphone est l’écran principal, souvent le seul. Les pages doivent se charger vite sur des connexions modestes, se lire facilement sur un petit écran et rester utilisables par les personnes en situation de handicap.',
        'La langue fait partie de l’accès. Des contenus rédigés avec soin dans chaque langue de la communauté, plutôt qu’une traduction automatique présentée comme faisant foi, sont une marque de respect élémentaire et réduisent les erreurs.',
        'Les services transactionnels peuvent venir ensuite. Un service d’information clair, exact et bien structuré réduit déjà les appels et les déplacements inutiles, et pose les fondations dont les formulaires en ligne et la prise de rendez-vous auront besoin.',
      ],
    },
    services: ['digital-government'],
  },
  {
    slug: 'responsible-ai-one-workflow',
    date: '2026-10-27',
    minutes: 3,
    topic: l('AI & automation', 'IA et automatisation'),
    title: l('Adopting AI responsibly: one workflow, one owner, one human checkpoint.', 'Adopter l’IA avec méthode : un processus, un responsable, un contrôle humain.'),
    dek: l(
      'A practical way to begin with AI that builds confidence instead of risk.',
      'Une manière concrète de commencer avec l’IA qui crée de la confiance plutôt que du risque.',
    ),
    body: {
      en: [
        'Organizations often approach AI as a platform decision. A more reliable starting point is a single, well-understood workflow with a clear owner: incoming requests that need sorting, documents that need key fields extracted, or reports that need a first-draft summary.',
        'Choose a workflow where the current process is documented, volume is meaningful, and an error can be caught before it reaches a customer or citizen. Measure how it performs today, so improvement can be shown rather than assumed.',
        'Design the human checkpoint before the model. Decide which outputs a person must review, what confidence level triggers escalation and who is accountable for the final decision. AI should prepare the work, not silently complete it.',
        'Treat data protection as a design constraint. Use representative but non-sensitive data for prototypes, keep personal data out of tools that are not approved for it, and record what the system is allowed to do.',
        'When the first workflow is stable and measured, the organization has something more valuable than a demonstration: evidence, a governance pattern and a team that trusts the approach.',
      ],
      fr: [
        'Les organisations abordent souvent l’IA comme un choix de plateforme. Il est plus sûr de commencer par un seul processus bien compris, avec un responsable identifié : des demandes entrantes à trier, des documents dont il faut extraire les informations clés, des rapports qui gagneraient à une première synthèse.',
        'Choisissez un processus documenté, au volume significatif, où une erreur peut être repérée avant d’atteindre un client ou un usager. Mesurez sa performance actuelle, afin de pouvoir démontrer l’amélioration plutôt que la supposer.',
        'Concevez le contrôle humain avant le modèle. Décidez quels résultats une personne doit vérifier, quel niveau de confiance déclenche une escalade et qui reste responsable de la décision finale. L’IA doit préparer le travail, pas l’achever en silence.',
        'Faites de la protection des données une contrainte de conception. Utilisez des données représentatives mais non sensibles pour les prototypes, tenez les données personnelles à l’écart des outils non autorisés et consignez ce que le système a le droit de faire.',
        'Une fois le premier processus stabilisé et mesuré, l’organisation dispose de bien plus qu’une démonstration : des preuves, un modèle de gouvernance et une équipe qui a confiance dans la démarche.',
      ],
    },
    services: ['ai-automation'],
  },
];

export const insightBySlug = (slug: string) => insights.find((i) => i.slug === slug)!;
