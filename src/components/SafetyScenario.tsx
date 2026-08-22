import { CircleDot, LockKeyhole, ScanSearch, ShieldCheck } from 'lucide-react';

const signals = ['Age targeting', 'Secrecy cue', 'Off-platform move'];

export function SafetyScenario() {
  return (
    <div className="safety-scenario" aria-label="Illustrative game safety scenario">
      <div className="scenario-bar">
        <span><CircleDot size={12} /> ILLUSTRATIVE GAME SCENARIO</span>
        <span className="scenario-live">SAFE ACTIVE</span>
      </div>

      <div className="scenario-channel">
        <div>
          <small>MOONFORGE ONLINE</small>
          <strong>Private party chat</strong>
        </div>
        <div className="scenario-profiles" aria-label="Fictional conversation participants">
          <img src="/images/scenario/young-player.jpg" alt="Fictional young game player profile" />
          <img src="/images/scenario/unknown-adult.jpg" alt="Fictional unknown adult player profile" />
        </div>
      </div>

      <div className="scenario-messages">
        <article className="scenario-message child">
          <img src="/images/scenario/young-player.jpg" alt="" />
          <div><small>NovaKid · age band 13-15</small><p>I finally beat the Ember Vault!</p></div>
        </article>
        <article className="scenario-message adult">
          <img src="/images/scenario/unknown-adult.jpg" alt="" />
          <div><small>StoneGuide · unknown adult</small><p>You are way more mature than most players your age.</p></div>
        </article>
        <div className="scenario-session"><span>SESSION 3</span><em>4 days later</em></div>
        <article className="scenario-message adult flagged">
          <img src="/images/scenario/unknown-adult.jpg" alt="" />
          <div><small>StoneGuide · unknown adult</small><p>Let's keep this between us. Do you use another app?</p></div>
        </article>
      </div>

      <div className="scenario-result">
        <div className="scenario-result-heading">
          <ScanSearch size={18} />
          <span><strong>SAFE linked the context</strong><small>Escalating pattern across three sessions</small></span>
          <code>HIGH</code>
        </div>
        <div className="scenario-signals">
          {signals.map((signal) => <span key={signal}>{signal}</span>)}
        </div>
        <div className="scenario-actions">
          <span><ShieldCheck size={13} /> Contact restriction ready</span>
          <span><LockKeyhole size={13} /> Evidence preserved</span>
        </div>
      </div>

      <p className="scenario-disclaimer">Fictional profiles and messages created to illustrate a recurring safety pattern.</p>
    </div>
  );
}
