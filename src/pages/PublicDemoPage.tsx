import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  Activity,
  BrainCircuit,
  Check,
  Circle,
  Copy,
  Flag,
  Link2,
  MessageSquareText,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { useChatClient, type ChatTesterClient } from '../hooks/useChatClient';
import { publicDemoApi, type ModerationUpdate } from '../lib/api';

export function PublicDemoPage() {
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get('invite');
  const isGuest = Boolean(inviteCode);
  const alice = useChatClient('Alice');
  const bob = useChatClient('Bob');
  const [visitorId] = useState(() => crypto.randomUUID());
  const [channelId, setChannelId] = useState('');
  const [starting, setStarting] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  async function startDemo() {
    setStarting(true);
    setError('');
    try {
      const result = await publicDemoApi.start(visitorId);
      setChannelId(result.channelId);
      setInviteUrl(`${window.location.origin}/demo?invite=${result.inviteCode}`);
      alice.connect(result.participants.alice);
      bob.connect(result.participants.bob);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not start the public demo.');
    } finally {
      setStarting(false);
    }
  }

  async function joinDemo() {
    if (!inviteCode) return;
    setStarting(true);
    setError('');
    try {
      const result = await publicDemoApi.join(inviteCode);
      setChannelId(result.channelId);
      bob.connect(result.session);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not join the demo channel.');
    } finally {
      setStarting(false);
    }
  }

  async function copyInvite() {
    if (!inviteUrl) return;
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2_000);
  }

  useEffect(() => {
    if (channelId && alice.status === 'connected' && alice.access.includes(channelId)) {
      alice.join(channelId);
    }
  }, [alice.status, alice.access, channelId]);
  useEffect(() => {
    if (channelId && bob.status === 'connected' && bob.access.includes(channelId)) {
      bob.join(channelId);
    }
  }, [bob.status, bob.access, channelId]);

  return (
    <div className="landing public-demo-page">
      <header className="site-nav shell">
        <Brand />
        <Link className="button ghost" to="/"><ArrowLeft size={15} /> Back to SafeFun</Link>
      </header>
      <main className="public-demo-shell shell">
        <div className="public-demo-heading">
          <div>
            <span className="kicker">{isGuest ? 'CHANNEL INVITATION' : 'LIVE PUBLIC DEMO'}</span>
            <h1>
              {isGuest
                ? 'You have been invited to a SafeFun demo channel.'
                : 'Two users. One private channel. Real SafeFun infrastructure.'}
            </h1>
            <p>{isGuest
              ? 'Join as Bob and chat live with the person who shared this invitation. The invite is temporary and restricted to this demo channel.'
              : 'Start two isolated sessions, invite someone with a private link, send messages over WSS and report them. No account or API key is required.'}
            </p>
          </div>
          <button
            className="button primary"
            disabled={starting || Boolean(channelId)}
            onClick={isGuest ? joinDemo : startDemo}
          >
            {isGuest ? <UserPlus size={16} /> : <Radio size={16} />}
            {starting
              ? 'Creating secure session...'
              : isGuest
                ? channelId ? 'Joined' : 'Join demo channel'
                : channelId ? 'Demo running' : 'Start live demo'}
          </button>
        </div>
        {error && <div className="form-message error">{error}</div>}
        {inviteUrl && !isGuest && (
          <div className="public-demo-invite">
            <span><Link2 size={16} /> Invite another person to this channel</span>
            <div>
              <input aria-label="Demo invitation link" readOnly value={inviteUrl} />
              <button className="button ghost" onClick={copyInvite}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied' : 'Copy invite link'}
              </button>
            </div>
            <small>Invitation expires after 60 minutes and allows up to five joins.</small>
          </div>
        )}
        <div className="public-demo-status">
          <span><ShieldCheck size={15} /> Real HTTPS and WebSocket endpoints</span>
          <span>Ephemeral channel: {channelId || 'created when the demo starts'}</span>
        </div>
        <LiveSafetyMonitor
          updates={alice.moderationUpdates.length > 0 ? alice.moderationUpdates : bob.moderationUpdates}
        />
        <div className={isGuest ? 'tester-grid public-demo-guest' : 'tester-grid'}>
          {!isGuest && <PublicClientPanel client={alice} peer={bob} channelId={channelId} />}
          <PublicClientPanel client={bob} peer={alice} channelId={channelId} />
        </div>
      </main>
    </div>
  );
}

const signalLabels: Record<string, string> = {
  off_platform: 'Off-platform move',
  secrecy: 'Secrecy',
  age_probing: 'Age probing',
  isolation_flattery: 'Isolation or flattery',
  gifts: 'Gifts',
  direct_threat: 'Direct threat',
  sexual_request: 'Sexual request',
  identity_hate: 'Identity hate',
  targeted_harassment: 'Targeted harassment'
};

function LiveSafetyMonitor({ updates }: { updates: ModerationUpdate[] }) {
  const latest = updates.at(-1);
  const latestAssessment = [...updates].reverse().find((update) => update.stage === 'assessed');
  const perMessage = [...updates.reduce((result, update) => {
    result.set(update.messageId, update);
    return result;
  }, new Map<string, ModerationUpdate>()).values()].slice(-12);
  const trustScore = latestAssessment?.scores?.trustBuilding ?? 0;
  const previousTrust = latestAssessment?.previousAverages?.trustBuilding ?? 0;
  const averageTrust = latestAssessment?.conversationAverages?.trustBuilding ?? 0;
  const displayedAction =
    latest?.stage === 'analyzing'
      ? 'analyzing'
      : (latestAssessment?.action ?? latest?.action ?? 'monitoring');
  const status = !latest
    ? 'Waiting for conversation'
    : latest.stage === 'analyzing'
      ? 'Gemini is reading the trajectory'
      : latest.stage === 'assessed'
        ? 'Context assessment complete'
        : latest.heuristicScore >= 5
          ? 'Escalation threshold reached'
          : 'Local signals monitored';

  return (
    <section className={`live-safety-monitor ${latest?.stage ?? 'idle'}`}>
      <header>
        <div>
          <span className="kicker"><Activity size={13} /> LIVE SAFETY ENGINE</span>
          <h2>Conversation risk over time</h2>
          <p>Every message is scored locally. Gemini reads the recent Redis context only when risk accumulates or an immediate danger signal appears.</p>
        </div>
        <span className="monitor-status"><i /> {status}</span>
      </header>
      <div className="monitor-grid">
        <article className="heuristic-meter">
          <div><span>LOCAL RISK ACCUMULATOR</span><strong>{latest?.heuristicScore ?? 0}<small>/10</small></strong></div>
          <div className="meter-track"><i style={{ width: `${Math.min((latest?.heuristicScore ?? 0) * 10, 100)}%` }} /></div>
          <small>Gemini threshold: 5</small>
        </article>
        <article className="context-score">
          <BrainCircuit />
          <div><span>TRUST-BUILDING RISK</span><strong>{Math.round(trustScore * 100)}%</strong></div>
          <small>{latestAssessment?.groomingStage ? latestAssessment.groomingStage.replaceAll('_', ' ') : 'No grooming stage detected'}</small>
        </article>
        <article className="average-score">
          <TrendingUp />
          <div><span>CONVERSATION AVERAGE</span><strong>{Math.round(averageTrust * 100)}%</strong></div>
          <small>Previous average {Math.round(previousTrust * 100)}% · {latestAssessment?.assessmentCount ?? 0} AI assessments</small>
        </article>
      </div>
      <div className="risk-timeline">
        <div className="timeline-heading">
          <span>MESSAGE TRAJECTORY</span>
          <small>{latest?.messageCount ?? 0} messages retained in the active 24h context</small>
        </div>
        <div className="timeline-bars">
          {perMessage.length === 0 ? (
            <div className="timeline-empty">Start the demo and send messages to see the risk trajectory.</div>
          ) : perMessage.map((update, index) => {
            const score = update.scores?.trustBuilding ?? update.heuristicScore / 10;
            return (
              <div className="timeline-point" key={update.messageId} title={`Message ${index + 1}: ${Math.round(score * 100)}%`}>
                <i style={{ height: `${Math.max(score * 100, 5)}%` }} />
                <small>{index + 1}</small>
              </div>
            );
          })}
        </div>
      </div>
      <footer>
        <div className="signal-list">
          {latest?.matchedSignals.length ? latest.matchedSignals.map((signal) => (
            <span key={signal}>{signalLabels[signal] ?? signal}</span>
          )) : <span className="quiet">No risk signals yet</span>}
        </div>
        <div className={`recommended-action ${displayedAction}`}>
          <Sparkles size={13} /> Action: {displayedAction.replaceAll('_', ' ')}
        </div>
      </footer>
      <p className="monitor-hint"><strong>Try a gradual trajectory:</strong> “How old are you?” → “Keep this between us.” → “Add me on Snapchat, do not tell your parents.”</p>
    </section>
  );
}

function PublicClientPanel({
  client,
  peer,
  channelId
}: {
  client: ChatTesterClient;
  peer: ChatTesterClient;
  channelId: string;
}) {
  const [text, setText] = useState('');
  const [showEvents, setShowEvents] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!channelId || !text.trim()) return;
    client.sendMessage(channelId, 'text', text.trim(), {});
    setText('');
  }

  return (
    <article className="client-panel public-client-panel">
      <header>
        <div className={client.label === 'Alice' ? 'avatar lime' : 'avatar violet'}>
          {client.label.slice(0, 2).toUpperCase()}
        </div>
        <div><strong>{client.label}</strong><small>{client.session?.userId ?? 'Waiting for session'}</small></div>
        <em className={client.status}><Circle size={7} fill="currentColor" /> {client.status}</em>
      </header>
      <div className="message-list">
        {!client.messages.length && (
          <div className="message-placeholder">
            <MessageSquareText />
            <p>{client.status === 'connected' ? 'Send the first message.' : 'Start the demo to connect this user.'}</p>
          </div>
        )}
        {client.messages.map((message) => (
          <div className={message.userId === client.session?.userId ? 'message own' : 'message'} key={message.messageId}>
            <div><strong>{message.senderName}</strong><time>{new Date(message.sentAt).toLocaleTimeString()}</time></div>
            <p>{message.text}</p>
            {message.userId !== client.session?.userId && (
              <button onClick={() => client.report(message.messageId)}><Flag size={12} /> Report</button>
            )}
          </div>
        ))}
      </div>
      <form className="composer public-composer" onSubmit={submit}>
        <div>
          <input
            disabled={client.status !== 'connected'}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={`Message as ${client.label}`}
          />
          <button disabled={client.status !== 'connected'} type="submit" aria-label={`Send as ${client.label}`}><Send size={16} /></button>
        </div>
      </form>
      <button className="event-toggle" onClick={() => setShowEvents(!showEvents)}><Radio size={13} /> Raw events ({client.events.length})</button>
      {showEvents && <pre className="event-log">{client.events.join('\n')}</pre>}
      <footer><span>access: {channelId && client.access.includes(channelId) ? 'granted' : 'none'}</span><span>peer: {peer.status}</span></footer>
    </article>
  );
}
