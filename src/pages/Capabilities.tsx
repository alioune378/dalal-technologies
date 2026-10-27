import { home, approach } from '../content/company';
import { services, serviceBySlug } from '../content/services';
import { industries, industryBySlug } from '../content/industries';
import { categoryLabel, projectBySlug } from '../content/projects';
import { ui } from '../i18n/ui';
import { href, Island, tr, type PageCtx } from '../lib/core';
import { IndustryIcon, ServiceIcon } from '../components/Icons';
import { CtaBand, PageHead, ProjectCard, ServiceCard } from '../components/ui';
import Dashboard from '../islands/Dashboard';
import Workflow from '../islands/Workflow';

const L = (en: string, fr: string) => ({ en, fr });
const S = {
  servicesTitle: L('Capabilities that connect strategy, data and engineering.', 'Des expertises qui relient stratégie, données et ingénierie.'),
  servicesLead: L(
    'Business intelligence, technology consulting and enterprise platforms lead our work. AI and automation, digital government and web engineering complement them.',
    'L’intelligence d’affaires, le conseil technologique et les plateformes d’entreprise structurent notre travail. L’IA et l’automatisation, l’administration numérique et l’ingénierie web les complètent.',
  ),
  challenges: L('Challenges we address', 'Les enjeux que nous traitons'),
  offer: L('What we offer', 'Ce que nous proposons'),
  deliver: L('What you receive', 'Ce que vous obtenez'),
  background: L('Experience behind this capability', 'L’expérience derrière cette expertise'),
  method: L('How an engagement runs', 'Déroulement d’une mission'),
  aiLegend: L(
    'Each offering is labeled by maturity. We do not claim production deployments we have not delivered.',
    'Chaque offre est qualifiée selon sa maturité. Nous ne revendiquons aucun déploiement en production que nous n’avons pas réalisé.',
  ),
  industriesTitle: L('Sectors of focus.', 'Secteurs d’intervention.'),
  industriesLead: L(
    'Each sector page separates prior professional experience, our published work, our demonstrations and the applications we propose. None of these sectors is presented as an established client portfolio.',
    'Chaque page sectorielle distingue l’expérience professionnelle antérieure, nos réalisations en ligne, nos démonstrations et les applications que nous proposons. Aucun de ces secteurs n’est présenté comme un portefeuille de clients établi.',
  ),
  focus: L('A sector of focus, not a client list', 'Un secteur d’intervention, pas une liste de clients'),
  exp: L('Relevant professional experience', 'Expérience professionnelle pertinente'),
  expNote: L('Gained in prior roles within the industry, not delivered by Dalal Technologies.', 'Acquise dans des fonctions antérieures au sein du secteur, et non réalisée par Dalal Technologies.'),
  expNone: L('No direct prior employment in this sector. Our perspective comes from the work listed below.', 'Pas d’expérience salariée directe dans ce secteur. Notre point de vue s’appuie sur les travaux ci-dessous.'),
  ourWork: L('Our work in this sector', 'Nos travaux dans ce secteur'),
  noWork: L('No published project or demonstration in this sector yet.', 'Aucun projet en ligne ni démonstration dans ce secteur pour l’instant.'),
  proposed: L('Proposed applications', 'Applications proposées'),
  proposedNote: L('Ideas we can help with. Not completed engagements.', 'Des pistes sur lesquelles nous pouvons intervenir. Pas des missions réalisées.'),
  relevant: L('Relevant capabilities', 'Expertises mobilisées'),
  challengesSector: L('Common challenges', 'Enjeux fréquents'),
};

export function ServicesIndex({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  return (
    <>
      <PageHead locale={locale} title={tr(S.servicesTitle, locale)} lead={tr(S.servicesLead, locale)} crumbs={[{ label: tr(ui.nav.services, locale) }]} />
      <section className="section tight">
        <div className="wrap">
          <h2 className="tier-label">{tr(home.core, locale)}</h2>
          <div className="service-grid core">
            {services.filter((s) => s.tier === 'core').map((s) => (
              <ServiceCard key={s.slug} service={s} locale={locale} />
            ))}
          </div>
          <h2 className="tier-label">{tr(home.complementary, locale)}</h2>
          <div className="service-grid comp">
            {services.filter((s) => s.tier === 'complementary').map((s) => (
              <ServiceCard key={s.slug} service={s} locale={locale} compact />
            ))}
          </div>
        </div>
      </section>
      <section className="section approach">
        <div className="wrap">
          <div className="section-head">
            <h2>{tr(home.approachTitle, locale)}</h2>
            <p>{tr(home.approachLead, locale)}</p>
          </div>
          <ol className="steps">
            {approach.map((s, i) => (
              <li key={i}>
                <span className="step-n">{i + 1}</span>
                <h3>{tr(s.title, locale)}</h3>
                <p>{tr(s.body, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand locale={locale} title={tr(home.ctaTitle, locale)} body={tr(home.ctaBody, locale)} />
    </>
  );
}

export function ServiceDetail({ ctx, slug }: { ctx: PageCtx; slug: string }) {
  const { locale } = ctx;
  const s = serviceBySlug(slug);
  const related = s.related.map((r) => projectBySlug(r)).filter((p) => p && p.visible);
  const others = services.filter((o) => o.slug !== s.slug);
  const isAi = s.offerings.some((o) => o.ai);
  return (
    <>
      <PageHead locale={locale} title={tr(s.headline, locale)} crumbs={[{ label: tr(ui.nav.services, locale), path: 'services' }, { label: tr(s.title, locale) }]}>
        <div className="service-head-meta">
          <ServiceIcon name={s.icon} size={40} className="service-icon" />
          <p className="service-name">{tr(s.title, locale)}</p>
        </div>
        <p className="lead">{tr(s.intro, locale)}</p>
      </PageHead>

      <section className="section tight">
        <div className="wrap split">
          <div>
            <h2 className="h-sm">{tr(S.challenges, locale)}</h2>
            <ul className="check-list">
              {s.challenges.map((c, i) => (
                <li key={i}>{tr(c, locale)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-sm">{tr(S.offer, locale)}</h2>
            {isAi && <p className="note">{tr(S.aiLegend, locale)}</p>}
            <ul className={`offer-list${isAi ? ' with-status' : ''}`}>
              {s.offerings.map((o, i) => (
                <li key={i}>
                  <span>{tr(o.label, locale)}</span>
                  {o.ai && <span className={`ai-tag ai-${o.ai}`}>{tr(ui.aiStatus[o.ai], locale)}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {s.showcase && (
        <section className={`section ${s.showcase === 'dashboard' ? 'navy' : 'navy-deep'} showcase`}>
          <div className="wrap">
            <div className="section-head on-dark">
              <h2>{tr(s.showcase === 'dashboard' ? home.biTitle : home.aiTitle, locale)}</h2>
              <p>{tr(s.showcase === 'dashboard' ? home.biLead : home.aiLead, locale)}</p>
            </div>
            {s.showcase === 'dashboard' ? (
              <Island name="Dashboard" props={{ locale }}>
                <Dashboard locale={locale} />
              </Island>
            ) : (
              <Island name="Workflow" props={{ locale }}>
                <Workflow locale={locale} />
              </Island>
            )}
          </div>
        </section>
      )}

      <section className="section tight">
        <div className="wrap split">
          <div>
            <h2 className="h-sm">{tr(S.deliver, locale)}</h2>
            <ul className="check-list">
              {s.deliverables.map((c, i) => (
                <li key={i}>{tr(c, locale)}</li>
              ))}
            </ul>
          </div>
          <aside className="background-note">
            <h2 className="h-sm">{tr(S.background, locale)}</h2>
            <p>{tr(s.background, locale)}</p>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section tight">
          <div className="wrap">
            <h2 className="h-md">{tr(ui.common.related, locale)}</h2>
            <div className="project-grid">
              {related.map((p) => (
                <ProjectCard key={p!.slug} project={p!} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section tight others">
        <div className="wrap">
          <h2 className="h-md">{tr(ui.common.allServices, locale)}</h2>
          <ul className="link-grid">
            {others.map((o) => (
              <li key={o.slug}>
                <a href={href(locale, `services/${o.slug}`)}>
                  <ServiceIcon name={o.icon} size={24} />
                  {tr(o.title, locale)}
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

export function IndustriesIndex({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  return (
    <>
      <PageHead locale={locale} title={tr(S.industriesTitle, locale)} lead={tr(S.industriesLead, locale)} crumbs={[{ label: tr(ui.nav.industries, locale) }]} />
      <section className="section tight">
        <div className="wrap">
          <ul className="industry-cards">
            {industries.map((i) => {
              const n = i.projects.map((p) => projectBySlug(p)).filter((p) => p && p.visible).length;
              return (
                <li key={i.slug}>
                  <a href={href(locale, `industries/${i.slug}`)}>
                    <IndustryIcon name={i.slug} size={32} className="ind-icon" />
                    <h2>{tr(i.title, locale)}</h2>
                    <p>{tr(i.short, locale)}</p>
                    <dl className="ind-evidence">
                      <div>
                        <dt>{tr(S.exp, locale)}</dt>
                        <dd>{i.experience.length ? '✓' : '–'}</dd>
                      </div>
                      <div>
                        <dt>{tr(S.ourWork, locale)}</dt>
                        <dd>{n}</dd>
                      </div>
                    </dl>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CtaBand locale={locale} title={tr(home.ctaTitle, locale)} body={tr(home.ctaBody, locale)} />
    </>
  );
}

export function IndustryDetail({ ctx, slug }: { ctx: PageCtx; slug: string }) {
  const { locale } = ctx;
  const ind = industryBySlug(slug);
  const work = ind.projects.map((p) => projectBySlug(p)).filter((p) => p && p.visible).map((p) => p!);
  return (
    <>
      <PageHead locale={locale} title={tr(ind.title, locale)} crumbs={[{ label: tr(ui.nav.industries, locale), path: 'industries' }, { label: tr(ind.title, locale) }]}>
        <p className="focus-flag">{tr(S.focus, locale)}</p>
        <p className="lead">{tr(ind.intro, locale)}</p>
      </PageHead>

      <section className="section tight">
        <div className="wrap split">
          <div>
            <h2 className="h-sm">{tr(S.challengesSector, locale)}</h2>
            <ul className="check-list">
              {ind.challenges.map((c, i) => (
                <li key={i}>{tr(c, locale)}</li>
              ))}
            </ul>
          </div>
          <div className="evidence-block">
            <h2 className="h-sm">{tr(S.exp, locale)}</h2>
            {ind.experience.length ? (
              <>
                <ul className="plain-list">
                  {ind.experience.map((c, i) => (
                    <li key={i}>{tr(c, locale)}</li>
                  ))}
                </ul>
                <p className="note">{tr(S.expNote, locale)}</p>
              </>
            ) : (
              <p className="note">{tr(S.expNone, locale)}</p>
            )}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <h2 className="h-md">{tr(S.ourWork, locale)}</h2>
          {work.length ? (
            <>
              <p className="note">{[...new Set(work.map((w) => tr(categoryLabel[w.category], locale)))].join(' / ')}</p>
              <div className="project-grid">
                {work.map((p) => (
                  <ProjectCard key={p.slug} project={p} locale={locale} />
                ))}
              </div>
            </>
          ) : (
            <p className="note">{tr(S.noWork, locale)}</p>
          )}
        </div>
      </section>

      <section className="section tight">
        <div className="wrap split">
          <div>
            <h2 className="h-sm">{tr(S.proposed, locale)}</h2>
            <p className="note">{tr(S.proposedNote, locale)}</p>
            <ul className="check-list">
              {ind.proposed.map((c, i) => (
                <li key={i}>{tr(c, locale)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h-sm">{tr(S.relevant, locale)}</h2>
            <ul className="link-grid single">
              {ind.services.map((sl) => {
                const sv = serviceBySlug(sl);
                return (
                  <li key={sl}>
                    <a href={href(locale, `services/${sl}`)}>
                      <ServiceIcon name={sv.icon} size={24} />
                      {tr(sv.title, locale)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <CtaBand locale={locale} title={tr(home.ctaTitle, locale)} body={tr(home.ctaBody, locale)} />
    </>
  );
}
