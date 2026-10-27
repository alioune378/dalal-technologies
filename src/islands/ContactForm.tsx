import { useRef, useState } from 'react';
import type { Locale } from '../config/site';
import { contactCopy as C } from '../content/company';

/**
 * Contact form handled by Netlify Forms (free tier, no extra service).
 * Without JavaScript it posts normally and lands on /<locale>/contact/thanks/.
 * With JavaScript it validates in place and submits with fetch.
 * Spam protection: honeypot field + Netlify's built-in spam filtering (Akismet).
 */
type Fields = { name: string; organization: string; email: string; topic: string; message: string; consent: boolean };
type Errs = Partial<Record<keyof Fields, string>>;

export default function ContactForm({ locale, formName, email }: { locale: Locale; formName: string; email: string }) {
  const tx = (o: { en: string; fr: string }) => o[locale];
  const F = C.form;
  const [v, setV] = useState<Fields>({ name: '', organization: '', email: '', topic: '', message: '', consent: false });
  const [errs, setErrs] = useState<Errs>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const validate = (f: Fields): Errs => {
    const e: Errs = {};
    if (f.name.trim().length < 2) e.name = tx(F.errors.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = tx(F.errors.email);
    if (!f.topic) e.topic = tx(F.errors.topic);
    if (f.message.trim().length < 20) e.message = tx(F.errors.message);
    if (!f.consent) e.consent = tx(F.errors.consent);
    return e;
  };

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = k === 'consent' ? (e.target as HTMLInputElement).checked : e.target.value;
    const next = { ...v, [k]: val } as Fields;
    setV(next);
    if (errs[k]) setErrs({ ...errs, [k]: validate(next)[k] });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(v);
    setErrs(found);
    if (Object.keys(found).length) {
      setTimeout(() => summaryRef.current?.focus(), 20);
      return;
    }
    // Honeypot: silently accept bots without sending
    const hp = (form.elements.namedItem('bot-field') as HTMLInputElement | null)?.value;
    setState('sending');
    try {
      if (!hp) {
        const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
        const res = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
        if (!res.ok) throw new Error(String(res.status));
      }
      setState('sent');
      setTimeout(() => doneRef.current?.focus(), 20);
    } catch {
      setState('error');
      setTimeout(() => summaryRef.current?.focus(), 20);
    }
  };

  if (state === 'sent') {
    return (
      <div className="form-done" tabIndex={-1} ref={doneRef} role="status">
        <h2>{tx(F.sentTitle)}</h2>
        <p>{tx(F.sentBody)}</p>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            setV({ name: '', organization: '', email: '', topic: '', message: '', consent: false });
            setState('idle');
          }}
        >
          {tx(F.sendAnother)}
        </button>
      </div>
    );
  }

  const errCount = Object.values(errs).filter(Boolean).length;
  const field = (k: keyof Fields) => ({ id: `cf-${k}`, name: k, 'aria-invalid': !!errs[k] || undefined, 'aria-describedby': errs[k] ? `cf-${k}-err` : undefined });

  return (
    <form name={formName} method="POST" action={`/${locale}/contact/thanks/`} className="contact-form" noValidate onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="language" value={locale} />
      <p className="hp" aria-hidden="true">
        <label>
          Do not fill this out <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="form-alert" tabIndex={-1} ref={summaryRef} role={errCount || state === 'error' ? 'alert' : undefined}>
        {errCount > 0 && <p>{tx(F.errors.summary)}</p>}
        {state === 'error' && (
          <p>
            {tx(F.errors.network)} <a href={`mailto:${email}`}>{email}</a>
          </p>
        )}
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">{tx(F.name)}</label>
          <input {...field('name')} type="text" autoComplete="name" required value={v.name} onChange={set('name')} />
          {errs.name && <p className="field-error" id="cf-name-err">{errs.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="cf-organization">
            {tx(F.org)} <span className="hint">{tx(F.orgHint)}</span>
          </label>
          <input {...field('organization')} type="text" autoComplete="organization" value={v.organization} onChange={set('organization')} />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-email">{tx(F.email)}</label>
          <input {...field('email')} type="email" autoComplete="email" inputMode="email" required value={v.email} onChange={set('email')} />
          {errs.email && <p className="field-error" id="cf-email-err">{errs.email}</p>}
        </div>
        <div className="field">
          <label htmlFor="cf-topic">{tx(F.topic)}</label>
          <select {...field('topic')} required value={v.topic} onChange={set('topic')}>
            <option value="" disabled>
              —
            </option>
            {F.topics.map((t) => (
              <option key={t.en} value={t.en}>
                {tx(t)}
              </option>
            ))}
          </select>
          {errs.topic && <p className="field-error" id="cf-topic-err">{errs.topic}</p>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-message">{tx(F.message)}</label>
        <p className="hint" id="cf-message-hint">{tx(F.messageHint)}</p>
        <textarea {...field('message')} aria-describedby={errs.message ? 'cf-message-err cf-message-hint' : 'cf-message-hint'} rows={6} required value={v.message} onChange={set('message')} />
        {errs.message && <p className="field-error" id="cf-message-err">{errs.message}</p>}
      </div>
      <div className="field check">
        <input {...field('consent')} type="checkbox" required checked={v.consent} onChange={set('consent')} value="yes" />
        <label htmlFor="cf-consent">{tx(F.consent)}</label>
        {errs.consent && <p className="field-error" id="cf-consent-err">{errs.consent}</p>}
      </div>
      <p className="form-notice">
        {tx(F.notice)} <a href={`/${locale}/privacy/`}>{locale === 'fr' ? 'Politique de confidentialité' : 'Privacy notice'}</a>
      </p>
      <button className="btn btn-navy" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? tx(F.sending) : tx(F.send)}
      </button>
    </form>
  );
}
