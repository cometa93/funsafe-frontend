import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CHAT_URL,
  type ChatMessage,
  type ModerationUpdate,
  type SessionResult
} from '../lib/api';

interface WirePacket {
  v: number;
  op: string;
  [key: string]: unknown;
}

function isWirePacket(value: unknown): value is WirePacket {
  return typeof value === 'object' && value !== null && 'op' in value;
}

export function useChatClient(label: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<'offline' | 'connecting' | 'connected'>('offline');
  const [session, setSession] = useState<SessionResult | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [access, setAccess] = useState<string[]>([]);
  const [moderationUpdates, setModerationUpdates] = useState<ModerationUpdate[]>([]);

  const log = useCallback((direction: 'in' | 'out', packet: unknown) => {
    setEvents((current) => [
      `${new Date().toLocaleTimeString()} ${direction === 'in' ? '←' : '→'} ${JSON.stringify(packet)}`,
      ...current
    ].slice(0, 80));
  }, []);

  const send = useCallback((packet: Record<string, unknown>) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) return false;
    const payload = { v: 1, ...packet };
    socketRef.current.send(JSON.stringify(payload));
    log('out', payload);
    return true;
  }, [log]);

  const connect = useCallback((nextSession: SessionResult) => {
    socketRef.current?.close();
    setSession(nextSession);
    setMessages([]);
    setEvents([]);
    setModerationUpdates([]);
    setStatus('connecting');
    const socket = new WebSocket(`${CHAT_URL}?format=json`);
    socketRef.current = socket;
    socket.addEventListener('open', () => {
      setStatus('connected');
      const packet = { v: 1, op: 'AUTH', accessToken: nextSession.accessToken };
      socket.send(JSON.stringify(packet));
      log('out', packet);
    });
    socket.addEventListener('message', (event) => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(String(event.data)) as unknown;
      } catch {
        return;
      }
      log('in', parsed);
      if (!isWirePacket(parsed)) return;
      if (parsed.op === 'CHANNEL_ACCESS_SNAPSHOT' && Array.isArray(parsed.channelIds)) {
        setAccess(parsed.channelIds.filter((value): value is string => typeof value === 'string'));
      } else if (parsed.op === 'CHANNEL_ACCESS_GRANTED' && typeof parsed.channelId === 'string') {
        setAccess((current) => [...new Set([...current, parsed.channelId as string])]);
      } else if (parsed.op === 'CHANNEL_ACCESS_REVOKED' && typeof parsed.channelId === 'string') {
        setAccess((current) => current.filter((id) => id !== parsed.channelId));
      } else if (parsed.op === 'CHAT_HISTORY' && Array.isArray(parsed.messages)) {
        setMessages(parsed.messages as ChatMessage[]);
      } else if (parsed.op === 'CHAT_MESSAGE' && parsed.message) {
        const message = parsed.message as ChatMessage;
        setMessages((current) =>
          current.some((item) => item.messageId === message.messageId)
            ? current
            : [...current, message]
        );
      } else if (
        parsed.op === 'MODERATION_UPDATE' &&
        typeof parsed.messageId === 'string' &&
        typeof parsed.userId === 'string' &&
        typeof parsed.heuristicScore === 'number' &&
        (parsed.stage === 'monitoring' ||
          parsed.stage === 'analyzing' ||
          parsed.stage === 'assessed')
      ) {
        setModerationUpdates((current) => [
          ...current,
          parsed as unknown as ModerationUpdate
        ].slice(-60));
      } else if (parsed.op === 'SESSION_REVOKED') {
        socket.close();
      }
    });
    socket.addEventListener('close', () => setStatus('offline'));
    socket.addEventListener('error', () => setStatus('offline'));
  }, [log]);

  const disconnect = useCallback(() => {
    socketRef.current?.close(1000, 'Tester disconnected');
    socketRef.current = null;
    setStatus('offline');
  }, []);

  useEffect(() => disconnect, [disconnect]);

  return {
    label,
    status,
    session,
    messages,
    events,
    access,
    moderationUpdates,
    connect,
    disconnect,
    join: (channelId: string) => send({ op: 'JOIN_CHANNEL', channelId }),
    leave: (channelId: string) => send({ op: 'LEAVE_CHANNEL', channelId }),
    sendMessage: (
      channelId: string,
      messageType: string,
      text: string,
      additionalData: Record<string, string>
    ) =>
      send({
        op: 'CHAT_SEND',
        channelId,
        clientMessageId: crypto.randomUUID(),
        messageType,
        text,
        additionalData
      }),
    report: (messageId: string) =>
      send({ op: 'REPORT_MESSAGE', messageId, reason: 'other', comment: 'Reported from Chat Tester' })
  };
}

export type ChatTesterClient = ReturnType<typeof useChatClient>;
