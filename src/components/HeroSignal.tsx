import type { Locale } from '../config/site';
import { home } from '../content/company';
import { tr } from '../lib/core';

/**
 * The homepage signature: scattered data points resolve into the three rising
 * bars and the forward chevron of the Dalal mark. Data → Insight → Action.
 * Pure SVG, animated once with CSS; static when reduced motion is requested.
 */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function HeroSignal({ locale }: { locale: Locale }) {
  const r = rand(7);
  // Data field: a loose grid on the left, denser toward the centre line
  const dots: { x: number; y: number; o: number; d: number; k: boolean }[] = [];
  for (let c = 0; c < 9; c++) {
    for (let row = 0; row < 11; row++) {
      if (r() < 0.38) continue;
      const x = 24 + c * 22 + (r() - 0.5) * 10;
      const y = 40 + row * 30 + (r() - 0.5) * 12;
      const centre = 1 - Math.min(1, Math.abs(y - 205) / 190);
      dots.push({ x, y, o: 0.25 + centre * 0.6 * r() + 0.1, d: c * 70 + row * 18, k: r() < 0.14 && c > 3 });
    }
  }
  const key = dots.filter((d) => d.k).slice(0, 7);
  const bars = [
    { x: 296, top: 220, h: 116 },
    { x: 338, top: 172, h: 164 },
    { x: 380, top: 112, h: 224 },
  ];
  return (
    <figure className="signal" aria-labelledby="signal-cap">
      <svg viewBox="0 0 560 440" role="img" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="sg-gold" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#9C6D25" />
            <stop offset="1" stopColor="#E0B871" />
          </linearGradient>
        </defs>
        <g className="sg-dots">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.k ? 3.2 : 2.1} fill={d.k ? '#E0B871' : '#FFFFFF'} opacity={d.k ? 1 : d.o.toFixed(2)} style={{ animationDelay: `${d.d}ms` }} />
          ))}
        </g>
        <g className="sg-links" fill="none" stroke="#E0B871" strokeWidth="1" strokeOpacity="0.55">
          {key.map((d, i) => {
            const b = bars[i % 3];
            return <path key={i} d={`M${d.x.toFixed(1)} ${d.y.toFixed(1)} C ${(d.x + 80).toFixed(1)} ${d.y.toFixed(1)}, ${b.x - 70} ${b.top + 20}, ${b.x} ${b.top + 6}`} pathLength={1} />;
          })}
        </g>
        <g className="sg-bars">
          {bars.map((b, i) => (
            <rect key={i} x={b.x} y={b.top} width="26" height={b.h} rx="2" fill="url(#sg-gold)" style={{ animationDelay: `${900 + i * 160}ms` }} />
          ))}
        </g>
        <path className="sg-chevron" d="M448 104 L536 224 L448 344" fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinejoin="miter" strokeLinecap="square" pathLength={1} />
        <g className="sg-axis" fill="#C9D3E0" fontSize="13" fontFamily="inherit">
          <path d="M24 418 H536" stroke="#3A5677" strokeWidth="1" />
          <circle cx="110" cy="418" r="3" fill="#C9D3E0" />
          <circle cx="300" cy="418" r="3" fill="#E0B871" />
          <circle cx="500" cy="418" r="3" fill="#FFFFFF" />
        </g>
      </svg>
      <figcaption id="signal-cap" className="signal-cap">
        <span>{tr(home.signal.data, locale)}</span>
        <span>{tr(home.signal.insight, locale)}</span>
        <span>{tr(home.signal.action, locale)}</span>
      </figcaption>
    </figure>
  );
}
