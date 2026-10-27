import { useEffect, useRef, useState } from 'react';
import type { Locale } from '../config/site';

/**
 * Illustrative request-triage workflow. Runs entirely in the browser with simple,
 * transparent rules. It is not connected to any model, mailbox or enterprise system.
 */

type Cat = 'billing' | 'support' | 'service' | 'complaint' | 'sales';
type Team = 'finance' | 'it' | 'operations' | 'customer' | 'business';

const TX = {
  flag: { en: 'Illustrative workflow: simulated, not connected to live systems', fr: 'Processus illustratif : simulé, non relié à des systèmes réels' },
  stages: [
    { en: 'Input', fr: 'Réception' },
    { en: 'Classification', fr: 'Classification' },
    { en: 'Intelligent processing', fr: 'Traitement intelligent' },
    { en: 'Human review', fr: 'Validation humaine' },
    { en: 'Outcome', fr: 'Résultat' },
  ],
  choose: { en: 'Choose a sample request or write your own', fr: 'Choisissez une demande type ou rédigez la vôtre' },
  label: { en: 'Incoming request', fr: 'Demande reçue' },
  run: { en: 'Process request', fr: 'Traiter la demande' },
  placeholder: { en: 'The classification, extracted details and proposed routing will appear here, followed by a human review step.', fr: 'La classification, les informations extraites et l’orientation proposée s’afficheront ici, suivies d’une étape de validation humaine.' },
  reset: { en: 'Start again', fr: 'Recommencer' },
  empty: { en: 'Write a request of at least 15 characters to process it.', fr: 'Rédigez une demande d’au moins 15 caractères pour la traiter.' },
  category: { en: 'Category', fr: 'Catégorie' },
  priority: { en: 'Priority', fr: 'Priorité' },
  confidence: { en: 'Confidence', fr: 'Confiance' },
  signals: { en: 'Signals detected', fr: 'Signaux détectés' },
  extracted: { en: 'Details extracted', fr: 'Informations extraites' },
  none: { en: 'None found', fr: 'Aucune' },
  route: { en: 'Proposed routing', fr: 'Orientation proposée' },
  draft: { en: 'Draft acknowledgement', fr: 'Accusé de réception proposé' },
  reviewQ: { en: 'A reviewer confirms or changes the routing before anything is sent.', fr: 'Un agent confirme ou modifie l’orientation avant tout envoi.' },
  lowConf: { en: 'Low confidence: review required.', fr: 'Confiance faible : validation obligatoire.' },
  approve: { en: 'Approve routing', fr: 'Valider l’orientation' },
  reassign: { en: 'Reassign to', fr: 'Réorienter vers' },
  outcomeTitle: { en: 'Request routed', fr: 'Demande orientée' },
  log: { en: 'Audit trail', fr: 'Journal de traitement' },
  routedTo: { en: 'Routed to', fr: 'Orientée vers' },
  by: { en: 'approved by reviewer', fr: 'validée par un agent' },
  changed: { en: 'reassigned by reviewer', fr: 'réorientée par un agent' },
  cats: {
    billing: { en: 'Billing and invoices', fr: 'Facturation' },
    support: { en: 'Technical support', fr: 'Support technique' },
    service: { en: 'Service or appointment request', fr: 'Demande de service ou de rendez-vous' },
    complaint: { en: 'Complaint', fr: 'Réclamation' },
    sales: { en: 'New business inquiry', fr: 'Demande commerciale' },
  } as Record<Cat, { en: string; fr: string }>,
  teams: {
    finance: { en: 'Finance team', fr: 'Équipe finance' },
    it: { en: 'IT support desk', fr: 'Support informatique' },
    operations: { en: 'Operations team', fr: 'Équipe opérations' },
    customer: { en: 'Customer care lead', fr: 'Responsable relation client' },
    business: { en: 'Business development', fr: 'Développement commercial' },
  } as Record<Team, { en: string; fr: string }>,
  prio: { high: { en: 'High', fr: 'Haute' }, normal: { en: 'Normal', fr: 'Normale' }, low: { en: 'Low', fr: 'Basse' } },
};

const SAMPLES = {
  en: [
    'Our invoice INV-20418 for $4,250 was charged twice this month. Please correct it before the 15th.',
    'The client portal is down and our staff cannot log in. This is urgent, we have a deadline today.',
    'We would like to schedule a maintenance visit for two vehicles next week, preferably Tuesday.',
    'We are a regional distributor interested in a dashboard project for our 12 branches. Who can we talk to?',
  ],
  fr: [
    'Notre facture INV-20418 de 4 250 $ a été prélevée deux fois ce mois-ci. Merci de corriger avant le 15.',
    'Le portail client est en panne et nos agents ne peuvent plus se connecter. C’est urgent, nous avons une échéance aujourd’hui.',
    'Nous souhaitons planifier une visite d’entretien pour deux véhicules la semaine prochaine, idéalement mardi.',
    'Nous sommes un distributeur régional intéressé par un projet de tableau de bord pour nos 12 agences. À qui pouvons-nous parler ?',
  ],
};

const RULES: { cat: Cat; team: Team; words: string[] }[] = [
  { cat: 'billing', team: 'finance', words: ['invoice', 'facture', 'charged', 'prélev', 'payment', 'paiement', 'refund', 'rembours', 'billing', 'factur', 'twice', 'deux fois'] },
  { cat: 'support', team: 'it', words: ['down', 'panne', 'log in', 'login', 'connecter', 'error', 'erreur', 'bug', 'password', 'mot de passe', 'portal', 'portail', 'access', 'accès'] },
  { cat: 'service', team: 'operations', words: ['schedule', 'planifier', 'appointment', 'rendez-vous', 'visit', 'visite', 'maintenance', 'entretien', 'book', 'réserver', 'delivery', 'livraison'] },
  { cat: 'complaint', team: 'customer', words: ['complaint', 'réclamation', 'unacceptable', 'inacceptable', 'disappointed', 'déçu', 'poor service', 'mauvais service', 'not happy', 'mécontent'] },
  { cat: 'sales', team: 'business', words: ['interested', 'intéressé', 'project', 'projet', 'quote', 'devis', 'proposal', 'proposition', 'partnership', 'partenariat', 'talk to', 'parler'] },
];
const URGENT = ['urgent', 'asap', 'immediately', 'immédiatement', 'today', "aujourd'hui", 'aujourd’hui', 'deadline', 'échéance', 'down', 'panne', 'cannot', 'ne peuvent', 'blocked', 'bloqué'];

function analyse(text: string) {
  const t = text.toLowerCase();
  const scored = RULES.map((r) => ({ ...r, hits: r.words.filter((w) => t.includes(w)) })).sort((a, b) => b.hits.length - a.hits.length);
  const top = scored[0];
  const second = scored[1];
  const urgentHits = URGENT.filter((w) => t.includes(w));
  const total = top.hits.length;
  const margin = total - second.hits.length;
  const confidence = total === 0 ? 0.32 : Math.min(0.97, 0.55 + margin * 0.12 + total * 0.05);
  const priority: 'high' | 'normal' | 'low' = urgentHits.length >= 1 ? 'high' : top.cat === 'sales' ? 'normal' : total === 0 ? 'low' : 'normal';
  const refs = text.match(/\b[A-Z]{2,5}-\d{3,}\b/g) || [];
  const amounts = text.match(/(\$\s?\d[\d,. ]*\d|\d[\d,. ]*\d\s?\$|\d[\d ,.]*\s?(?:USD|EUR|FCFA|XOF))/g) || [];
  const dates = text.match(/\b(monday|tuesday|wednesday|thursday|friday|lundi|mardi|mercredi|jeudi|vendredi|next week|semaine prochaine|today|aujourd’hui|aujourd'hui|the \d{1,2}(st|nd|rd|th)|le \d{1,2})\b/gi) || [];
  return { cat: total === 0 ? ('service' as Cat) : top.cat, team: total === 0 ? ('operations' as Team) : top.team, hits: top.hits, urgentHits, confidence, priority, entities: [...refs, ...amounts.map((a) => a.trim()), ...dates] };
}

export default function Workflow({ locale }: { locale: Locale }) {
  const tx = (o: { en: string; fr: string }) => o[locale];
  const [text, setText] = useState(SAMPLES[locale][0]);
  const [stage, setStage] = useState(0); // 0 idle/input, 1..3 revealed, 4 done
  const [result, setResult] = useState<ReturnType<typeof analyse> | null>(null);
  const [team, setTeam] = useState<Team>('finance');
  const [decision, setDecision] = useState<'approved' | 'changed' | null>(null);
  const [error, setError] = useState(false);
  const timers = useRef<number[]>([]);
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const run = () => {
    if (text.trim().length < 15) {
      setError(true);
      return;
    }
    setError(false);
    timers.current.forEach(clearTimeout);
    const r = analyse(text);
    setResult(r);
    setTeam(r.team);
    setDecision(null);
    if (reduced()) {
      setStage(3);
      return;
    }
    setStage(1);
    timers.current = [window.setTimeout(() => setStage(2), 650), window.setTimeout(() => setStage(3), 1300)];
  };
  const reset = () => {
    timers.current.forEach(clearTimeout);
    setStage(0);
    setResult(null);
    setDecision(null);
  };
  const finish = (d: 'approved' | 'changed') => {
    setDecision(d);
    setStage(4);
    window.setTimeout(() => outRef.current?.focus(), 30);
  };

  const now = new Date();
  const ts = (offsetSec: number) => new Date(now.getTime() + offsetSec * 1000).toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const ack = result
    ? locale === 'fr'
      ? `Bonjour, nous avons bien reçu votre demande (${tx(TX.cats[result.cat]).toLowerCase()}). Elle est transmise à : ${tx(TX.teams[team]).toLowerCase()}. Nous revenons vers vous dès que possible.`
      : `Hello, we have received your request (${tx(TX.cats[result.cat]).toLowerCase()}). It has been passed to our ${tx(TX.teams[team]).toLowerCase()}, who will follow up with you.`
    : '';

  return (
    <div className="flow" lang={locale}>
      <p className="dash-flag on-dark">{tx(TX.flag)}</p>
      <ol className="flow-steps" aria-label={TX.stages.map(tx).join(', ')}>
        {TX.stages.map((s, i) => {
          const state = stage === 0 ? (i === 0 ? 'current' : 'todo') : i < Math.min(stage, 4) || stage === 4 ? 'done' : i === stage ? 'current' : 'todo';
          return (
            <li key={i} className={`fs-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
              <span className="fs-n" aria-hidden="true">{i + 1}</span>
              <span className="fs-l">{tx(s)}</span>
            </li>
          );
        })}
      </ol>

      <div className="flow-body">
        <div className="flow-input">
          <p className="flow-k" id="flow-choose">{tx(TX.choose)}</p>
          <div className="chips" role="group" aria-labelledby="flow-choose">
            {SAMPLES[locale].map((s, i) => (
              <button key={i} type="button" className={`chip${text === s ? ' on' : ''}`} aria-pressed={text === s} onClick={() => { setText(s); reset(); }}>
                {tx([TX.cats.billing, TX.cats.support, TX.cats.service, TX.cats.sales][i])}
              </button>
            ))}
          </div>
          <label className="flow-k" htmlFor="flow-text">{tx(TX.label)}</label>
          <textarea id="flow-text" rows={4} value={text} onChange={(e) => { setText(e.target.value); if (stage) reset(); }} aria-invalid={error} aria-describedby={error ? 'flow-err' : undefined} />
          {error && <p className="field-error" id="flow-err">{tx(TX.empty)}</p>}
          <div className="flow-actions">
            <button type="button" className="btn btn-gold" onClick={run} disabled={stage > 0 && stage < 3}>
              {tx(TX.run)}
            </button>
            {stage > 0 && (
              <button type="button" className="btn btn-ghost-light" onClick={reset}>
                {tx(TX.reset)}
              </button>
            )}
          </div>
        </div>

        <div className="flow-output" aria-live="polite">
          {!result && <p className="flow-placeholder">{tx(TX.placeholder)}</p>}
          {result && stage >= 1 && (
            <div className="flow-panel">
              <dl className="flow-grid">
                <div>
                  <dt>{tx(TX.category)}</dt>
                  <dd>{tx(TX.cats[result.cat])}</dd>
                </div>
                <div>
                  <dt>{tx(TX.priority)}</dt>
                  <dd>
                    <span className={`prio prio-${result.priority}`}>{tx(TX.prio[result.priority])}</span>
                  </dd>
                </div>
                <div>
                  <dt>{tx(TX.confidence)}</dt>
                  <dd>
                    {Math.round(result.confidence * 100)}%
                    <span className="meter dark" aria-hidden="true"><span style={{ width: `${result.confidence * 100}%` }} /></span>
                  </dd>
                </div>
                <div>
                  <dt>{tx(TX.signals)}</dt>
                  <dd className="tags">{[...result.hits, ...result.urgentHits].length ? [...new Set([...result.hits, ...result.urgentHits])].map((h) => <span key={h}>{h}</span>) : tx(TX.none)}</dd>
                </div>
              </dl>
            </div>
          )}
          {result && stage >= 2 && (
            <div className="flow-panel">
              <dl className="flow-grid">
                <div className="wide">
                  <dt>{tx(TX.extracted)}</dt>
                  <dd className="tags">{result.entities.length ? result.entities.map((e, i) => <span key={i}>{e}</span>) : tx(TX.none)}</dd>
                </div>
                <div className="wide">
                  <dt>{tx(TX.draft)}</dt>
                  <dd className="draft">{ack}</dd>
                </div>
              </dl>
            </div>
          )}
          {result && stage >= 3 && stage < 4 && (
            <div className="flow-panel review">
              <p>{tx(TX.reviewQ)}</p>
              {result.confidence < 0.6 && <p className="warn">{tx(TX.lowConf)}</p>}
              <p className="route">
                {tx(TX.route)}: <strong>{tx(TX.teams[team])}</strong>
              </p>
              <div className="flow-actions">
                <button type="button" className="btn btn-gold" onClick={() => finish(team === result.team ? 'approved' : 'changed')}>
                  {tx(TX.approve)}
                </button>
                <label className="reassign">
                  <span>{tx(TX.reassign)}</span>
                  <select value={team} onChange={(e) => setTeam(e.target.value as Team)}>
                    {(Object.keys(TX.teams) as Team[]).map((k) => (
                      <option key={k} value={k}>
                        {tx(TX.teams[k])}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          )}
          {result && stage === 4 && (
            <div className="flow-panel outcome" tabIndex={-1} ref={outRef}>
              <h4>{tx(TX.outcomeTitle)}</h4>
              <p>
                {tx(TX.routedTo)} <strong>{tx(TX.teams[team])}</strong>, {decision === 'approved' ? tx(TX.by) : tx(TX.changed)}.
              </p>
              <p className="flow-k">{tx(TX.log)}</p>
              <ol className="log">
                <li><time>{ts(-4)}</time> {tx(TX.stages[0])}</li>
                <li><time>{ts(-3)}</time> {tx(TX.stages[1])}: {tx(TX.cats[result.cat])}, {tx(TX.prio[result.priority]).toLowerCase()}</li>
                <li><time>{ts(-2)}</time> {tx(TX.stages[2])}: {tx(TX.extracted).toLowerCase()} ({result.entities.length}), {tx(TX.draft).toLowerCase()}</li>
                <li><time>{ts(0)}</time> {tx(TX.stages[3])}: {decision === 'approved' ? tx(TX.by) : tx(TX.changed)}</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
