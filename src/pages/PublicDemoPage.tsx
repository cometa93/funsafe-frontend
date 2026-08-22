import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, Circle, Flag, MessageSquareText, Radio, Send, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { useChatClient, type ChatTesterClient } from '../hooks/useChatClient';
import { publicDemoApi } from '../lib/api';

export function PublicDemoPage() {
  const alice = useChatClient('Alice');
  const bob = useChatClient('Bob');
  const [visitorId] = useState(() => crypto.randomUUID());
  const [channelId, setChannelId] = useState('');
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState('');

  async function startDemo() {
    setStarting(true);
    setError('');
    try {
      const result = await publicDemoApi.start(visitorId);
      setChannelId(result.channelId);
      alice.connect(result.participants.alice);
      bob.connect(result.participants.bob);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not start the public demo.');
    } finally {
      setStarting(false);
    }
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
            <span className="kicker">LIVE PUBLIC DEMO</span>
            <h1>Two users. One private channel. Real SafeFun infrastructure.</h1>
            <p>
              Start two isolated sessions, send a message over WSS and report it from the other
              user. No account or API key is required for this controlled demo.
            </p>
          </div>
          <button className="button primary" disabled={starting} onClick={startDemo}>
            <Radio size={16} /> {starting ? 'Starting secure sessions...' : 'Start live demo'}
          </button>
        </div>
        {error && <div className="form-message error">{error}</div>}
        <div className="public-demo-status">
          <span><ShieldCheck size={15} /> Real HTTPS and WebSocket endpoints</span>
          <span>Ephemeral channel: {channelId || 'created when the demo starts'}</span>
        </div>
        <div className="tester-grid">
          <PublicClientPanel client={alice} peer={bob} channelId={channelId} />
          <PublicClientPanel client={bob} peer={alice} channelId={channelId} />
        </div>
      </main>
    </div>
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
