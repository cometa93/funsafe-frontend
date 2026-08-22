import {
  ArrowRight,
  Braces,
  Check,
  CircleDot,
  ExternalLink,
  Flag,
  KeyRound,
  Radio,
  ShieldCheck,
  UserRoundCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { safetySignals } from '../data/news';

const features = [
  {
    icon: UserRoundCheck,
    title: 'Identity that follows behavior',
    copy: 'Map your user ID to a stable SafeFun identity without storing the raw identifier.'
  },
  {
    icon: Flag,
    title: 'Reports with useful context',
    copy: 'Preserve the reported message and recent author history for a focused safety review.'
  },
  {
    icon: Braces,
    title: 'Messages your product understands',
    copy: 'Attach safe key/value metadata for items, guilds, profiles, PvP results, or your own concepts.'
  }
];

export function LandingPage() {
  return (
    <div className="landing">
      <header className="site-nav shell">
        <Brand />
        <nav aria-label="Primary navigation">
          <a href="#product">Product</a>
          <Link to="/news">News</Link>
          <a href="#safety">Safety</a>
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
            <div className="eyebrow"><span className="pulse" /> AI-driven safety for games & apps</div>
            <h1>Safe for margin.<span>Built for scale.</span></h1>
            <p>
              One API for realtime chat, Children Safety and Community Safety, with specialized
              models and review-ready context designed for products that grow without making
              protection an afterthought.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/demo">
                Launch Chat Tester <ArrowRight size={17} />
              </Link>
              <Link className="button secondary" to="/docs">Read the API docs</Link>
            </div>
            <div className="hero-note">
              <span><Check size={14} /> Unity 6000+</span>
              <span><Check size={14} /> Web, desktop & mobile</span>
              <span><Check size={14} /> Open message model</span>
            </div>
          </div>

          <div className="hero-console" aria-label="SafeFun chat event example">
            <div className="console-bar">
              <div className="traffic-lights"><i /><i /><i /></div>
              <span>live event stream</span>
              <span className="connected"><CircleDot size={12} /> connected</span>
            </div>
            <div className="console-context">
              <span># guild:moonforge</span>
              <div className="avatars"><b>AM</b><b>RK</b><b>+8</b></div>
            </div>
            <div className="chat-preview">
              <article>
                <div className="avatar lime">AM</div>
                <div>
                  <header><strong>AdaM</strong><time>20:41</time></header>
                  <p>Anyone ready for the Ember Vault?</p>
                </div>
              </article>
              <article>
                <div className="avatar violet">RK</div>
                <div>
                  <header><strong>RuneKeeper</strong><time>20:42</time></header>
                  <div className="item-card">
                    <div className="item-icon">✦</div>
                    <span><small>SHARED ITEM</small><strong>Sunforged Pickaxe</strong></span>
                    <em>LEGENDARY</em>
                  </div>
                </div>
              </article>
            </div>
            <div className="safety-event">
              <ShieldCheck size={18} />
              <span><strong>Safety context active</strong><small>Identity, access and report trail attached</small></span>
              <code>24h</code>
            </div>
          </div>
        </section>

        <section className="signal-strip">
          <div className="shell">
            <span>SAFETY LAYER</span>
            <b><ShieldCheck size={18} /> Children Safety</b>
            <b><UserRoundCheck size={18} /> Community Safety</b>
            <b><Radio size={18} /> AI-driven</b>
            <b><Braces size={18} /> Specialized Models</b>
          </div>
        </section>

        <section className="news-section shell" id="signals">
          <div className="news-heading">
            <div>
              <span className="kicker">WHY THIS INFRASTRUCTURE MATTERS</span>
              <h2>The safety gap is already visible.</h2>
            </div>
            <p>
              Recent reporting, research and legal claims show where identity, access, moderation
              and evidence can break down as online communities grow.
            </p>
          </div>
          <div className="news-grid">
            {safetySignals.map(({ source, date, label, icon: Icon, title, summary, response, href }) => (
              <article key={href}>
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
            <span className="kicker">CHAT, FIRST</span>
            <h2>A small integration surface.<br />A serious operational foundation.</h2>
            <p>Start with chat today. Keep the same product, identity and safety model as your social layer grows.</p>
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

        <section className="integration-section" id="safety">
          <div className="shell integration-grid">
            <div>
              <span className="kicker">SERVER-AUTHORITATIVE</span>
              <h2>Your backend decides who the user is and where they belong.</h2>
              <p>
                API keys stay on your server. Short-lived user tokens go to the client. Channel
                grants and profile changes propagate to every active session.
              </p>
              <ul className="check-list">
                <li><Check /> Product-scoped identity mapping</li>
                <li><Check /> Live grant and revoke events</li>
                <li><Check /> Mutable display name, immutable message snapshot</li>
                <li><Check /> Custom views without forking the SDK</li>
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
            <span className="kicker">BUILD THE FIRST CONVERSATION</span>
            <h2>Test two users, one channel and your own message type.</h2>
          </div>
          <Link className="button primary" to="/demo">
            Open the live tester <ArrowRight size={17} />
          </Link>
        </section>
      </main>

      <footer className="shell">
        <Brand compact />
        <p>AI-driven Children Safety and Community Safety infrastructure, built for scale.</p>
        <div><Link to="/docs">Documentation</Link><span>© 2026 Funventure</span></div>
      </footer>
    </div>
  );
}
