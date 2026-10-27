import { site } from '../config/site';
import { ui } from '../i18n/ui';
import { services } from '../content/services';
import { href, tr, type PageCtx } from '../lib/core';
import { IconClose, IconMenu } from './Icons';

const navItems = [
  { key: 'services', path: 'services' },
  { key: 'industries', path: 'industries' },
  { key: 'work', path: 'work' },
  { key: 'about', path: 'about' },
  { key: 'insights', path: 'insights' },
] as const;

export function Header({ ctx }: { ctx: PageCtx }) {
  const { locale, path } = ctx;
  const other = locale === 'en' ? 'fr' : 'en';
  const section = path.split('/')[0];
  return (
    <header className="site-header" data-header>
      <a className="skip" href="#main">
        {tr(ui.skip, locale)}
      </a>
      <div className="wrap header-row">
        <a className="brand" href={href(locale)} aria-label={`${site.name}, ${tr(ui.common.home, locale)}`}>
          <img src="/brand/logo-reverse-compact.png" alt="Dalal Technologies" width={180} height={46} />
        </a>
        <nav className="nav" aria-label={tr(ui.nav.primary, locale)} id="site-nav" data-nav>
          <ul>
            {navItems.map((n) => (
              <li key={n.key}>
                <a href={href(locale, n.path)} aria-current={section === n.path ? 'page' : undefined}>
                  {tr(ui.nav[n.key], locale)}
                </a>
              </li>
            ))}
            <li className="nav-contact-mobile">
              <a href={href(locale, 'contact')} aria-current={section === 'contact' ? 'page' : undefined}>
                {tr(ui.nav.contact, locale)}
              </a>
            </li>
          </ul>
          <div className="nav-mobile-foot">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
          </div>
        </nav>
        <div className="header-tools">
          <a className="lang" href={href(other, path)} hrefLang={other} lang={other} aria-label={tr(ui.nav.switchTo, locale)} data-lang-switch={other}>
            <span aria-hidden="true" className={locale === 'en' ? 'on' : ''}>EN</span>
            <span aria-hidden="true" className={locale === 'fr' ? 'on' : ''}>FR</span>
          </a>
          <a className="btn btn-gold btn-sm header-cta" href={href(locale, 'contact')}>
            {tr(ui.nav.cta, locale)}
          </a>
          <button className="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-btn>
            <span className="menu-open">
              <IconMenu />
              <span className="sr-only">{tr(ui.nav.menu, locale)}</span>
            </span>
            <span className="menu-close">
              <IconClose />
              <span className="sr-only">{tr(ui.nav.close, locale)}</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer({ ctx }: { ctx: PageCtx }) {
  const { locale } = ctx;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/brand/logo-reverse.png" alt="Dalal Technologies, Technology Consulting & Digital Engineering" width={262} height={80} loading="lazy" />
            <p>{tr(ui.footer.tagline, locale)}</p>
          </div>
          <div className="footer-cols">
            <div>
              <h2>{tr(ui.footer.capabilities, locale)}</h2>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <a href={href(locale, `services/${s.slug}`)}>{tr(s.title, locale)}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{tr(ui.footer.company, locale)}</h2>
              <ul>
                <li><a href={href(locale, 'industries')}>{tr(ui.nav.industries, locale)}</a></li>
                <li><a href={href(locale, 'work')}>{tr(ui.nav.work, locale)}</a></li>
                <li><a href={href(locale, 'about')}>{tr(ui.nav.about, locale)}</a></li>
                <li><a href={href(locale, 'insights')}>{tr(ui.nav.insights, locale)}</a></li>
                <li><a href={href(locale, 'contact')}>{tr(ui.nav.contact, locale)}</a></li>
              </ul>
            </div>
            <div>
              <h2>{tr(ui.footer.reach, locale)}</h2>
              <ul>
                <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
                <li><a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></li>
                <li className="muted">{tr(site.location, locale)}</li>
                <li className="muted">{tr(site.markets, locale)}</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="footer-note">{tr(ui.footer.note, locale)}</p>
        <div className="footer-bottom">
          <p>© {site.year} {site.name}</p>
          <ul>
            <li><a href={href(locale, 'privacy')}>{tr(ui.footer.privacy, locale)}</a></li>
            <li><a href={href(locale, 'terms')}>{tr(ui.footer.terms, locale)}</a></li>
            <li>
              <a href={href(locale === 'en' ? 'fr' : 'en', ctx.path)} hrefLang={locale === 'en' ? 'fr' : 'en'} data-lang-switch={locale === 'en' ? 'fr' : 'en'}>
                {tr(ui.nav.switchTo, locale)}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
