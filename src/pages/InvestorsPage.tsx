import {
  ArrowRight,
  BrainCircuit,
  Check,
  ExternalLink,
  Layers3,
  LockKeyhole,
  Scale,
  ShieldCheck,
  UserRoundCheck,
  Workflow
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';

const regulationSignals = [
  {
    region: 'EUROPEAN UNION',
    title: 'The DSA child-safety framework explicitly addresses grooming.',
    copy: 'European Commission guidelines published in July 2025 cover grooming, harmful content, cyberbullying and unwanted contact from strangers. The guidelines inform how platforms can approach their DSA duties, but do not automatically guarantee compliance.',
    href: 'https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors'
  },
  {
    region: 'UNITED KINGDOM',
    title: 'Children safety duties are already in force.',
    copy: 'Since 25 July 2025, in-scope services likely to be accessed by children have had duties to assess risks and apply protection measures under the Online Safety Act framework.',
    href: 'https://www.ofcom.org.uk/online-safety/protecting-children/protection-of-children-duties-under-the-online-safety-act'
  },
  {
    region: 'UNITED STATES',
    title: 'Children privacy requirements continue to evolve.',
    copy: 'The FTC amended the COPPA Rule in April 2025. COPPA is primarily a privacy and parental-consent framework, not a complete content-safety system, which is why operators still need product-specific safety controls.',
    href: 'https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy'
  }
];

const platformAdvantages = [
  {
    icon: Workflow,
    title: 'Context becomes infrastructure',
    copy: 'A stable product identity connects sessions, messages, reports and access events instead of leaving safety teams with fragments.'
  },
  {
    icon: BrainCircuit,
    title: 'Models become specialized',
    copy: 'SAFE is designed around child-safety and community-risk patterns, rather than treating every moderation problem as generic text classification.'
  },
  {
    icon: ShieldCheck,
    title: 'Intervention becomes actionable',
    copy: 'Products retain policy control while SafeFun prepares the signal, evidence and realtime controls required for a focused response.'
  }
];

export function InvestorsPage() {
  return (
    <div className="landing investors-page">
      <header className="site-nav shell">
        <Brand />
        <nav aria-label="Primary navigation">
          <Link to="/#product">Platform</Link>
          <Link to="/news">News</Link>
          <Link to="/#safety">Safety</Link>
          <Link className="active" to="/investors">Investors</Link>
          <Link to="/docs">Docs</Link>
        </nav>
        <div className="nav-actions">
          <Link className="button ghost" to="/auth">Sign in</Link>
          <Link className="button primary small" to="/demo">
            See the demo <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <main>
        <section className="investor-hero shell">
          <div>
            <span className="kicker">THE SAFEFUN INVESTMENT THESIS</span>
            <h1>A real response to a real child-safety problem.</h1>
            <p>
              Children already live, play and build relationships inside digital products. Safety
              teams face fragmented context while regulatory obligations are active and still
              expanding. SafeFun is building the specialized infrastructure layer before the next
              incident, deadline or expensive product rebuild.
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/demo">See working infrastructure <ArrowRight size={16} /></Link>
              <Link className="button secondary" to="/news">Review the external signals</Link>
            </div>
          </div>
          <div className="investor-thesis-card">
            <img src="/images/news/ai-behavior-patterns.jpg" alt="AI model connecting online safety signals into a risk pattern" />
            <div>
              <span>THE OPPORTUNITY</span>
              <strong>Child safety becomes a product capability, not a last-minute moderation queue.</strong>
            </div>
            <ul>
              <li><Check /> Urgent and visible customer pain</li>
              <li><Check /> Regulation is creating durable demand</li>
              <li><Check /> API and SDK distribution scales across products</li>
              <li><Check /> Chat is the wedge; UGC and Social Feed expand the platform</li>
            </ul>
          </div>
        </section>

        <section className="investor-why-now">
          <div className="shell">
            <div className="investor-section-heading">
              <div><span className="kicker">WHY NOW</span><h2>Regulation is no longer hypothetical.</h2></div>
              <p>Major jurisdictions already require stronger protections, while guidance, enforcement and technical expectations continue to evolve.</p>
            </div>
            <div className="regulation-grid">
              {regulationSignals.map((signal) => (
                <a href={signal.href} key={signal.region} target="_blank" rel="noreferrer">
                  <header><Scale size={16} /><span>{signal.region}</span><ExternalLink size={13} /></header>
                  <h3>{signal.title}</h3>
                  <p>{signal.copy}</p>
                  <span className="source-link">Official source <ArrowRight size={13} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="investor-platform shell">
          <div className="investor-section-heading">
            <div><span className="kicker">THE TECHNOLOGY RESPONSE</span><h2>Technology can protect children earlier.</h2></div>
            <p>SAFE links what generic filters miss and gives the operator a controlled path from signal to intervention.</p>
          </div>
          <div className="investor-advantage-grid">
            {platformAdvantages.map(({ icon: Icon, title, copy }, index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="investor-expansion">
          <div className="shell expansion-grid">
            <div>
              <span className="kicker">LAND AND EXPAND</span>
              <h2>One safety layer across every social surface.</h2>
              <p>
                We enter through a concrete integration and preserve the same identity, context,
                model and evidence foundation as the customer's community grows.
              </p>
            </div>
            <div className="expansion-path">
              <article><span>NOW</span><ShieldCheck /><strong>Chat safety foundation</strong><p>Identity, access, reporting and evidence.</p></article>
              <ArrowRight />
              <article><span>NEXT</span><LockKeyhole /><strong>UGC protection</strong><p>Assets, profiles and product-specific metadata.</p></article>
              <ArrowRight />
              <article><span>SCALE</span><Layers3 /><strong>Social Feed safety</strong><p>Cross-surface community intelligence.</p></article>
            </div>
          </div>
        </section>

        <section className="investor-ahead shell">
          <UserRoundCheck size={30} />
          <div>
            <span className="kicker">BUILD BEFORE THE NEXT DEADLINE</span>
            <h2>SafeFun is designed for teams that want to lead on child safety, not retrofit it after harm.</h2>
            <p>
              Our goal is not to promise automatic compliance. It is to give operators the identity,
              realtime controls, specialized models and accountable evidence needed to implement a
              stronger safety program before regulation or crisis forces a rushed response.
            </p>
          </div>
          <Link className="button primary" to="/docs">Explore the platform <ArrowRight size={16} /></Link>
        </section>
      </main>

      <footer className="shell">
        <Brand compact />
        <p>Specialized child-safety infrastructure for games, apps and online communities.</p>
        <div><Link to="/news">Newsroom</Link><span>© 2026 Funventure</span></div>
      </footer>
    </div>
  );
}
