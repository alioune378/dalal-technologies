import { useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from '../config/site';

/* ------------------------------------------------------------------ */
/* Synthetic data: deterministic, generated in the browser.            */
/* Nothing here comes from any real company.                           */
/* ------------------------------------------------------------------ */

type Unit = 'retail' | 'services' | 'logistics' | 'digital';
const UNITS: Unit[] = ['retail', 'services', 'logistics', 'digital'];
type Row = { m: number; unit: Unit; revenue: number; target: number; orders: number; onTime: number; cost: number; margin: number; retention: number };

const T = {
  label: { en: 'Illustrative dashboard: synthetic data', fr: 'Tableau de bord illustratif : données synthétiques' },
  title: { en: 'Executive performance overview', fr: 'Vue de direction de la performance' },
  period: { en: 'Period: last', fr: 'Période : derniers' },
  p3: { en: '3 months', fr: '3 mois' },
  p6: { en: '6 months', fr: '6 mois' },
  p12: { en: '12 months', fr: '12 mois' },
  unit: { en: 'Business unit', fr: 'Unité' },
  all: { en: 'All units', fr: 'Toutes les unités' },
  units: {
    retail: { en: 'Retail', fr: 'Commerce' },
    services: { en: 'Services', fr: 'Services' },
    logistics: { en: 'Logistics', fr: 'Logistique' },
    digital: { en: 'Digital', fr: 'Numérique' },
  } as Record<Unit, { en: string; fr: string }>,
  revenue: { en: 'Revenue', fr: 'Chiffre d’affaires' },
  margin: { en: 'Operating margin', fr: 'Marge opérationnelle' },
  onTime: { en: 'On-time fulfilment', fr: 'Livraison dans les délais' },
  retention: { en: 'Customer retention', fr: 'Fidélisation client' },
  vsPrev: { en: 'vs previous period', fr: 'vs période précédente' },
  pts: { en: 'pts', fr: 'pts' },
  trend: { en: 'Monthly revenue against target', fr: 'Chiffre d’affaires mensuel par rapport à l’objectif' },
  actual: { en: 'Actual', fr: 'Réalisé' },
  target: { en: 'Target', fr: 'Objectif' },
  byUnit: { en: 'Revenue by business unit', fr: 'Chiffre d’affaires par unité' },
  efficiency: { en: 'Operational efficiency', fr: 'Efficacité opérationnelle' },
  costPerOrder: { en: 'Cost per order', fr: 'Coût par commande' },
  orders: { en: 'Orders processed', fr: 'Commandes traitées' },
  targetAtt: { en: 'Target attainment', fr: 'Atteinte de l’objectif' },
  insights: { en: 'What the data says', fr: 'Ce que disent les données' },
  showTable: { en: 'Show data table', fr: 'Afficher le tableau de données' },
  hideTable: { en: 'Hide data table', fr: 'Masquer le tableau de données' },
  month: { en: 'Month', fr: 'Mois' },
  better: { en: 'improved', fr: 'en amélioration' },
  worse: { en: 'declined', fr: 'en recul' },
  chartHelp: { en: 'Use the left and right arrow keys to move between months.', fr: 'Utilisez les flèches gauche et droite pour passer d’un mois à l’autre.' },
};

function seeded(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

const N_MONTHS = 24;
// Last data month: September 2026 (index 23). Month 0 = October 2024.
const monthDate = (m: number) => new Date(Date.UTC(2024, 9 + m, 1));

function generate(): Row[] {
  const rnd = seeded(20261027);
  const base: Record<Unit, number> = { retail: 410, services: 265, logistics: 330, digital: 120 };
  const growth: Record<Unit, number> = { retail: 0.004, services: 0.009, logistics: -0.002, digital: 0.028 };
  const rows: Row[] = [];
  for (let m = 0; m < N_MONTHS; m++) {
    const season = 1 + 0.07 * Math.sin(((m + 2) / 12) * Math.PI * 2);
    for (const u of UNITS) {
      const trend = Math.pow(1 + growth[u], m);
      const revenue = base[u] * season * trend * (0.95 + rnd() * 0.1);
      const target = base[u] * season * Math.pow(1 + growth[u] * 0.8 + 0.002, m);
      const orders = Math.round(revenue * (u === 'digital' ? 9.5 : u === 'logistics' ? 6.2 : 3.4) * (0.96 + rnd() * 0.08));
      const onTime = Math.min(99.2, (u === 'logistics' ? 90.5 : 93.5) + m * (u === 'logistics' ? 0.13 : 0.06) + (rnd() - 0.5) * 2.2);
      const cost = (u === 'digital' ? 7.4 : u === 'logistics' ? 18.5 : 24) * (1 - m * 0.0035) * (0.97 + rnd() * 0.06);
      const margin = (u === 'services' ? 21 : u === 'digital' ? 16 + m * 0.18 : u === 'retail' ? 12.5 : 9.5) + (rnd() - 0.5) * 1.6;
      const retention = (u === 'services' ? 86 : u === 'digital' ? 74 : 81) + m * 0.05 + (rnd() - 0.5) * 1.8;
      rows.push({ m, unit: u, revenue, target, orders, onTime, cost, margin, retention });
    }
  }
  return rows;
}

type Agg = { revenue: number; target: number; orders: number; onTime: number; cost: number; margin: number; retention: number };
function aggregate(rows: Row[]): Agg {
  const rev = rows.reduce((a, r) => a + r.revenue, 0);
  const ord = rows.reduce((a, r) => a + r.orders, 0);
  const w = (k: 'onTime' | 'retention') => rows.reduce((a, r) => a + r[k] * r.orders, 0) / ord;
  return {
    revenue: rev,
    target: rows.reduce((a, r) => a + r.target, 0),
    orders: ord,
    onTime: w('onTime'),
    retention: w('retention'),
    cost: rows.reduce((a, r) => a + r.cost * r.orders, 0) / ord,
    margin: rows.reduce((a, r) => a + r.margin * r.revenue, 0) / rev,
  };
}

/* ------------------------------------------------------------------ */

export default function Dashboard({ locale }: { locale: Locale }) {
  const tx = (o: { en: string; fr: string }) => o[locale];
  const data = useMemo(generate, []);
  const [months, setMonths] = useState<3 | 6 | 12>(12);
  const [unit, setUnit] = useState<Unit | 'all'>('all');
  const [table, setTable] = useState(false);

  const nf = (d = 0) => new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', { maximumFractionDigits: d, minimumFractionDigits: d });
  const money = (k: number) => (k >= 1000 ? `$${nf(2).format(k / 1000)}M` : `$${nf(0).format(k)}K`);
  const monthFmt = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', year: '2-digit', timeZone: 'UTC' });

  const last = N_MONTHS - 1;
  const inRange = (r: Row, from: number, to: number) => r.m >= from && r.m <= to;
  const curFrom = last - months + 1;
  const prevFrom = curFrom - months;
  const unitRows = unit === 'all' ? data : data.filter((r) => r.unit === unit);
  const cur = aggregate(unitRows.filter((r) => inRange(r, curFrom, last)));
  const prev = aggregate(unitRows.filter((r) => inRange(r, prevFrom, curFrom - 1)));

  const series = Array.from({ length: months }, (_, i) => {
    const m = curFrom + i;
    const rs = unitRows.filter((r) => r.m === m);
    return { m, label: monthFmt.format(monthDate(m)), actual: rs.reduce((a, r) => a + r.revenue, 0), target: rs.reduce((a, r) => a + r.target, 0) };
  });

  const byUnit = UNITS.map((u) => ({ unit: u, value: data.filter((r) => r.unit === u && inRange(r, curFrom, last)).reduce((a, r) => a + r.revenue, 0), prev: data.filter((r) => r.unit === u && inRange(r, prevFrom, curFrom - 1)).reduce((a, r) => a + r.revenue, 0) })).sort((a, b) => b.value - a.value);

  const pct = (a: number, b: number) => ((a - b) / b) * 100;
  const kpis = [
    { key: 'revenue', label: tx(T.revenue), value: money(cur.revenue), delta: pct(cur.revenue, prev.revenue), unit: '%', good: true },
    { key: 'margin', label: tx(T.margin), value: `${nf(1).format(cur.margin)}%`, delta: cur.margin - prev.margin, unit: tx(T.pts), good: true },
    { key: 'onTime', label: tx(T.onTime), value: `${nf(1).format(cur.onTime)}%`, delta: cur.onTime - prev.onTime, unit: tx(T.pts), good: true },
    { key: 'retention', label: tx(T.retention), value: `${nf(1).format(cur.retention)}%`, delta: cur.retention - prev.retention, unit: tx(T.pts), good: true },
  ];

  // Written insights derived from the same slice
  const fastest = [...byUnit].sort((a, b) => pct(b.value, b.prev) - pct(a.value, a.prev))[0];
  const slowest = [...byUnit].sort((a, b) => pct(a.value, a.prev) - pct(b.value, b.prev))[0];
  const attain = (cur.revenue / cur.target) * 100;
  const missMonths = series.filter((s) => s.actual < s.target).length;
  const signed = (v: number, d = 1) => `${v >= 0 ? '+' : '−'}${nf(d).format(Math.abs(v))}`;
  const insightList =
    locale === 'fr'
      ? [
          `${unit === 'all' ? 'Toutes unités confondues, le' : `Pour l’unité ${tx(T.units[unit as Unit]).toLowerCase()}, le`} chiffre d’affaires atteint ${nf(1).format(attain)} % de l’objectif ; ${missMonths} mois sur ${months} sont sous l’objectif.`,
          `${tx(T.units[fastest.unit])} progresse le plus vite (${signed(pct(fastest.value, fastest.prev))} %), ${tx(T.units[slowest.unit]).toLowerCase()} le moins (${signed(pct(slowest.value, slowest.prev))} %).`,
          `Le coût par commande est passé de ${nf(2).format(prev.cost)} $ à ${nf(2).format(cur.cost)} $ ; la livraison dans les délais est ${cur.onTime >= prev.onTime ? 'en amélioration' : 'en recul'} (${signed(cur.onTime - prev.onTime)} pts).`,
        ]
      : [
          `${unit === 'all' ? 'Across all units, revenue' : `In ${tx(T.units[unit as Unit])}, revenue`} reached ${nf(1).format(attain)}% of target; ${missMonths} of ${months} months finished below target.`,
          `${tx(T.units[fastest.unit])} grew fastest (${signed(pct(fastest.value, fastest.prev))}%) and ${tx(T.units[slowest.unit])} slowest (${signed(pct(slowest.value, slowest.prev))}%).`,
          `Cost per order moved from $${nf(2).format(prev.cost)} to $${nf(2).format(cur.cost)}, while on-time fulfilment ${cur.onTime >= prev.onTime ? 'improved' : 'declined'} (${signed(cur.onTime - prev.onTime)} pts).`,
        ];

  return (
    <div className="dash" lang={locale}>
      <div className="dash-top">
        <div>
          <p className="dash-flag">{tx(T.label)}</p>
          <h3 className="dash-title">{tx(T.title)}</h3>
        </div>
        <div className="dash-filters" role="group" aria-label={`${tx(T.period)}, ${tx(T.unit)}`}>
          <div className="seg" role="radiogroup" aria-label={tx(T.period)}>
            {([3, 6, 12] as const).map((n) => (
              <button key={n} type="button" role="radio" aria-checked={months === n} className={months === n ? 'on' : ''} onClick={() => setMonths(n)}>
                {tx(n === 3 ? T.p3 : n === 6 ? T.p6 : T.p12)}
              </button>
            ))}
          </div>
          <label className="dash-select">
            <span className="sr-only">{tx(T.unit)}</span>
            <select value={unit} onChange={(e) => setUnit(e.target.value as Unit | 'all')}>
              <option value="all">{tx(T.all)}</option>
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {tx(T.units[u])}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="kpis">
        {kpis.map((k) => {
          const up = k.delta >= 0;
          return (
            <div className="kpi" key={k.key}>
              <p className="kpi-label">{k.label}</p>
              <p className="kpi-value">{k.value}</p>
              <p className={`kpi-delta ${up ? 'up' : 'down'}`}>
                <span aria-hidden="true">{up ? '▲' : '▼'}</span> {signed(k.delta)}
                {k.unit === '%' ? '%' : ` ${k.unit}`} <span className="kpi-vs">{tx(T.vsPrev)}</span>
              </p>
            </div>
          );
        })}
      </div>

      <div className="dash-grid">
        <section className="dash-card dash-trend" aria-label={tx(T.trend)}>
          <div className="card-head">
            <h4>{tx(T.trend)}</h4>
            <ul className="legend">
              <li>
                <span className="key-line actual" aria-hidden="true" /> {tx(T.actual)}
              </li>
              <li>
                <span className="key-line target" aria-hidden="true" /> {tx(T.target)}
              </li>
            </ul>
          </div>
          <LineChart series={series} money={money} labels={{ actual: tx(T.actual), target: tx(T.target), help: tx(T.chartHelp) }} />
        </section>

        <section className="dash-card" aria-label={tx(T.byUnit)}>
          <div className="card-head">
            <h4>{tx(T.byUnit)}</h4>
          </div>
          <Bars rows={byUnit.map((b) => ({ key: b.unit, label: tx(T.units[b.unit]), value: b.value, change: pct(b.value, b.prev) }))} highlight={unit} money={money} signed={signed} />
        </section>

        <section className="dash-card" aria-label={tx(T.efficiency)}>
          <div className="card-head">
            <h4>{tx(T.efficiency)}</h4>
          </div>
          <dl className="eff">
            <div>
              <dt>{tx(T.costPerOrder)}</dt>
              <dd>
                ${nf(2).format(cur.cost)}
                <span className={cur.cost <= prev.cost ? 'up' : 'down'}>
                  <span aria-hidden="true">{cur.cost <= prev.cost ? '▼' : '▲'}</span> {signed(pct(cur.cost, prev.cost))}%
                </span>
              </dd>
            </div>
            <div>
              <dt>{tx(T.orders)}</dt>
              <dd>
                {nf(0).format(cur.orders)}
                <span className={cur.orders >= prev.orders ? 'up' : 'down'}>
                  <span aria-hidden="true">{cur.orders >= prev.orders ? '▲' : '▼'}</span> {signed(pct(cur.orders, prev.orders))}%
                </span>
              </dd>
            </div>
            <div>
              <dt>{tx(T.targetAtt)}</dt>
              <dd>
                {nf(1).format(attain)}%
                <span className="meter" aria-hidden="true">
                  <span style={{ width: `${Math.min(100, attain)}%` }} />
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <section className="dash-card dash-insights" aria-label={tx(T.insights)}>
          <div className="card-head">
            <h4>{tx(T.insights)}</h4>
          </div>
          <ul aria-live="polite">
            {insightList.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      </div>

      <button type="button" className="link-btn" aria-expanded={table} onClick={() => setTable(!table)}>
        {table ? tx(T.hideTable) : tx(T.showTable)}
      </button>
      {table && (
        <div className="table-wrap">
          <table>
            <caption className="sr-only">{tx(T.trend)}</caption>
            <thead>
              <tr>
                <th scope="col">{tx(T.month)}</th>
                <th scope="col">{tx(T.actual)}</th>
                <th scope="col">{tx(T.target)}</th>
              </tr>
            </thead>
            <tbody>
              {series.map((s) => (
                <tr key={s.m}>
                  <th scope="row">{s.label}</th>
                  <td>{money(s.actual)}</td>
                  <td>{money(s.target)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function useWidth(initial: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(initial);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(260, Math.round(e.contentRect.width))));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

function niceMax(v: number) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1.2 ? 1.2 : n <= 1.5 ? 1.5 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 3 ? 3 : n <= 4 ? 4 : n <= 5 ? 5 : n <= 6 ? 6 : n <= 8 ? 8 : 10) * p;
}

function LineChart({ series, money, labels }: { series: { m: number; label: string; actual: number; target: number }[]; money: (n: number) => string; labels: { actual: string; target: string; help: string } }) {
  const [ref, W] = useWidth(560);
  const H = W > 520 ? 330 : 240;
  const pad = { l: 56, r: 16, t: 14, b: 30 };
  const [hover, setHover] = useState<number | null>(null);
  const vals = series.flatMap((s) => [s.actual, s.target]);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const lo = Math.max(0, min - (max - min) * 0.6);
  const hi = lo + niceMax(max - lo) * 1.02;
  const x = (i: number) => pad.l + (series.length === 1 ? 0 : (i / (series.length - 1)) * (W - pad.l - pad.r));
  const y = (v: number) => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b);
  const path = (k: 'actual' | 'target') => series.map((s, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(s[k]).toFixed(1)}`).join(' ');
  const area = `${path('actual')} L${x(series.length - 1).toFixed(1)} ${H - pad.b} L${x(0).toFixed(1)} ${H - pad.b} Z`;
  const ticks = Array.from({ length: 4 }, (_, i) => lo + ((hi - lo) * (i + 0.5)) / 4);
  const step = Math.ceil(series.length / Math.max(3, Math.floor((W - 80) / 70)));

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * (W - pad.l - pad.r);
    setHover(Math.max(0, Math.min(series.length - 1, Math.round((px / (W - pad.l - pad.r)) * (series.length - 1)))));
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setHover((h) => {
        const cur = h ?? (e.key === 'ArrowRight' ? -1 : series.length);
        return Math.max(0, Math.min(series.length - 1, cur + (e.key === 'ArrowRight' ? 1 : -1)));
      });
    }
    if (e.key === 'Escape') setHover(null);
  };
  const hv = hover !== null && hover < series.length ? series[hover] : null;

  return (
    <div className="chart" ref={ref}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} tabIndex={0} role="img" aria-label={labels.help} onKeyDown={onKey} onBlur={() => setHover(null)}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="grid" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" className="tick">
              {money(t)}
            </text>
          </g>
        ))}
        {series.map((s, i) =>
          (i % step === 0 && (series.length - 1 - i >= step || i === series.length - 1)) || i === series.length - 1 ? (
            <text key={s.m} x={x(i)} y={H - 8} textAnchor={i === 0 ? 'start' : i === series.length - 1 ? 'end' : 'middle'} className="tick">
              {s.label}
            </text>
          ) : null,
        )}
        <path d={area} className="area" />
        <path d={path('target')} className="line-target" />
        <path d={path('actual')} className="line-actual" />
        {hv && (
          <g>
            <line x1={x(hover!)} x2={x(hover!)} y1={pad.t} y2={H - pad.b} className="crosshair" />
            <circle cx={x(hover!)} cy={y(hv.target)} r={4} className="dot-target" />
            <circle cx={x(hover!)} cy={y(hv.actual)} r={5} className="dot-actual" />
          </g>
        )}
        <rect x={pad.l} y={pad.t} width={W - pad.l - pad.r} height={H - pad.t - pad.b} fill="transparent" onPointerMove={onMove} onPointerLeave={() => setHover(null)} />
      </svg>
      {hv && (
        <div className="tip" style={{ left: Math.min(W - 150, Math.max(0, x(hover!) - 70)), top: 4 }} role="status">
          <p className="tip-h">{hv.label}</p>
          <p>
            <span className="key-line actual" aria-hidden="true" />
            <strong>{money(hv.actual)}</strong> {labels.actual}
          </p>
          <p>
            <span className="key-line target" aria-hidden="true" />
            <strong>{money(hv.target)}</strong> {labels.target}
          </p>
        </div>
      )}
    </div>
  );
}

function Bars({ rows, highlight, money, signed }: { rows: { key: string; label: string; value: number; change: number }[]; highlight: string; money: (n: number) => string; signed: (v: number, d?: number) => string }) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ul className="hbars">
      {rows.map((r) => {
        const on = highlight === r.key;
        const dim = highlight !== 'all' && !on;
        return (
          <li key={r.key} className={`${on ? 'on' : ''} ${dim ? 'dim' : ''}`}>
            <span className="hb-label">{r.label}</span>
            <span className="hb-track" aria-hidden="true">
              <span className="hb-bar" style={{ width: `${(r.value / max) * 100}%` }} />
            </span>
            <span className="hb-val">
              {money(r.value)} <small>{signed(r.change)}%</small>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
