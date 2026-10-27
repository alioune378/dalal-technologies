import { site } from '../config/site';
import { about, contactCopy, home } from '../content/company';
import { insights, insightBySlug } from '../content/insights';
import { industries } from '../content/industries';
import { ownershipLabel, projectBySlug, visibleProjects } from '../content/projects';
import { serviceBySlug } from '../content/services';
import { ui } from '../i18n/ui';
import { formatDate, href, Island, tr, type PageCtx } from '../lib/core';
import { IconMail, IconPhone, IconPin } from '../components/Icons';
import { CtaBand, ExternalLink, PageHead, ProjectCard, ProjectPreview, StatusBadge } from '../components/ui';
import WorkFilter from '../islands/WorkFilter';
import ContactForm from '../islands/ContactForm';

const L = (en: string, fr: string) => ({ en, fr });

/* ---------------- Work ---------------- */

const W = {
  title: L('Work and innovation.', 'Réalisations et innovation.'),
  lead: L(
    'Published projects, functional demonstrations and initiatives in development. Every project states its status and whether it was commissioned, independently developed or an affiliated initiative.',
    'Projets en ligne, démonstrations fonctionnelles et initiatives en développement. Chaque projet indique son statut et précise s’il a été commandé, développé de façon indépendante ou s’il s’agit d’une initiative affiliée.',
  ),
  challenge: L('The challenge', 'L’enjeu'),
  solution: L('The digital solution', 'La solution numérique'),
  features: L('Key features', 'Fonctionnalités clés'),
  tech: L('Technology approach', 'Approche technique'),
  status: L('Status', 'Statut'),
  sector: L('Sector', 'Secteur'),
  engagement: L('Engagement', 'Engagement'),
  link: L('Link', 'Lien'),
  noLink: L('Not yet public', 'Pas encore public'),
  results: L('Results', 'Résultats'),
  resultsNote: L(
    'We publish outcomes only when they can be substantiated. This section will be completed when measured results are available.',
    'Nous ne publions des résultats que lorsqu’ils peuvent être étayés. Cette section sera complétée lorsque des résultats mesurés seront disponibles.',
  ),
  more: L('More work', 'Autres réalisations'),
};

export function WorkIndex({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  return (
    <>
      <PageHead locale={locale} title={tr(W.title, locale)} lead={tr(W.lead, locale)} crumbs={[{ label: tr(ui.nav.work, locale) }]} />
      <section className="section tight">
        <div className="wrap">
          <Island name="WorkFilter" props={{ locale }}>
            <WorkFilter locale={locale} />
          </Island>
        </div>
      </section>
      <CtaBand locale={locale} title={tr(home.ctaTitle, locale)} body={tr(home.ctaBody, locale)} />
    </>
  );
}

export function ProjectDetail({ ctx, slug }: { ctx: PageCtx; slug: string }) {
  const { locale } = ctx;
  const p = projectBySlug(slug)!;
  const more = visibleProjects.filter((o) => o.slug !== slug).slice(0, 3);
  const isDemo = p.category === 'demonstration';
  return (
    <>
      <PageHead locale={locale} title={p.name} crumbs={[{ label: tr(ui.nav.work, locale), path: 'work' }, { label: p.name }]}>
        <p className="lead">{tr(p.summary, locale)}</p>
        {p.url && (
          <div className="head-actions">
            <ExternalLink url={p.url} label={isDemo ? ui.common.openDemo : ui.common.visit} locale={locale} className="btn btn-navy" />
          </div>
        )}
      </PageHead>

      {p.disclosure && (
        <div className="wrap">
          <p className="disclosure" role="note">
            {tr(p.disclosure, locale)}
          </p>
        </div>
      )}

      <section className="section tight">
        <div className="wrap case-grid">
          <div className="case-visual">
            <ProjectPreview project={p} size="lg" />
          </div>
          <dl className="case-facts">
            <div>
              <dt>{tr(W.status, locale)}</dt>
              <dd>
                <StatusBadge project={p} locale={locale} />
              </dd>
            </div>
            <div>
              <dt>{tr(W.sector, locale)}</dt>
              <dd>{tr(p.sector, locale)}</dd>
            </div>
            <div>
              <dt>{tr(W.engagement, locale)}</dt>
              <dd>
                <strong>{tr(ownershipLabel[p.ownership], locale)}</strong>
                <br />
                {tr(p.ownershipNote, locale)}
              </dd>
            </div>
            <div>
              <dt>{tr(W.link, locale)}</dt>
              <dd>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    <span className="sr-only"> {tr(ui.common.newWindow, locale)}</span>
                  </a>
                ) : (
                  tr(W.noLink, locale)
                )}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap case-body">
          <div>
            <h2 className="h-sm">{tr(W.challenge, locale)}</h2>
            <p>{tr(p.challenge, locale)}</p>
            <h2 className="h-sm">{tr(W.solution, locale)}</h2>
            <p>{tr(p.solution, locale)}</p>
          </div>
          <div>
            <h2 className="h-sm">{tr(W.features, locale)}</h2>
            <ul className="check-list">
              {p.features.map((f, i) => (
                <li key={i}>{tr(f, locale)}</li>
              ))}
            </ul>
            {p.tech && (
              <>
                <h2 className="h-sm">{tr(W.tech, locale)}</h2>
                <p>{tr(p.tech, locale)}</p>
              </>
            )}
            <h2 className="h-sm">{tr(W.results, locale)}</h2>
            <p className="note">{tr(W.resultsNote, locale)}</p>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <h2 className="h-md">{tr(W.more, locale)}</h2>
          <div className="project-grid">
            {more.map((o) => (
              <ProjectCard key={o.slug} project={o} locale={locale} />
            ))}
          </div>
          <p className="more-link">
            <a className="text-link" href={href(locale, 'work')}>
              {tr(ui.common.viewAll, locale)}
            </a>
          </p>
        </div>
      </section>
      <CtaBand locale={locale} title={tr(home.ctaTitle, locale)} body={tr(home.ctaBody, locale)} />
    </>
  );
}

/* ---------------- About ---------------- */

export function About({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  const A = about;
  return (
    <>
      <PageHead locale={locale} title={tr(A.title, locale)} lead={tr(A.lead, locale)} crumbs={[{ label: tr(ui.nav.about, locale) }]} />
      <section className="section tight">
        <div className="wrap split">
          <div>
            <h2 className="h-sm">{tr(A.nameTitle, locale)}</h2>
            <p>{tr(A.nameBody, locale)}</p>
          </div>
          <div>
            <h2 className="h-sm">{tr(A.stageTitle, locale)}</h2>
            <p>{tr(A.stageBody, locale)}</p>
          </div>
        </div>
      </section>

      <section className="section founder-page" aria-labelledby="experience-title">
        <div className="wrap founder-layout">
          <div className="founder-type large">
            <span className="ft-rule" />
            <span className="ft-name">15+</span>
            <span className="ft-role">{tr({ en: 'years of operations and business intelligence experience in automotive and financial services', fr: 'ans d’expérience en opérations et en intelligence d’affaires dans l’automobile et les services financiers' }, locale)}</span>
          </div>
          <div className="founder-text">
            <p className="kicker">{tr(A.experienceKicker, locale)}</p>
            <h2 id="experience-title">{tr(A.experienceTitle, locale)}</h2>
            {A.experienceBio.map((b, i) => (
              <p key={i} className={i === 0 ? 'lead' : undefined}>
                {tr(b, locale)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <h2 className="h-md">{tr(A.pathTitle, locale)}</h2>
          <ol className="path">
            {A.path.map((s, i) => (
              <li key={i}>
                <span className="step-n">{i + 1}</span>
                <h3>{tr(s.stage, locale)}</h3>
                <p>{tr(s.detail, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap three-col">
          <div>
            <h2 className="h-sm">{tr(A.biTitle, locale)}</h2>
            <ul className="plain-list">
              {A.bi.map((b, i) => (
                <li key={i}>{tr(b, locale)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-sm">{tr(A.fieldTitle, locale)}</h2>
            <ul className="plain-list">
              {A.field.map((b, i) => (
                <li key={i}>{tr(b, locale)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-sm">{tr(A.strengthsTitle, locale)}</h2>
            <ul className="tag-list">
              {A.strengths.map((b, i) => (
                <li key={i}>{tr(b, locale)}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="wrap">
          <p className="disclosure subtle">{tr(A.disclaimer, locale)}</p>
        </div>
      </section>
      <CtaBand locale={locale} title={tr(home.ctaTitle, locale)} body={tr(home.ctaBody, locale)} />
    </>
  );
}

/* ---------------- Insights ---------------- */

const I = {
  title: L('Insights.', 'Analyses.'),
  lead: L(
    'Short, practical perspectives on data, digital services and responsible automation.',
    'Des points de vue courts et concrets sur les données, les services numériques et l’automatisation responsable.',
  ),
  by: L('By Dalal Technologies', 'Par Dalal Technologies'),
};

export function InsightsIndex({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  return (
    <>
      <PageHead locale={locale} title={tr(I.title, locale)} lead={tr(I.lead, locale)} crumbs={[{ label: tr(ui.nav.insights, locale) }]} />
      <section className="section tight">
        <div className="wrap">
          <ul className="insight-list">
            {insights.map((a) => (
              <li key={a.slug}>
                <a href={href(locale, `insights/${a.slug}`)}>
                  <p className="insight-meta">
                    {tr(a.topic, locale)} <span aria-hidden="true">/</span> {a.minutes} {tr(ui.common.minutes, locale)}
                  </p>
                  <h2>{tr(a.title, locale)}</h2>
                  <p>{tr(a.dek, locale)}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export function InsightDetail({ ctx, slug }: { ctx: PageCtx; slug: string }) {
  const { locale } = ctx;
  const a = insightBySlug(slug);
  return (
    <>
      <article>
        <PageHead locale={locale} title={tr(a.title, locale)} crumbs={[{ label: tr(ui.nav.insights, locale), path: 'insights' }, { label: tr(a.topic, locale) }]}>
          <p className="lead">{tr(a.dek, locale)}</p>
          <p className="article-meta">
            {tr(I.by, locale)} <span aria-hidden="true">/</span> <time dateTime={a.date}>{formatDate(a.date, locale)}</time> <span aria-hidden="true">/</span> {a.minutes} {tr(ui.common.minutes, locale)}
          </p>
        </PageHead>
        <div className="section tight">
          <div className="wrap prose">
            {a.body[locale].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="related-services">
              {a.services.map((s) => (
                <a key={s} className="text-link" href={href(locale, `services/${s}`)}>
                  {tr(serviceBySlug(s).title, locale)}
                </a>
              ))}
            </p>
          </div>
        </div>
      </article>
      <section className="section tight">
        <div className="wrap">
          <h2 className="h-md">{tr(ui.common.allInsights, locale)}</h2>
          <ul className="insight-list compact">
            {insights.filter((o) => o.slug !== slug).map((o) => (
              <li key={o.slug}>
                <a href={href(locale, `insights/${o.slug}`)}>
                  <p className="insight-meta">{tr(o.topic, locale)}</p>
                  <h3>{tr(o.title, locale)}</h3>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand locale={locale} title={tr(home.ctaTitle, locale)} body={tr(home.ctaBody, locale)} />
    </>
  );
}

/* ---------------- Contact ---------------- */

export function Contact({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  const C = contactCopy;
  return (
    <>
      <PageHead locale={locale} title={tr(C.title, locale)} lead={tr(C.lead, locale)} crumbs={[{ label: tr(ui.nav.contact, locale) }]} />
      <section className="section tight">
        <div className="wrap contact-grid">
          <div>
            {site.contactFormName ? (
              <Island name="ContactForm" props={{ locale, formName: site.contactFormName, email: site.email }}>
                <ContactForm locale={locale} formName={site.contactFormName} email={site.email} />
              </Island>
            ) : null}
          </div>
          <aside className="contact-aside">
            <h2 className="h-sm">{tr(C.direct, locale)}</h2>
            <ul className="contact-list">
              <li>
                <IconMail />
                <span>
                  <span className="cl-k">{tr(C.email, locale)}</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </span>
              </li>
              <li>
                <IconPhone />
                <span>
                  <span className="cl-k">{tr(C.phone, locale)}</span>
                  <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
                </span>
              </li>
              <li>
                <IconPin />
                <span>
                  <span className="cl-k">{tr(C.location, locale)}</span>
                  {tr(site.location, locale)}
                </span>
              </li>
            </ul>
            <p className="note">
              <span className="cl-k">{tr(C.markets, locale)}</span>
              {tr(site.markets, locale)}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

export function Thanks({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  const F = contactCopy.form;
  return (
    <>
      <PageHead locale={locale} title={tr(F.sentTitle, locale)} lead={tr(F.sentBody, locale)} crumbs={[{ label: tr(ui.nav.contact, locale), path: 'contact' }, { label: tr(F.sentTitle, locale) }]}>
        <div className="head-actions">
          <a className="btn btn-navy" href={href(locale)}>
            {tr(ui.common.home, locale)}
          </a>
        </div>
      </PageHead>
    </>
  );
}

/* ---------------- Legal ---------------- */

type Sec = { h: string; p: string[] };
const legal: Record<'privacy' | 'terms', { title: { en: string; fr: string }; updated: string; en: Sec[]; fr: Sec[] }> = {
  privacy: {
    title: L('Privacy notice', 'Politique de confidentialité'),
    updated: '2026-10-27',
    en: [
      { h: 'Who we are', p: [`This website is operated by ${site.name}. For any privacy question, write to ${site.email}.`] },
      { h: 'What we collect', p: ['When you use the contact form, we collect your name, organization (optional), email address, the topic you choose, your message and the language of the page. We do not ask for, and you should not send, sensitive personal data.', 'Our hosting provider processes technical data such as IP addresses in server logs to deliver and protect the site.'] },
      { h: 'How we use it', p: ['We use contact-form information only to respond to your business inquiry and to keep a record of our correspondence. We do not sell it, share it for marketing, or add you to a mailing list.'] },
      { h: 'Where it is stored', p: ['Form submissions are received and stored by our hosting provider, Netlify, Inc., which processes them on our behalf. Netlify may process data in the United States.'] },
      { h: 'How long we keep it', p: ['We keep inquiries for as long as needed to handle them and for a reasonable period afterwards, and delete them on request unless we must keep them by law.'] },
      { h: 'Cookies and analytics', p: ['This site does not use advertising or analytics cookies. Your language choice may be remembered in your browser’s local storage; it is not sent to us.'] },
      { h: 'Your rights', p: [`You can ask to access, correct or delete the information you sent us by writing to ${site.email}.`] },
    ],
    fr: [
      { h: 'Qui sommes-nous', p: [`Ce site est édité par ${site.name}. Pour toute question relative à vos données, écrivez à ${site.email}.`] },
      { h: 'Données recueillies', p: ['Lorsque vous utilisez le formulaire de contact, nous recueillons votre nom, votre organisation (facultatif), votre adresse e-mail, le sujet choisi, votre message et la langue de la page. Nous ne demandons pas de données sensibles et vous invitons à ne pas en transmettre.', 'Notre hébergeur traite des données techniques, comme les adresses IP dans les journaux du serveur, pour fournir et protéger le site.'] },
      { h: 'Utilisation', p: ['Les informations du formulaire servent uniquement à répondre à votre demande professionnelle et à conserver une trace de nos échanges. Nous ne les vendons pas, ne les partageons pas à des fins de marketing et ne vous inscrivons à aucune liste de diffusion.'] },
      { h: 'Hébergement', p: ['Les messages sont reçus et conservés par notre hébergeur, Netlify, Inc., qui les traite pour notre compte. Netlify peut traiter des données aux États-Unis.'] },
      { h: 'Durée de conservation', p: ['Nous conservons les demandes le temps nécessaire à leur traitement puis pendant une durée raisonnable, et les supprimons sur demande, sauf obligation légale.'] },
      { h: 'Cookies et mesure d’audience', p: ['Ce site n’utilise ni cookies publicitaires ni outil de mesure d’audience. Votre choix de langue peut être mémorisé dans le stockage local de votre navigateur ; il ne nous est pas transmis.'] },
      { h: 'Vos droits', p: [`Vous pouvez demander l’accès, la rectification ou la suppression des informations transmises en écrivant à ${site.email}.`] },
    ],
  },
  terms: {
    title: L('Terms of use', 'Conditions d’utilisation'),
    updated: '2026-10-27',
    en: [
      { h: 'About this website', p: [`This website presents ${site.name} and its services for information only. Nothing on it is an offer, a contract or professional advice for a specific situation.`] },
      { h: 'Demonstrations and synthetic data', p: ['Interactive dashboards, workflows and project demonstrations on this site are illustrative. They use synthetic data, are not connected to live systems and do not represent any real organization’s performance.'] },
      { h: 'Third parties', p: ['Descriptions of prior professional experience do not name or imply any client or endorsement. Independent demonstrations, such as Sénégal Consulaire Digital, are not commissioned or endorsed by the institutions they concern. Links to external websites are provided for convenience; we are not responsible for their content.'] },
      { h: 'Intellectual property', p: [`The content, design and code of this site belong to ${site.name} unless stated otherwise. Typefaces are used under the SIL Open Font License.`] },
      { h: 'Liability', p: ['We take care to keep information accurate but provide it without warranty. To the extent permitted by law, we are not liable for decisions made on the basis of this website.'] },
      { h: 'Contact', p: [`Questions about these terms: ${site.email}.`] },
    ],
    fr: [
      { h: 'À propos du site', p: [`Ce site présente ${site.name} et ses services à titre informatif. Rien de ce qu’il contient ne constitue une offre, un contrat ou un conseil professionnel adapté à une situation particulière.`] },
      { h: 'Démonstrations et données synthétiques', p: ['Les tableaux de bord, processus et démonstrations présentés sur ce site sont illustratifs. Ils utilisent des données synthétiques, ne sont reliés à aucun système réel et ne représentent la performance d’aucune organisation.'] },
      { h: 'Tiers', p: ['La description de notre expérience professionnelle antérieure ne désigne et n’implique aucun client ni aucune caution. Les démonstrations indépendantes, comme Sénégal Consulaire Digital, ne sont ni commandées ni approuvées par les institutions concernées. Les liens vers des sites externes sont fournis par commodité ; nous ne sommes pas responsables de leur contenu.'] },
      { h: 'Propriété intellectuelle', p: [`Les contenus, le design et le code de ce site appartiennent à ${site.name}, sauf mention contraire. Les polices sont utilisées sous licence SIL Open Font License.`] },
      { h: 'Responsabilité', p: ['Nous veillons à l’exactitude des informations, sans toutefois la garantir. Dans les limites permises par la loi, nous ne saurions être tenus responsables des décisions prises sur la base de ce site.'] },
      { h: 'Contact', p: [`Questions sur ces conditions : ${site.email}.`] },
    ],
  },
};

export function Legal({ ctx, kind }: { ctx: PageCtx; kind: 'privacy' | 'terms' }) {
  const { locale } = ctx;
  const d = legal[kind];
  return (
    <>
      <PageHead locale={locale} title={tr(d.title, locale)} crumbs={[{ label: tr(d.title, locale) }]}>
        <p className="article-meta">
          {locale === 'fr' ? 'Mise à jour : ' : 'Last updated: '}
          <time dateTime={d.updated}>{formatDate(d.updated, locale)}</time>
        </p>
      </PageHead>
      <div className="section tight">
        <div className="wrap prose">
          {d[locale].map((s, i) => (
            <section key={i}>
              <h2>{s.h}</h2>
              {s.p.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
export const legalTitle = (kind: 'privacy' | 'terms') => legal[kind].title;

/* ---------------- 404 ---------------- */

export function NotFound({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  return (
    <PageHead locale={locale} title={locale === 'fr' ? 'Cette page est introuvable.' : 'This page could not be found.'} lead={locale === 'fr' ? 'L’adresse a peut-être changé. Repartez de l’accueil ou consultez nos expertises.' : 'The address may have changed. Start again from the home page or browse our capabilities.'}>
      <div className="head-actions">
        <a className="btn btn-navy" href={href(locale)}>
          {tr(ui.common.home, locale)}
        </a>
        <a className="btn btn-outline" href={href(locale, 'services')}>
          {tr(ui.nav.services, locale)}
        </a>
      </div>
    </PageHead>
  );
}

export { industries };
