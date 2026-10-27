/* Client entry: progressive enhancement for every page. */

// --- Mobile navigation -------------------------------------------------
const btn = document.querySelector<HTMLButtonElement>('[data-menu-btn]');
const nav = document.querySelector<HTMLElement>('[data-nav]');
if (btn && nav) {
  const close = () => {
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('nav-open');
  };
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('nav-open', open);
    if (open) nav.querySelector('a')?.focus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      close();
      btn.focus();
    }
  });
  window.matchMedia('(min-width: 1080px)').addEventListener('change', (m) => m.matches && close());
}

// --- Remember language choice for the root redirect ---------------------
document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]').forEach((a) =>
  a.addEventListener('click', () => {
    try {
      localStorage.setItem('dt-lang', a.dataset.langSwitch || 'en');
    } catch {
      /* storage unavailable: ignore */
    }
  }),
);

// --- Header shadow once the page scrolls --------------------------------
const header = document.querySelector('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// --- Islands -------------------------------------------------------------
const loaders: Record<string, () => Promise<{ default: any }>> = {
  Dashboard: () => import('./islands/Dashboard'),
  Workflow: () => import('./islands/Workflow'),
  ContactForm: () => import('./islands/ContactForm'),
  WorkFilter: () => import('./islands/WorkFilter'),
};
const islands = document.querySelectorAll<HTMLElement>('[data-island]');
if (islands.length) {
  Promise.all([import('react'), import('react-dom/client')]).then(([ReactMod, DomMod]) => {
    const React: any = (ReactMod as any).default ?? ReactMod;
    const { hydrateRoot } = ((DomMod as any).default ?? DomMod) as typeof import('react-dom/client');
    islands.forEach(async (el) => {
      const load = loaders[el.dataset.island || ''];
      if (!load) return;
      const mod = await load();
      const props = JSON.parse(el.dataset.props || '{}');
      hydrateRoot(el, React.createElement(mod.default, props));
    });
  });
}
