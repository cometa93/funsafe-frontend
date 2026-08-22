import { Radio, Scale, ShieldAlert, UserRoundCheck, type LucideIcon } from 'lucide-react';

export interface NewsItem {
  source: string;
  date: string;
  label: string;
  title: string;
  summary: string;
  href: string;
  readMore: string;
  external?: boolean;
  icon: LucideIcon;
  response?: string;
}

export const safeFunUpdates: NewsItem[] = [
  {
    source: 'SafeFun',
    date: '22 Aug 2026',
    label: 'PRODUCT UPDATE',
    icon: Radio,
    title: 'SafeFun Chat MVP is live',
    summary:
      'The first release combines product-scoped users, private channels, realtime access changes, custom message metadata and safety reporting in one working tester.',
    href: '/dashboard',
    readMore: 'Open the Chat Tester'
  },
  {
    source: 'SafeFun',
    date: '22 Aug 2026',
    label: 'INFRASTRUCTURE',
    icon: ShieldAlert,
    title: 'Public REST and realtime endpoints are online',
    summary:
      'The production API, PostgreSQL, Redis and secure WebSocket gateway are online with published OpenAPI and AsyncAPI contracts.',
    href: '/docs',
    readMore: 'Read the API docs'
  },
  {
    source: 'SafeFun',
    date: '22 Aug 2026',
    label: 'UNITY SDK',
    icon: UserRoundCheck,
    title: 'Unity 6000+ SDK enters integration testing',
    summary:
      'The cross-platform package includes the chat client, WebSocket transport, optional uGUI views and a registry for product-specific message renderers.',
    href: '/docs#unity',
    readMore: 'Explore the Unity integration'
  }
];

export const safetySignals: NewsItem[] = [
  {
    source: 'The Conversation',
    date: '20 Aug 2026',
    label: 'REGULATORY ACTION',
    icon: ShieldAlert,
    title: 'Unknown adults could still reach child accounts',
    summary:
      'Australia\'s eSafety regulator required stronger contact controls, private-by-default child accounts, clearer reporting outcomes and independent safety audits.',
    response:
      'Product-scoped identity, private channels and server-authoritative grants make access an explicit decision that can be revoked in realtime.',
    href: 'https://theconversation.com/roblox-has-been-put-on-notice-yet-again-over-child-safety-concerns-what-do-parents-need-to-know-290148',
    readMore: 'Read at The Conversation',
    external: true
  },
  {
    source: 'BBC News',
    date: '26 Mar 2026',
    label: 'INDUSTRY WARNING',
    icon: UserRoundCheck,
    title: 'Safety tools still leave parents carrying the load',
    summary:
      'An independent developer told the BBC that existing controls and age checks did not go far enough, while Roblox described its safeguards and behavior monitoring.',
    response:
      'A stable user identity connects sessions, messages, name changes and access events so product teams can investigate behavior instead of isolated accounts.',
    href: 'https://www.bbc.com/news/articles/c78l92e9192o',
    readMore: 'Read at BBC News',
    external: true
  },
  {
    source: 'The Guardian',
    date: '14 Apr 2025',
    label: 'INDEPENDENT RESEARCH',
    icon: Radio,
    title: 'Simple filters can miss context and coded behavior',
    summary:
      'Researchers reported that young test accounts could interact with adults, encounter suggestive environments and receive attempts to move conversations off-platform.',
    response:
      'Review-ready context and specialized models are designed to examine behavior across messages, sessions and reports, not just one blocked phrase.',
    href: 'https://www.theguardian.com/technology/2025/apr/14/risks-children-roblox-deeply-disturbing-researchers',
    readMore: 'Read at The Guardian',
    external: true
  },
  {
    source: 'Singleton Schreiber',
    date: 'LITIGATION OVERVIEW',
    label: 'LEGAL CLAIMS',
    icon: Scale,
    title: 'Reports need evidence and an accountable response',
    summary:
      'A law firm representing families summarizes allegations involving grooming, adult-minor messaging, moderation gaps and accounts remaining active after reports.',
    response:
      'Encrypted evidence preservation, author history and audited case actions help safety teams retain the context needed for review and escalation.',
    href: 'https://www.singletonschreiber.com/practices/sexual-assault/roblox-child-sexual-abuse-lawsuit',
    readMore: 'Read at Singleton Schreiber',
    external: true
  }
];
