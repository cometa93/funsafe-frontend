export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
export const CHAT_URL = import.meta.env.VITE_CHAT_URL ?? 'ws://localhost:3001/chat/v1';
export const DEMO_MODE = (import.meta.env.VITE_DEMO_MODE ?? 'true') === 'true';

const demoHeaders: Record<string, string> = DEMO_MODE
  ? {
      'x-safefun-owner-id': 'local-demo-owner',
      'x-safefun-owner-email': 'founder@safefun.dev'
    }
  : {};

export interface Product {
  id: string;
  organizationId: string;
  name: string;
  type: 'game' | 'application' | 'website' | 'platform' | 'other';
  chatEnabled: boolean;
  createdAt: string;
}

export interface ApiKeySummary {
  id: string;
  productId: string;
  publicId: string;
  name: string;
  scopes: string[];
  createdAt: string;
  revokedAt: string | null;
}

export interface MessageTypeDefinition {
  productId: string;
  messageType: string;
  displayName: string;
  enabled: boolean;
}

export interface SessionResult {
  userId: string;
  sessionId: string;
  accessToken: string;
  tokenExpiresAt: string;
  sessionExpiresAt: string;
}

export interface PublicDemoResult {
  channelId: string;
  inviteCode: string;
  inviteExpiresAt: string;
  participants: {
    alice: SessionResult;
    bob: SessionResult;
  };
}

export interface PublicDemoJoinResult {
  channelId: string;
  session: SessionResult;
}

export interface ChatMessage {
  messageId: string;
  clientMessageId: string;
  channelId: string;
  messageType: string;
  text: string;
  additionalData: Record<string, string>;
  userId: string;
  senderName: string;
  sentAt: string;
}

export interface EndUserSummary {
  id: string;
  senderName: string;
  profileVersion: number;
  updatedAt: string;
}

export interface ChannelSummary {
  id: string;
  name: string | null;
  createdAt: string;
}

export interface ActiveSessionSummary {
  id: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface ModerationScores {
  hate: number;
  harassment: number;
  contextFree: number;
  trustBuilding: number;
}

export type GroomingStage =
  | 'rapport_building'
  | 'isolation_secrecy'
  | 'off_platform_migration'
  | 'boundary_testing'
  | 'coercion';

export interface ModerationUpdate {
  messageId: string;
  productId: string;
  channelId: string;
  userId: string;
  stage: 'monitoring' | 'analyzing' | 'assessed';
  heuristicScore: number;
  matchedSignals: string[];
  scores: ModerationScores | null;
  previousAverages: ModerationScores | null;
  conversationAverages: ModerationScores | null;
  messageCount: number;
  assessmentCount: number;
  groomingStage: GroomingStage | null;
  action: 'monitoring' | 'analyzing' | 'allow' | 'alert_moderator' | 'immediate_suspend';
  updatedAt: string;
}

export interface SafetyCaseSummary {
  id: string;
  productId: string;
  messageId: string;
  reportedUserId: string;
  reason: string;
  category: 'user_report' | 'hate' | 'harassment' | 'context_free' | 'grooming_context';
  source: 'user_report' | 'automated';
  severity: 'medium' | 'high' | 'critical';
  moderation: {
    scores: ModerationScores;
    previousAverages: ModerationScores;
    conversationAverages: ModerationScores;
    sampleCount: number;
    model: string;
    groomingStage: GroomingStage | null;
    recommendedAction: 'allow' | 'alert_moderator' | 'immediate_suspend';
  } | null;
  createdAt: string;
  expiresAt: string;
  status: 'open' | 'closed';
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body !== undefined) headers.set('content-type', 'application/json');
  for (const [key, value] of Object.entries(demoHeaders)) headers.set(key, value);
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers
  });
  const payload = (await response.json()) as { data?: T; error?: { message: string } };
  if (!response.ok) throw new Error(payload.error?.message ?? 'SafeFun request failed.');
  return payload.data as T;
}

export const dashboardApi = {
  bootstrap: () => api('/api/v1/dashboard/bootstrap', { method: 'POST' }),
  products: () => api<Product[]>('/api/v1/dashboard/products'),
  createProduct: (name: string, type: Product['type']) =>
    api<Product>('/api/v1/dashboard/products', {
      method: 'POST',
      body: JSON.stringify({ name, type })
    }),
  setChat: (productId: string, enabled: boolean) =>
    api<Product>(`/api/v1/dashboard/products/${productId}/features/chat`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled })
    }),
  apiKeys: (productId: string) =>
    api<ApiKeySummary[]>(`/api/v1/dashboard/products/${productId}/api-keys`),
  createApiKey: (productId: string, name: string) =>
    api<{ apiKey: ApiKeySummary; secret: string }>(
      `/api/v1/dashboard/products/${productId}/api-keys`,
      { method: 'POST', body: JSON.stringify({ name }) }
    ),
  messageTypes: (productId: string) =>
    api<MessageTypeDefinition[]>(`/api/v1/dashboard/products/${productId}/message-types`),
  saveMessageType: (
    productId: string,
    messageType: string,
    displayName: string,
    enabled = true
  ) =>
    api<MessageTypeDefinition>(
      `/api/v1/dashboard/products/${productId}/message-types/${messageType}`,
      { method: 'PUT', body: JSON.stringify({ displayName, enabled }) }
    ),
  createTestSession: (
    productId: string,
    externalUserId: string,
    senderName: string
  ) =>
    api<SessionResult>(`/api/v1/dashboard/products/${productId}/test-sessions`, {
      method: 'POST',
      body: JSON.stringify({ externalUserId, senderName, idempotencyKey: crypto.randomUUID() })
    }),
  createTestChannel: (productId: string, channelId: string) =>
    api(`/api/v1/dashboard/products/${productId}/test-channels`, {
      method: 'POST',
      body: JSON.stringify({ channelId, name: 'Chat Tester channel' })
    }),
  setTestMembership: (
    productId: string,
    channelId: string,
    externalUserId: string,
    granted: boolean
  ) =>
    api(
      `/api/v1/dashboard/products/${productId}/test-channels/${encodeURIComponent(channelId)}/members/${encodeURIComponent(externalUserId)}`,
      { method: granted ? 'PUT' : 'DELETE' }
    ),
  updateTestName: (
    productId: string,
    externalUserId: string,
    senderName: string
  ) =>
    api(
      `/api/v1/dashboard/products/${productId}/test-users/${encodeURIComponent(externalUserId)}`,
      { method: 'PATCH', body: JSON.stringify({ senderName }) }
    ),
  safetyCases: (productId: string) =>
    api<SafetyCaseSummary[]>(
      `/api/v1/dashboard/products/${productId}/safety-cases`
    ),
  users: (productId: string) =>
    api<EndUserSummary[]>(`/api/v1/dashboard/products/${productId}/users`),
  channels: (productId: string) =>
    api<ChannelSummary[]>(`/api/v1/dashboard/products/${productId}/channels`),
  sessions: (productId: string) =>
    api<ActiveSessionSummary[]>(`/api/v1/dashboard/products/${productId}/sessions`),
  revokeSession: (productId: string, sessionId: string) =>
    api(`/api/v1/dashboard/products/${productId}/sessions/${sessionId}`, { method: 'DELETE' })
};

export const publicDemoApi = {
  start: (visitorId: string) =>
    api<PublicDemoResult>('/api/v1/demo/chat', {
      method: 'POST',
      body: JSON.stringify({ visitorId })
    }),
  join: (inviteCode: string) =>
    api<PublicDemoJoinResult>('/api/v1/demo/chat/join', {
      method: 'POST',
      body: JSON.stringify({ inviteCode })
    })
};
