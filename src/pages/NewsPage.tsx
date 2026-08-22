import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { safeFunUpdates, safetySignals, type NewsItem } from '../data/news';

function NewsCard({ item }: { item: NewsItem }) {
  const Icon = item.icon;
  const content = (
    <>
      <div className="news-card-image">
        <img src={item.image} alt={item.imageAlt} loading="lazy" />
      </div>
      <header>
        <span><Icon size={15} /> {item.label}</span>
        <time>{item.date}</time>
      </header>
      <div className="news-card-source">{item.source}</div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      {item.response && (
        <div className="news-response">
          <small>SAFEFUN DESIGN RESPONSE</small>
          <p>{item.response}</p>
        </div>
      )}
      <span className="news-read-more">
        {item.readMore} {item.external ? <ExternalLink size={13} /> : <ArrowRight size={13} />}
      </span>
    </>
  );

  return item.external ? (
    <a className="newsroom-card" href={item.href} target="_blank" rel="noreferrer">
      {content}
    </a>
  ) : (
    <Link className="newsroom-card" to={item.href}>{content}</Link>
  );
}

export function NewsPage() {
  return (
    <div className="landing news-page">
      <header className="site-nav shell">
        <Brand />
        <nav aria-label="Primary navigation">
          <Link to="/#product">Product</Link>
          <Link className="active" to="/news">News</Link>
          <Link to="/#safety">Safety</Link>
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
        <section className="newsroom-hero shell">
          <span className="kicker">SAFEFUN NEWSROOM</span>
          <h1>Product updates and signals shaping online safety.</h1>
          <p>
            Follow the AI/ML safety infrastructure we ship and the real-world signals that make
            grooming detection, earlier intervention and accountable evidence essential.
          </p>
        </section>

        <section className="newsroom-section shell">
          <div className="newsroom-section-heading">
            <div><span className="kicker">FROM SAFEFUN</span><h2>What we are building</h2></div>
            <p>Verified product and infrastructure updates from the SafeFun team.</p>
          </div>
          <div className="newsroom-grid internal">
            {safeFunUpdates.map((item) => <NewsCard item={item} key={item.title} />)}
          </div>
        </section>

        <section className="newsroom-external">
          <div className="shell newsroom-section">
            <div className="newsroom-section-heading">
              <div><span className="kicker">EXTERNAL SIGNALS</span><h2>Why the safety layer matters</h2></div>
              <p>Reporting, research, regulatory action and legal claims from outside SafeFun.</p>
            </div>
            <div className="newsroom-grid">
              {safetySignals.map((item) => <NewsCard item={item} key={item.title} />)}
            </div>
            <p className="news-disclaimer">
              These external sources concern Roblox; SafeFun is not affiliated with Roblox. Legal
              claims are allegations unless established by a court. Safety infrastructure can
              reduce blind spots, but it does not guarantee prevention of harm or regulatory
              compliance.
            </p>
          </div>
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
