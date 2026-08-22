import { ArrowLeft, ArrowRight, Braces, KeyRound, MessageSquareText, Radio, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '../components/Brand';

const packets = [
  ['AUTH', 'Authenticate the connection with a short-lived user token.'],
  ['JOIN_CHANNEL', 'Subscribe after the backend granted access.'],
  ['CHAT_SEND', 'Send text or an allowlisted custom message.'],
  ['REPORT_MESSAGE', 'Report a visible message with a reason and comment.']
];

const sessionExample = [
  'POST /api/v1/sessions',
  'Authorization: Bearer sfk_live_••••',
  'Idempotency-Key: 0198f3d7-...',
  '',
  '{',
  '  "externalUserId": "user-4821",',
  '  "senderName": "RuneKeeper"',
  '}'
].join('\n');

const unityExample = [
  'var chat = new SafeFunChatClient(config, tokenProvider);',
  'await chat.ConnectAsync();',
  'await chat.JoinChannelAsync("guild:moonforge");',
  'await chat.SendMessageAsync(',
  '    "guild:moonforge",',
  '    "game.item",',
  '    "Shared an item",',
  '    new Dictionary<string, string> {',
  '        ["itemId"] = "sword-42"',
  '    });'
].join('\n');

export function DocsPage() {
  return (
    <div className="docs-page">
      <header className="docs-header"><Brand /><div><Link to="/dashboard">Console</Link><a href="/contracts/openapi.json">OpenAPI</a><a href="/contracts/asyncapi.json">AsyncAPI</a></div></header>
      <aside className="docs-nav">
        <Link to="/"><ArrowLeft size={14} /> SafeFun overview</Link>
        <small>GET STARTED</small><a href="#architecture">Architecture</a><a href="#session">Create a session</a><a href="#websocket">Realtime protocol</a>
        <small>UNITY SDK</small><a href="#unity">Installation</a><a href="#custom-views">Custom views</a>
        <small>SAFETY</small><a href="#reports">Reports & evidence</a>
      </aside>
      <main className="docs-content">
        <div className="docs-intro"><span className="kicker">SAFEFUN CHAT API · V1</span><h1>From your user ID to a safer realtime conversation.</h1><p>Use the Partner API only from your backend. Give the returned short-lived token to your application or Unity client.</p></div>
        <section id="architecture"><h2>Architecture</h2><div className="docs-steps"><article><KeyRound /><b>1</b><strong>Your backend</strong><p>API key + external user ID</p></article><ArrowRight /><article><ShieldCheck /><b>2</b><strong>SafeFun API</strong><p>Stable user ID + session token</p></article><ArrowRight /><article><Radio /><b>3</b><strong>Client SDK</strong><p>Authenticated WebSocket</p></article></div></section>
        <section id="session"><h2>Create a session</h2><p>Every call starts a new session. Reusing the same idempotency key safely returns the original result.</p><div className="docs-code"><header><span>HTTP</span><button>Copy</button></header><pre>{sessionExample}</pre></div></section>
        <section id="websocket"><h2>Realtime protocol</h2><p>Connect to <code>wss://chat.safe.funventure.eu/chat/v1?format=json</code>. JSON and MessagePack have identical semantics.</p><div className="packet-list">{packets.map(([name, copy]) => <article key={name}><Braces /><code>{name}</code><p>{copy}</p></article>)}</div></section>
        <section id="unity"><h2>Unity 6000+</h2><p>Install the embedded UPM package and provide a callback that asks your own backend for a SafeFun token.</p><div className="docs-code"><header><span>C#</span></header><pre>{unityExample}</pre></div></section>
        <section id="custom-views"><h2>Custom message views</h2><p>Register a prefab by <code>messageType</code>. The prefab implements <code>IChatMessageView</code>; no SDK switch statement needs changing.</p></section>
        <section id="reports"><h2>Reports and preserved evidence</h2><p>A valid report preserves the reported message and the author’s available 24-hour context for 90 days. Evidence content is encrypted at rest and the reporter is hidden from the reported user.</p></section>
      </main>
      <aside className="docs-toc"><small>ON THIS PAGE</small><a href="#architecture">Architecture</a><a href="#session">Create a session</a><a href="#websocket">Realtime protocol</a><a href="#unity">Unity</a><a href="#reports">Reports</a><div><MessageSquareText /><strong>Need to see it live?</strong><Link to="/dashboard">Open Chat Tester</Link></div></aside>
    </div>
  );
}
