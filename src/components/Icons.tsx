import type { ReactNode } from 'react';

type P = { size?: number; className?: string };
const Svg = ({ size = 24, className, children }: P & { children: ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
    {children}
  </svg>
);

/** Service icons: drawn on a 32px grid, echoing the three rising bars of the logo. */
export const ServiceIcon = ({ name, ...p }: P & { name: string }) => {
  switch (name) {
    case 'bi':
      return (
        <Svg {...p}>
          <path d="M5 27h22" />
          <rect x="7" y="16" width="4" height="8" rx="1" />
          <rect x="14" y="11" width="4" height="13" rx="1" />
          <rect x="21" y="6" width="4" height="18" rx="1" />
        </Svg>
      );
    case 'consulting':
      return (
        <Svg {...p}>
          <circle cx="8" cy="9" r="3" />
          <circle cx="24" cy="23" r="3" />
          <path d="M11 9h6a4 4 0 0 1 4 4v1a4 4 0 0 0 0 0v2" />
          <path d="M8 12v4a4 4 0 0 0 4 4h9" />
          <path d="M18 17l3 3-3 3" />
        </Svg>
      );
    case 'platforms':
      return (
        <Svg {...p}>
          <rect x="4" y="6" width="24" height="16" rx="2" />
          <path d="M4 11h24" />
          <path d="M9 15h6M9 18h9" />
          <path d="M12 26h8M16 22v4" />
        </Svg>
      );
    case 'ai':
      return (
        <Svg {...p}>
          <rect x="4" y="12" width="7" height="8" rx="1.5" />
          <rect x="21" y="5" width="7" height="7" rx="1.5" />
          <rect x="21" y="20" width="7" height="7" rx="1.5" />
          <path d="M11 16h4l4-6.5h2M15 16l4 7.5h2" />
        </Svg>
      );
    case 'gov':
      return (
        <Svg {...p}>
          <path d="M4 12L16 5l12 7" />
          <path d="M6 12h20" />
          <path d="M8 13v10M13 13v10M19 13v10M24 13v10" />
          <path d="M5 27h22M6 23.5h20" />
        </Svg>
      );
    case 'web':
      return (
        <Svg {...p}>
          <circle cx="16" cy="16" r="11" />
          <path d="M5 16h22" />
          <path d="M16 5c3 3 4.5 6.7 4.5 11S19 24 16 27c-3-3-4.5-6.7-4.5-11S13 8 16 5z" />
        </Svg>
      );
    default:
      return null;
  }
};

export const IndustryIcon = ({ name, ...p }: P & { name: string }) => {
  switch (name) {
    case 'government':
      return <ServiceIcon name="gov" {...p} />;
    case 'financial-services':
      return (
        <Svg {...p}>
          <rect x="4" y="8" width="24" height="16" rx="2" />
          <circle cx="16" cy="16" r="3.5" />
          <path d="M8 12v0M24 20v0" strokeWidth={2.4} />
        </Svg>
      );
    case 'automotive':
      return (
        <Svg {...p}>
          <path d="M5 20v-4l3-6h16l3 6v4" />
          <path d="M4 20h24v3H4z" />
          <circle cx="10" cy="23" r="2.5" />
          <circle cx="22" cy="23" r="2.5" />
          <path d="M9 15h14" />
        </Svg>
      );
    case 'infrastructure':
      return (
        <Svg {...p}>
          <path d="M3 24h26" />
          <path d="M6 24V14l5-3v13M11 24V8l6-3v19M17 24v-9h6v9" />
          <path d="M25 24v-6h3v6" />
        </Svg>
      );
    case 'real-estate':
      return (
        <Svg {...p}>
          <path d="M5 14L16 5l11 9" />
          <path d="M8 12v14h16V12" />
          <path d="M13 26v-7a3 3 0 0 1 6 0v7" />
        </Svg>
      );
    case 'retail':
      return (
        <Svg {...p}>
          <path d="M6 11h20l-2 15H8z" />
          <path d="M12 11V9a4 4 0 0 1 8 0v2" />
        </Svg>
      );
    default:
      return null;
  }
};

export const IconExternal = (p: P) => (
  <Svg size={16} {...p}>
    <path d="M13 7H7v18h18v-6" />
    <path d="M18 7h7v7M25 7L14 18" />
  </Svg>
);
export const IconMail = (p: P) => (
  <Svg size={20} {...p}>
    <rect x="4" y="7" width="24" height="18" rx="2" />
    <path d="M5 9l11 8 11-8" />
  </Svg>
);
export const IconPhone = (p: P) => (
  <Svg size={20} {...p}>
    <path d="M9 4h4l2 6-3 2a15 15 0 0 0 8 8l2-3 6 2v4a3 3 0 0 1-3 3A21 21 0 0 1 6 7a3 3 0 0 1 3-3z" />
  </Svg>
);
export const IconPin = (p: P) => (
  <Svg size={20} {...p}>
    <path d="M16 28s9-8.5 9-15a9 9 0 0 0-18 0c0 6.5 9 15 9 15z" />
    <circle cx="16" cy="13" r="3" />
  </Svg>
);
export const IconMenu = (p: P) => (
  <Svg size={24} {...p}>
    <path d="M5 10h22M5 16h22M5 22h22" />
  </Svg>
);
export const IconClose = (p: P) => (
  <Svg size={24} {...p}>
    <path d="M8 8l16 16M24 8L8 24" />
  </Svg>
);
export const IconCheck = (p: P) => (
  <Svg size={18} {...p}>
    <path d="M6 16.5l6 6L26 9" />
  </Svg>
);
export const IconArrow = (p: P) => (
  <Svg size={18} {...p}>
    <path d="M6 16h20M19 9l7 7-7 7" />
  </Svg>
);
