import {
  ArrowRight,
  BrainCircuit,
  Check,
  CircleDot,
  ExternalLink,
  KeyRound,
  Layers3,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { SafetyScenario } from '../components/SafetyScenario';
import { safetySignals } from '../data/news';

const features = [
  {
    icon: Workflow,
    title: 'See behavior as a sequence',
    copy: 'Connect conversations, sessions, identity changes, reports and access events into one behavioral timeline.'
  },
  {
    icon: BrainCircuit,
    title: 'Use specialized models for distinct harms',
    copy: 'Grooming, hate, targeted harassment and harmful UGC each require different signals, context and product responses.'
  },
  {
    icon: ShieldAlert,
    title: 'Intervene with context',
    copy: 'Give safety teams review-ready evidence and product controls for earlier, accountable action.'
  }
];

export function LandingPage() {
  return (
    <div className="landing">
      <header className="site-nav shell">
        <Brand />
        <nav aria-label="Primary navigation">
          <a href="#product">Platform</a>
          <Link to="/news">News</Link>
          <a href="#safety">Safety</a>
          <Link to="/investors">Investors</Link>
          <Link to="/docs">Docs</Link>
        </nav>
        <div className="nav-actions">
          <Link className="button ghost" to="/auth">Sign in</Link>
          <Link className="button primary small" to="/demo">
            Open tester <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse" /> Child safety infrastructure for online communities</div>
            <h1>Protect children in every interaction.<span>SAFE sees the context.</span></h1>
            <p>
              SafeFun gives games, apps and social products a specialized safety layer built around
              children. It connects identity, conversations and behavior across sessions so teams
              can recognize risk earlier, act with context and preserve the evidence they need.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/demo">
                See SAFE in action <ArrowRight size={17} />
              </Link>
              <Link className="button secondary" to="/docs">Read the API docs</Link>
            </div>
            <div className="hero-note">
              <span><Check size={14} /> Context across sessions</span>
              <span><Check size={14} /> Specialized child-safety models</span>
              <span><Check size={14} /> Review-ready evidence</span>
            </div>
          </div>

          <SafetyScenario />
        </section>

        <section className="signal-strip">
          <div className="shell">
            <span>CHILD SAFETY FIRST</span>
            <b><ShieldCheck size={18} /> Children Safety</b>
            <b><ShieldAlert size={18} /> Hate & Harassment</b>
            <b><BrainCircuit size={18} /> AI/ML Specialized Models</b>
            <b><Layers3 size={18} /> Chat, UGC & Social Feeds</b>
          </div>
        </section>

        <section className="specialized-section" id="safety">
          <div className="shell specialized-grid">
            <div className="specialized-copy">
              <span className="kicker">SPECIALIZED SAFE MODELS</span>
              <h2>Different harms need<br />different models.</h2>
              <p>
                SAFE is designed as a family of specialized models. Children Safety links patterns
                such as grooming and unwanted contact. Community Safety recognizes hate, targeted
                harassment, coded abuse and coordinated attacks across sessions.
              </p>
              <div className="safe-model-pills">
                <span><ShieldCheck size={14} /><strong>SAFE Children</strong> Grooming & contact</span>
                <span><ShieldAlert size={14} /><strong>SAFE Community</strong> Hate & harassment</span>
                <span><Layers3 size={14} /><strong>SAFE Content</strong> UGC & Social Feed</span>
              </div>
              <ul className="check-list">
                <li><Check /> Threat-specific patterns, not generic sentiment</li>
                <li><Check /> Signals linked across identities and sessions</li>
                <li><Check /> Product policy and human review remain in control</li>
              </ul>
            </div>
            <div className="hero-safety-engine" aria-label="SafeFun specialized behavior risk model example">
              <div className="engine-bar">
                <span><BrainCircuit size={14} /> SPECIALIZED SAFE MODEL</span>
                <span className="connected"><CircleDot size={12} /> CONTEXT LINKED</span>
              </div>
              <div className="engine-summary">
                <div>
                  <small>CHILD SAFETY MODEL</small>
                  <strong>Grooming pattern detection</strong>
                </div>
                <div className="risk-score"><span>RISK SIGNAL</span><strong>0.87</strong></div>
              </div>
              <div className="behavior-timeline">
                <article>
                  <span>01</span>
                  <div><small>RELATIONSHIP SIGNAL</small><strong>Unusual trust-building frequency</strong></div>
                  <em>observed</em>
                </article>
                <article>
                  <span>02</span>
                  <div><small>CONTEXT SIGNAL</small><strong>Repeated secrecy cues</strong></div>
                  <em>elevated</em>
                </article>
                <article>
                  <span>03</span>
                  <div><small>BOUNDARY SIGNAL</small><strong>Off-platform contact attempt</strong></div>
                  <em>high risk</em>
                </article>
              </div>
              <div className="engine-action">
                <ScanSearch size={19} />
                <span><strong>Safety review ready</strong><small>Cross-session context and evidence attached</small></span>
                <code>ACT</code>
              </div>
            </div>
          </div>
        </section>

        <section className="news-section shell" id="signals">
          <div className="news-heading">
            <div>
              <span className="kicker">WHY THIS INFRASTRUCTURE MATTERS</span>
              <h2>The child-safety need is visible now.</h2>
            </div>
            <p>
              Harm often develops across many interactions. Recent reporting and research show why
              platforms need behavior-level detection, controlled access and evidence that survives
              beyond a single message.
            </p>
          </div>
          <div className="news-grid">
            {safetySignals.map(({ source, date, label, icon: Icon, title, summary, response, href, image, imageAlt }) => (
              <article key={href}>
                <div className="news-card-image">
                  <img src={image} alt={imageAlt} loading="lazy" />
                </div>
                <header>
                  <span><Icon size={15} /> {label}</span>
                  <time>{date}</time>
                </header>
                <h3>{title}</h3>
                <p>{summary}</p>
                <div className="news-response">
                  <small>SAFEFUN DESIGN RESPONSE</small>
                  <p>{response}</p>
                </div>
                <a href={href} target="_blank" rel="noreferrer">
                  Read at {source} <ExternalLink size={13} />
                </a>
              </article>
            ))}
          </div>
          <div className="news-all-link">
            <Link className="button secondary" to="/news">
              Visit the SafeFun newsroom <ArrowRight size={16} />
            </Link>
          </div>
          <p className="news-disclaimer">
            These sources concern Roblox; SafeFun is not affiliated with Roblox. Legal claims are
            allegations unless established by a court. Safety infrastructure can reduce blind
            spots, but it does not guarantee prevention of harm or regulatory compliance.
          </p>
        </section>

        <section className="product-section shell" id="product">
          <div className="section-heading">
            <span className="kicker">THE SAFETY INTELLIGENCE LAYER</span>
            <h2>From scattered activity<br />to an actionable safety signal.</h2>
            <p>Connect your product once. SafeFun turns communication and behavioral context into earlier risk detection, focused review and defensible action.</p>
          </div>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, copy }, index) => (
              <article key={title}>
                <span className="feature-number">0{index + 1}</span>
                <Icon size={23} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="integration-section">
          <div className="shell integration-grid">
            <div>
              <span className="kicker">IDENTITY MAKES AI/ML USEFUL</span>
              <h2>Understand behavior across sessions, not isolated messages.</h2>
              <p>
                Your backend establishes a stable, product-scoped identity. That lets safety models
                connect patterns over time while raw external user IDs stay protected.
              </p>
              <ul className="check-list">
                <li><Check /> Product-scoped identity mapping</li>
                <li><Check /> Cross-session behavioral context</li>
                <li><Check /> Specialized grooming and community models</li>
                <li><Check /> Encrypted, review-ready evidence</li>
              </ul>
            </div>
            <div className="code-window">
              <div className="code-tabs"><span className="active">CREATE SESSION</span><span>SEND MESSAGE</span></div>
              <pre><code><span className="blue">POST</span> /api/v1/sessions{String.fromCharCode(10)}
Authorization: Bearer sfk_live_••••{String.fromCharCode(10)}
Idempotency-Key: 0198…{String.fromCharCode(10, 10)}
<span className="muted">&#123;</span>{String.fromCharCode(10)}
  <span className="green">&quot;externalUserId&quot;</span>: <span className="amber">&quot;user-4821&quot;</span>,{String.fromCharCode(10)}
  <span className="green">&quot;senderName&quot;</span>: <span className="amber">&quot;RuneKeeper&quot;</span>{String.fromCharCode(10)}
<span className="muted">&#125;</span></code></pre>
              <div className="code-result"><KeyRound size={15} /> 15-minute client token issued</div>
            </div>
          </div>
        </section>

        <section className="cta-section shell">
          <div>
            <span className="kicker">START WITH REAL INFRASTRUCTURE</span>
            <h2>See the identity, access and evidence foundation in action.</h2>
          </div>
          <Link className="button primary" to="/demo">
            Open the live demo <ArrowRight size={17} />
          </Link>
        </section>
      </main>

      <footer className="shell">
        <Brand compact />
        <p>AI-driven Children Safety and Community Safety infrastructure, built for scale.</p>
        <div><Link to="/investors">Investors</Link><Link to="/docs">Documentation</Link><span>© 2026 Funventure</span></div>
      </footer>
    </div>
  );
}
