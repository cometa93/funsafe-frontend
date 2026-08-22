import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Activity,
  Boxes,
  Braces,
  Check,
  ChevronDown,
  Circle,
  Copy,
  FileText,
  Flag,
  FlaskConical,
  KeyRound,
  LogOut,
  MessageSquareText,
  Plus,
  Radio,
  Send,
  Settings,
  ShieldAlert,
  UserRound,
  UsersRound,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';
import {
  dashboardApi,
  type MessageTypeDefinition,
  type Product
} from '../lib/api';
import { useChatClient, type ChatTesterClient } from '../hooks/useChatClient';

type DashboardSection = 'overview' | 'tester' | 'directory' | 'keys' | 'types' | 'safety';

const navItems: { id: DashboardSection; label: string; icon: typeof Activity }[] = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'tester', label: 'Chat Tester', icon: FlaskConical },
  { id: 'directory', label: 'Users & channels', icon: UsersRound },
  { id: 'keys', label: 'API keys', icon: KeyRound },
  { id: 'types', label: 'Message types', icon: Braces },
  { id: 'safety', label: 'Safety cases', icon: ShieldAlert }
];

export function DashboardPage() {
  const [section, setSection] = useState<DashboardSection>('tester');
  const [selectedProductId, setSelectedProductId] = useState('');
  const queryClient = useQueryClient();
  useQuery({ queryKey: ['bootstrap'], queryFn: dashboardApi.bootstrap });
  const products = useQuery({ queryKey: ['products'], queryFn: dashboardApi.products });
  const createProduct = useMutation({
    mutationFn: ({ name, type }: { name: string; type: Product['type'] }) =>
      dashboardApi.createProduct(name, type),
    onSuccess: async (product) => {
      setSelectedProductId(product.id);
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
  useEffect(() => {
    if (!selectedProductId && products.data?.[0]) setSelectedProductId(products.data[0].id);
  }, [products.data, selectedProductId]);
  const selectedProduct = products.data?.find((product) => product.id === selectedProductId);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Brand compact />
        <div className="sidebar-product">
          <small>ACTIVE PRODUCT</small>
          {products.data?.length ? (
            <label>
              <Boxes size={17} />
              <select value={selectedProductId} onChange={(event) => setSelectedProductId(event.target.value)}>
                {products.data.map((product) => <option value={product.id} key={product.id}>{product.name}</option>)}
              </select>
              <ChevronDown size={15} />
            </label>
          ) : <span>No product yet</span>}
        </div>
        <nav>
          <small>WORKSPACE</small>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button className={section === id ? 'active' : ''} key={id} onClick={() => setSection(id)}>
              <Icon size={17} /> {label}
              {id === 'tester' && <em>LIVE</em>}
            </button>
          ))}
          <small>RESOURCES</small>
          <Link to="/docs"><FileText size={17} /> Documentation</Link>
          <button><Settings size={17} /> Settings</button>
        </nav>
        <div className="sidebar-user">
          <span>FD</span><div><strong>Founder demo</strong><small>Owner</small></div><LogOut size={16} />
        </div>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className="breadcrumb">SafeFun / {selectedProduct?.name ?? 'Workspace'}</span>
            <h1>{navItems.find((item) => item.id === section)?.label}</h1>
          </div>
          <div className="environment"><Circle size={8} fill="currentColor" /> Development</div>
        </header>
        {!selectedProduct ? (
          <CreateProductCard loading={createProduct.isPending} onCreate={(name, type) => createProduct.mutate({ name, type })} />
        ) : section === 'tester' ? (
          <ChatTester product={selectedProduct} />
        ) : section === 'keys' ? (
          <ApiKeys product={selectedProduct} />
        ) : section === 'types' ? (
          <MessageTypes product={selectedProduct} />
        ) : section === 'safety' ? (
          <SafetyCases product={selectedProduct} />
        ) : section === 'directory' ? (
          <Directory product={selectedProduct} />
        ) : (
          <Overview product={selectedProduct} onChanged={() => queryClient.invalidateQueries({ queryKey: ['products'] })} />
        )}
      </main>
    </div>
  );
}

function Directory({ product }: { product: Product }) {
  const queryClient = useQueryClient();
  const users = useQuery({ queryKey: ['users', product.id], queryFn: () => dashboardApi.users(product.id) });
  const channels = useQuery({ queryKey: ['channels', product.id], queryFn: () => dashboardApi.channels(product.id) });
  const sessions = useQuery({ queryKey: ['sessions', product.id], queryFn: () => dashboardApi.sessions(product.id) });
  const revoke = useMutation({
    mutationFn: (sessionId: string) => dashboardApi.revokeSession(product.id, sessionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sessions', product.id] })
  });
  return (
    <section className="dashboard-content">
      <div className="panel-heading"><div><span className="kicker">PRODUCT-SCOPED IDENTITY</span><h2>Users, channels and active sessions</h2><p>Only hashed external identifiers are stored. Every session is independently revocable.</p></div></div>
      <div className="directory-grid">
        <article><UsersRound /><small>USERS</small><strong>{users.data?.length ?? 0}</strong>{users.data?.slice(0, 4).map((user) => <span key={user.id}>{user.senderName}<code>{user.id.slice(0, 8)}</code></span>)}</article>
        <article><MessageSquareText /><small>PRIVATE CHANNELS</small><strong>{channels.data?.length ?? 0}</strong>{channels.data?.slice(0, 4).map((channel) => <span key={channel.id}>#{channel.id}<code>{channel.name ?? 'Unnamed'}</code></span>)}</article>
        <article><Radio /><small>ACTIVE SESSIONS</small><strong>{sessions.data?.length ?? 0}</strong>{sessions.data?.slice(0, 4).map((session) => <span key={session.id}>{session.id.slice(0, 12)}<button onClick={() => revoke.mutate(session.id)}>Revoke</button></span>)}</article>
      </div>
    </section>
  );
}

function CreateProductCard({ loading, onCreate }: { loading: boolean; onCreate: (name: string, type: Product['type']) => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState<Product['type']>('game');
  return (
    <section className="empty-state">
      <span><Boxes size={28} /></span>
      <h2>Create your first product</h2>
      <p>A product scopes users, keys, channels and all safety history.</p>
      <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Product name" />
      <select value={type} onChange={(event) => setType(event.target.value as Product['type'])}>
        <option value="game">Game</option><option value="application">Application</option>
        <option value="website">Website</option><option value="platform">Platform</option><option value="other">Other</option>
      </select>
      <button disabled={loading || name.length < 2} className="button primary" onClick={() => onCreate(name, type)}>
        <Plus size={16} /> Create product
      </button>
    </section>
  );
}

function Overview({ product, onChanged }: { product: Product; onChanged: () => void }) {
  const toggle = useMutation({
    mutationFn: () => dashboardApi.setChat(product.id, !product.chatEnabled),
    onSuccess: onChanged
  });
  return (
    <section className="dashboard-content">
      <div className="metric-grid">
        <article><span><MessageSquareText /></span><small>CHAT FEATURE</small><strong>{product.chatEnabled ? 'Enabled' : 'Disabled'}</strong><em className={product.chatEnabled ? 'positive' : ''}>{product.chatEnabled ? 'Ready for sessions' : 'Enable to begin'}</em></article>
        <article><span><UsersRound /></span><small>IDENTITY SCOPE</small><strong>Product</strong><em>Raw IDs are never stored</em></article>
        <article><span><Flag /></span><small>EVIDENCE WINDOW</small><strong>24 hours</strong><em>90 days when preserved</em></article>
      </div>
      <div className="settings-card">
        <div><h2>Chat feature</h2><p>Disabling Chat immediately revokes active product sessions.</p></div>
        <button className={product.chatEnabled ? 'toggle on' : 'toggle'} onClick={() => toggle.mutate()} aria-label="Toggle Chat"><i /></button>
      </div>
    </section>
  );
}

function ApiKeys({ product }: { product: Product }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState('Game backend');
  const [secret, setSecret] = useState('');
  const keys = useQuery({ queryKey: ['keys', product.id], queryFn: () => dashboardApi.apiKeys(product.id) });
  const create = useMutation({
    mutationFn: () => dashboardApi.createApiKey(product.id, name),
    onSuccess: async (result) => {
      setSecret(result.secret);
      await queryClient.invalidateQueries({ queryKey: ['keys', product.id] });
    }
  });
  return (
    <section className="dashboard-content narrow">
      <div className="panel-heading"><div><span className="kicker">SERVER CREDENTIALS</span><h2>API keys</h2><p>Keys identify traffic for this product and must only be used by your backend.</p></div></div>
      {secret && <div className="secret-reveal"><ShieldAlert /><div><strong>Copy this secret now</strong><code>{secret}</code><small>It will never be shown again.</small></div><button onClick={() => navigator.clipboard.writeText(secret)}><Copy size={16} /></button><button onClick={() => setSecret('')}><X size={16} /></button></div>}
      <div className="inline-form"><input value={name} onChange={(event) => setName(event.target.value)} /><button className="button primary" onClick={() => create.mutate()}><Plus size={16} /> Generate key</button></div>
      <div className="table-card">
        <div className="table-row head"><span>Name</span><span>Public ID</span><span>Scopes</span><span>Status</span></div>
        {keys.data?.map((key) => <div className="table-row" key={key.id}><strong>{key.name}</strong><code>{key.publicId}</code><span>{key.scopes.length} scopes</span><em className={key.revokedAt ? '' : 'positive'}>{key.revokedAt ? 'Revoked' : 'Active'}</em></div>)}
      </div>
    </section>
  );
}

function MessageTypes({ product }: { product: Product }) {
  const queryClient = useQueryClient();
  const [messageType, setMessageType] = useState('game.item');
  const [displayName, setDisplayName] = useState('Shared item');
  const types = useQuery({ queryKey: ['types', product.id], queryFn: () => dashboardApi.messageTypes(product.id) });
  const save = useMutation({
    mutationFn: () => dashboardApi.saveMessageType(product.id, messageType, displayName),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['types', product.id] })
  });
  return (
    <section className="dashboard-content narrow">
      <div className="panel-heading"><div><span className="kicker">OPEN MESSAGE MODEL</span><h2>Message types</h2><p>Allow the message kinds your application knows how to display.</p></div></div>
      <div className="inline-form three"><input value={messageType} onChange={(event) => setMessageType(event.target.value)} placeholder="game.item" /><input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Shared item" /><button className="button primary" onClick={() => save.mutate()}><Plus size={16} /> Add type</button></div>
      <div className="type-grid">
        {types.data?.map((type: MessageTypeDefinition) => <article key={type.messageType}><Braces /><div><code>{type.messageType}</code><strong>{type.displayName}</strong></div><em className={type.enabled ? 'positive' : ''}>{type.enabled ? 'Enabled' : 'Disabled'}</em></article>)}
      </div>
    </section>
  );
}

function SafetyCases({ product }: { product: Product }) {
  const cases = useQuery({ queryKey: ['safety', product.id], queryFn: () => dashboardApi.safetyCases(product.id) });
  return (
    <section className="dashboard-content narrow">
      <div className="panel-heading"><div><span className="kicker">PRESERVED CONTEXT</span><h2>Safety cases</h2><p>Hate, harassment and immediately harmful content are scored independently. Trust-building risk uses the previous conversation average. Evidence remains encrypted at rest.</p></div></div>
      {!cases.data?.length ? <div className="empty-list"><ShieldAlert /><h3>No safety cases</h3><p>User reports and automated moderation cases will appear here.</p></div> :
        <div className="case-list">{cases.data.map((item, index) => (
          <article className={`moderation-case ${item.severity}`} key={item.id}>
            <header>
              <span>SF-{String(index + 1).padStart(4, '0')}</span>
              <strong>{item.category.replaceAll('_', ' ')}</strong>
              <small>{item.source === 'automated' ? 'AI moderation' : 'User report'}</small>
              <em>{item.severity}</em>
            </header>
            <h3>{item.reason}</h3>
            {item.moderation && <>
              <div className="case-score-grid">
                <span><small>HATE</small><strong>{Math.round(item.moderation.scores.hate * 100)}%</strong></span>
                <span><small>HARASSMENT</small><strong>{Math.round(item.moderation.scores.harassment * 100)}%</strong></span>
                <span><small>NO CONTEXT</small><strong>{Math.round(item.moderation.scores.contextFree * 100)}%</strong></span>
                <span><small>TRUST BUILDING</small><strong>{Math.round(item.moderation.scores.trustBuilding * 100)}%</strong></span>
              </div>
              <p>Previous trust average: <strong>{Math.round(item.moderation.previousAverages.trustBuilding * 100)}%</strong> · Conversation average: <strong>{Math.round(item.moderation.conversationAverages.trustBuilding * 100)}%</strong> · {item.moderation.sampleCount} scored messages</p>
            </>}
            <footer><code>{item.messageId}</code><span>{new Date(item.createdAt).toLocaleString()}</span></footer>
          </article>
        ))}</div>}
    </section>
  );
}

function ChatTester({ product }: { product: Product }) {
  const alice = useChatClient('Alice');
  const bob = useChatClient('Bob');
  const [channelId, setChannelId] = useState('global');
  const [setupError, setSetupError] = useState('');
  const [preparing, setPreparing] = useState(false);
  const canRun = product.chatEnabled;

  async function prepare() {
    setSetupError('');
    setPreparing(true);
    try {
      try { await dashboardApi.createTestChannel(product.id, channelId); } catch (error) {
        if (!(error instanceof Error) || !error.message.includes('already exists')) throw error;
      }
      const [aliceSession, bobSession] = await Promise.all([
        dashboardApi.createTestSession(product.id, 'tester-alice', 'Alice'),
        dashboardApi.createTestSession(product.id, 'tester-bob', 'Bob')
      ]);
      await Promise.all([
        dashboardApi.setTestMembership(product.id, channelId, 'tester-alice', true),
        dashboardApi.setTestMembership(product.id, channelId, 'tester-bob', true)
      ]);
      alice.connect(aliceSession);
      bob.connect(bobSession);
    } catch (error) {
      setSetupError(error instanceof Error ? error.message : 'Could not prepare Chat Tester.');
    } finally {
      setPreparing(false);
    }
  }

  useEffect(() => {
    if (alice.status === 'connected' && alice.access.includes(channelId)) alice.join(channelId);
  }, [alice.status, alice.access, channelId]);
  useEffect(() => {
    if (bob.status === 'connected' && bob.access.includes(channelId)) bob.join(channelId);
  }, [bob.status, bob.access, channelId]);

  return (
    <section className="tester">
      <div className="tester-toolbar">
        <div><span className="kicker">REAL PROTOCOL · TWO SESSIONS</span><p>Test identity, live access, custom metadata and reporting.</p></div>
        <label># <input value={channelId} onChange={(event) => setChannelId(event.target.value)} /></label>
        {!canRun ? <button className="button primary" onClick={() => dashboardApi.setChat(product.id, true).then(() => window.location.reload())}>Enable Chat</button> :
          <button className="button primary" disabled={preparing} onClick={prepare}><Radio size={16} /> {preparing ? 'Preparing…' : 'Start both clients'}</button>}
      </div>
      {setupError && <div className="form-message error">{setupError}</div>}
      <div className="tester-grid">
        <ClientPanel client={alice} product={product} channelId={channelId} externalUserId="tester-alice" peer={bob} />
        <ClientPanel client={bob} product={product} channelId={channelId} externalUserId="tester-bob" peer={alice} />
      </div>
    </section>
  );
}

function ClientPanel({ client, product, channelId, externalUserId, peer }: { client: ChatTesterClient; product: Product; channelId: string; externalUserId: string; peer: ChatTesterClient }) {
  const [text, setText] = useState('');
  const [senderName, setSenderName] = useState(client.label);
  const [messageType, setMessageType] = useState('text');
  const [metadata, setMetadata] = useState('{"itemId":"sword-42","rarity":"legendary"}');
  const [showEvents, setShowEvents] = useState(false);
  const types = useQuery({ queryKey: ['types', product.id], queryFn: () => dashboardApi.messageTypes(product.id) });
  const parsedMetadata = useMemo(() => {
    try {
      const value = JSON.parse(metadata) as unknown;
      if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, String(item)]));
    } catch { return null; }
  }, [metadata]);
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!parsedMetadata && messageType !== 'text') return;
    client.sendMessage(channelId, messageType, text, messageType === 'text' ? {} : parsedMetadata ?? {});
    setText('');
  }
  return (
    <article className="client-panel">
      <header>
        <div className="avatar lime">{senderName.slice(0, 2).toUpperCase()}</div>
        <div><strong>{senderName}</strong><small>{client.session?.userId ?? 'No session'}</small></div>
        <em className={client.status}><Circle size={7} fill="currentColor" /> {client.status}</em>
      </header>
      <div className="client-controls">
        <label>Display name<input value={senderName} onChange={(event) => setSenderName(event.target.value)} /></label>
        <button onClick={() => dashboardApi.updateTestName(product.id, externalUserId, senderName)}>Update</button>
        <button className="danger-soft" onClick={() => dashboardApi.setTestMembership(product.id, channelId, externalUserId, !client.access.includes(channelId))}>{client.access.includes(channelId) ? 'Revoke channel' : 'Grant channel'}</button>
      </div>
      <div className="message-list">
        {!client.messages.length && <div className="message-placeholder"><MessageSquareText /><p>Messages will appear here after both clients join.</p></div>}
        {client.messages.map((message) => (
          <div className={message.userId === client.session?.userId ? 'message own' : 'message'} key={message.messageId}>
            <div><strong>{message.senderName}</strong><time>{new Date(message.sentAt).toLocaleTimeString()}</time></div>
            {message.messageType !== 'text' && <code>{message.messageType}</code>}
            <p>{message.text || 'Custom message'}</p>
            {Object.keys(message.additionalData).length > 0 && <pre>{JSON.stringify(message.additionalData, null, 2)}</pre>}
            {message.userId !== client.session?.userId && <button onClick={() => client.report(message.messageId)}><Flag size={12} /> Report</button>}
          </div>
        ))}
      </div>
      <form className="composer" onSubmit={submit}>
        <div>
          <select value={messageType} onChange={(event) => setMessageType(event.target.value)}>
            {(types.data ?? [{ messageType: 'text', enabled: true }]).filter((type) => type.enabled).map((type) => <option key={type.messageType} value={type.messageType}>{type.messageType}</option>)}
          </select>
          {messageType !== 'text' && <input className={parsedMetadata ? '' : 'invalid'} value={metadata} onChange={(event) => setMetadata(event.target.value)} aria-label="Additional data JSON" />}
        </div>
        <div><input value={text} onChange={(event) => setText(event.target.value)} placeholder={messageType === 'text' ? 'Write a message…' : 'Fallback text (optional)'} /><button type="submit"><Send size={16} /></button></div>
      </form>
      <button className="event-toggle" onClick={() => setShowEvents(!showEvents)}><Radio size={13} /> Raw events ({client.events.length})</button>
      {showEvents && <pre className="event-log">{client.events.join('\n')}</pre>}
      <footer><span><Check /> access: {client.access.includes(channelId) ? 'granted' : 'none'}</span><span>peer: {peer.status}</span></footer>
    </article>
  );
}
