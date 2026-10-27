import { useEffect, useState } from 'react';
import type { Locale } from '../config/site';
import { categoryLabel, visibleProjects, type ProjectCategory } from '../content/projects';
import { industries } from '../content/industries';
import { ProjectCard } from '../components/ui';

type Filter = 'all' | ProjectCategory;
const ORDER: ProjectCategory[] = ['published', 'demonstration', 'development'];

const T = {
  status: { en: 'Status', fr: 'Statut' },
  sector: { en: 'Sector', fr: 'Secteur' },
  all: { en: 'All', fr: 'Tous' },
  allSectors: { en: 'All sectors', fr: 'Tous les secteurs' },
  short: {
    published: { en: 'Published', fr: 'En ligne' },
    demonstration: { en: 'Demonstrations', fr: 'Démonstrations' },
    development: { en: 'In development', fr: 'En développement' },
  },
  count: { en: (n: number) => `${n} project${n === 1 ? '' : 's'}`, fr: (n: number) => `${n} projet${n === 1 ? '' : 's'}` },
  none: { en: 'No project matches these filters yet.', fr: 'Aucun projet ne correspond encore à ces filtres.' },
  clear: { en: 'Clear filters', fr: 'Effacer les filtres' },
};

export default function WorkFilter({ locale }: { locale: Locale }) {
  const tx = (o: { en: string; fr: string }) => o[locale];
  const [cat, setCat] = useState<Filter>('all');
  const [sector, setSector] = useState<string>('all');

  // Restore from / write to the URL so a filtered view can be shared
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get('status') as Filter | null;
    const s = p.get('sector');
    if (c && (c === 'all' || ORDER.includes(c as ProjectCategory))) setCat(c);
    if (s && industries.some((i) => i.slug === s)) setSector(s);
  }, []);
  useEffect(() => {
    const p = new URLSearchParams();
    if (cat !== 'all') p.set('status', cat);
    if (sector !== 'all') p.set('sector', sector);
    const q = p.toString();
    window.history.replaceState(null, '', q ? `?${q}` : window.location.pathname);
  }, [cat, sector]);

  const list = visibleProjects.filter((p) => (cat === 'all' || p.category === cat) && (sector === 'all' || p.industries.includes(sector)));
  const usedSectors = industries.filter((i) => visibleProjects.some((p) => p.industries.includes(i.slug)));

  return (
    <div className="work-filter">
      <div className="filter-bar">
        <div className="seg seg-light" role="radiogroup" aria-label={tx(T.status)}>
          {(['all', ...ORDER] as Filter[]).map((f) => (
            <button key={f} type="button" role="radio" aria-checked={cat === f} className={cat === f ? 'on' : ''} onClick={() => setCat(f)}>
              {f === 'all' ? tx(T.all) : tx(T.short[f])}
            </button>
          ))}
        </div>
        <label className="select-light">
          <span className="sr-only">{tx(T.sector)}</span>
          <select value={sector} onChange={(e) => setSector(e.target.value)}>
            <option value="all">{tx(T.allSectors)}</option>
            {usedSectors.map((i) => (
              <option key={i.slug} value={i.slug}>
                {tx(i.title)}
              </option>
            ))}
          </select>
        </label>
        <p className="filter-count" aria-live="polite">
          {T.count[locale](list.length)}
        </p>
      </div>

      {list.length === 0 && (
        <div className="empty">
          <p>{tx(T.none)}</p>
          <button type="button" className="btn btn-outline" onClick={() => { setCat('all'); setSector('all'); }}>
            {tx(T.clear)}
          </button>
        </div>
      )}

      {ORDER.map((c) => {
        const group = list.filter((p) => p.category === c);
        if (!group.length) return null;
        return (
          <section key={c} className="work-group" aria-labelledby={`grp-${c}`}>
            <h2 id={`grp-${c}`} className="group-title">
              {tx(categoryLabel[c])}
            </h2>
            <div className="project-grid">
              {group.map((p) => (
                <ProjectCard key={p.slug} project={p} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
