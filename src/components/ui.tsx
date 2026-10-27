import type { ReactNode } from 'react';
import type { Locale } from '../config/site';
import { ui, type L } from '../i18n/ui';
import { href, tr } from '../lib/core';
import { categoryLabel, ownershipLabel, type Project } from '../content/projects';
import type { Service } from '../content/services';
import { IconExternal, ServiceIcon } from './Icons';

export function Breadcrumbs({ locale, items }: { locale: Locale; items: { label: string; path?: string }[] }) {
  return (
    <nav className="crumbs" aria-label={tr(ui.common.breadcrumb, locale)}>
      <ol>
        <li>
          <a href={href(locale)}>{tr(ui.common.home, locale)}</a>
        </li>
        {items.map((it, i) => (
          <li key={i}>{it.path !== undefined ? <a href={href(locale, it.path)}>{it.label}</a> : <span aria-current="page">{it.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHead({ title, lead, crumbs, locale, children, tone = 'light' }: { title: string; lead?: string; crumbs?: { label: string; path?: string }[]; locale: Locale; children?: ReactNode; tone?: 'light' | 'navy' }) {
  return (
    <section className={`page-head tone-${tone}`}>
      <div className="wrap">
        {crumbs && <Breadcrumbs locale={locale} items={crumbs} />}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function StatusBadge({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <span className={`badge badge-${project.category}`}>
      <span className="badge-dot" aria-hidden="true" />
      {tr(project.status, locale)}
    </span>
  );
}

export function ProjectPreview({ project, size = 'md' }: { project: Project; size?: 'md' | 'lg' }) {
  if (project.preview) {
    return (
      <div className={`preview preview-${size}`}>
        <img src={project.preview} alt="" loading="lazy" width={1280} height={800} />
      </div>
    );
  }
  // Typographic preview for projects without an approved screenshot
  const initials = project.name
    .replace(/[^A-Za-zÀ-ÿ0-9& ]/g, '')
    .split(' ')
    .filter((w) => w.length > 2 || w === '&' || /\d/.test(w))
    .slice(0, 3)
    .map((w) => w[0])
    .join('');
  return (
    <div className={`preview preview-type preview-${size} preview-${project.category}`} aria-hidden="true">
      <span className="preview-mono">{initials}</span>
      <span className="preview-name">{project.name}</span>
    </div>
  );
}

export function ProjectCard({ project, locale, variant = 'standard' }: { project: Project; locale: Locale; variant?: 'standard' | 'feature' }) {
  return (
    <article className={`project-card project-${variant}`}>
      <a href={href(locale, `work/${project.slug}`)} className="project-link">
        <ProjectPreview project={project} size={variant === 'feature' ? 'lg' : 'md'} />
        <div className="project-body">
          <div className="project-meta">
            <StatusBadge project={project} locale={locale} />
            <span className="project-sector">{tr(project.sector, locale)}</span>
          </div>
          <h3>{project.name}</h3>
          <p>{tr(project.summary, locale)}</p>
          <p className="project-owner">{tr(ownershipLabel[project.ownership], locale)}</p>
        </div>
      </a>
    </article>
  );
}

export function ServiceCard({ service, locale, compact }: { service: Service; locale: Locale; compact?: boolean }) {
  return (
    <a className={`service-card${compact ? ' compact' : ''}`} href={href(locale, `services/${service.slug}`)}>
      <ServiceIcon name={service.icon} size={compact ? 28 : 36} className="service-icon" />
      <h3>{tr(service.title, locale)}</h3>
      <p>{tr(service.short, locale)}</p>
      <span className="card-more">{tr(ui.common.learnMore, locale)}</span>
    </a>
  );
}

export function ExternalLink({ url, label, locale, className = 'btn btn-outline' }: { url: string; label: L; locale: Locale; className?: string }) {
  return (
    <a className={className} href={url} target="_blank" rel="noopener noreferrer">
      {tr(label, locale)}
      <IconExternal />
      <span className="sr-only"> {tr(ui.common.newWindow, locale)}</span>
    </a>
  );
}

export function CtaBand({ locale, title, body }: { locale: Locale; title: string; body: string }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-grid">
        <h2>{title}</h2>
        <div>
          <p>{body}</p>
          <a className="btn btn-gold" href={href(locale, 'contact')}>
            {tr(ui.common.startConversation, locale)}
          </a>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ title, lead, id, light }: { title: string; lead?: string; id?: string; light?: boolean }) {
  return (
    <div className={`section-head${light ? ' on-dark' : ''}`}>
      <h2 id={id}>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

export { categoryLabel };
