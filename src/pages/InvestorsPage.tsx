import {
  ArrowRight,
  BrainCircuit,
  Check,
  ExternalLink,
  Globe2,
  Layers3,
  LockKeyhole,
  Scale,
  ShieldAlert,
  ShieldCheck,
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

const momentumSignals = [
  {
    value: '95%',
    label: 'of young people aged 13-17 use a social platform',
    copy: 'Nearly two thirds use social media daily and about one third report using it almost constantly.',
    source: 'U.S. Surgeon General',
    href: 'https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/social-media/index.html'
  },
  {
    value: '2x',
    label: 'risk of poor mental-health outcomes above three hours of daily social media use',
    copy: 'The U.S. Surgeon General includes symptoms of depression and anxiety among the outcomes associated with this level of use.',
    source: 'U.S. Surgeon General',
    href: 'https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/social-media/index.html'
  },
  {
    value: '1 in 6',
    label: 'school-aged children report experiencing cyberbullying',
    copy: 'WHO/Europe found victimization increased between 2018 and 2022 for both boys and girls across its study population.',
    source: 'WHO/Europe',
    href: 'https://www.who.int/europe/news/item/27-03-2024-one-in-six-school-aged-children-experiences-cyberbullying--finds-new-who-europe-study'
  },
  {
    value: '40%',
    label: 'of U.S. high school students reported persistent sadness or hopelessness',
    copy: 'CDC also found frequent social media use was associated with bullying victimization, sadness or hopelessness and suicide risk.',
    source: 'CDC YRBS 2023',
    href: 'https://www.cdc.gov/yrbs/results/2023-yrbs-results.html'
  }
];

const safeModules = [
  {
    icon: ShieldCheck,
    name: 'SAFE Children',
    title: 'Grooming and unwanted contact',
    copy: 'Age targeting, secrecy, boundary testing, relationship escalation and attempts to move children outside the protected environment.'
  },
  {
    icon: ShieldAlert,
    name: 'SAFE Community',
    title: 'Hate and targeted harassment',
    copy: 'Dehumanizing language, repeated degradation, identity-based attacks, dog whistles and coordinated abuse across sessions.'
  },
  {
    icon: Layers3,
    name: 'SAFE Content',
    title: 'UGC and Social Feed risk',
    copy: 'Context-aware signals across user profiles, custom content, images, metadata and recommendation surfaces.'
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
    title: 'Threat-specific models',
    copy: 'Grooming, hate, harassment and harmful UGC require different signals, context windows and product responses.'
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
            <h1>The safety layer for a world moving online.</h1>
            <p>
              Child safety creates the urgency. Hate, harassment, harmful UGC and community risk
              reveal the full platform opportunity. As relationships, identity and culture move
              into games and digital communities, every product with people becomes a safety product.
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
              <strong>Child safety creates momentum. Community safety creates platform scale.</strong>
            </div>
            <ul>
              <li><Check /> Social life is becoming a realtime digital product</li>
              <li><Check /> Safety expectations are becoming permanent</li>
              <li><Check /> The implementation category has no universal standard yet</li>
              <li><Check /> Chat is the wedge; UGC and Social Feed expand the platform</li>
            </ul>
          </div>
        </section>

        <section className="momentum-section">
          <div className="shell">
            <div className="investor-section-heading">
              <div><span className="kicker">THE MOMENTUM</span><h2>Virtual space is becoming social reality.</h2></div>
              <p>Reach is nearly universal, exposure is persistent and online harm can follow a young person beyond any single session or device.</p>
            </div>
            <div className="momentum-grid">
              {momentumSignals.map((signal) => (
                <a href={signal.href} key={signal.value} target="_blank" rel="noreferrer">
                  <strong>{signal.value}</strong>
                  <h3>{signal.label}</h3>
                  <p>{signal.copy}</p>
                  <span>{signal.source} <ExternalLink size={12} /></span>
                </a>
              ))}
            </div>
            <p className="statistics-note">These figures show scale and association. They do not establish that every mental-health outcome is caused by social media or online hate alone.</p>
          </div>
        </section>

        <section className="investor-why-now">
          <div className="shell">
            <div className="investor-section-heading">
              <div><span className="kicker">THE CATEGORY WINDOW</span><h2>Safety is regulated. Its infrastructure is not standardized.</h2></div>
              <p>Laws increasingly define duties and outcomes, but products still assemble identity, detection, intervention and evidence through fragmented systems. That gap is the first-mover opportunity.</p>
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
            <div><span className="kicker">THE SPECIALIZED PLATFORM</span><h2>One SAFE platform. Different models for different harms.</h2></div>
            <p>Generic moderation asks whether one message is bad. SAFE asks what risk is developing, who is affected and what the product can do next.</p>
          </div>
          <div className="safe-module-grid">
            {safeModules.map(({ icon: Icon, name, title, copy }) => (
              <article key={name}>
                <header><Icon size={20} /><span>{name}</span></header>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="investor-section-heading technology-heading">
            <div><span className="kicker">THE TECHNOLOGY RESPONSE</span><h2>Context turns detection into action.</h2></div>
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
          <Globe2 size={30} />
          <div>
            <span className="kicker">THE CATEGORY-DEFINING AMBITION</span>
            <h2>Become the default safety infrastructure before safety becomes table stakes.</h2>
            <p>
              SafeFun is building early, while products still lack a common safety layer. Our ambition
              is to make specialized detection and intervention as embeddable as authentication or
              payments, across child safety and the much larger community-safety market.
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
