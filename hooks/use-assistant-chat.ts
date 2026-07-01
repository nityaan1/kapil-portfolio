"use client";

import { useCallback, useRef, useState } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/**
 * Drives the "Query the Network" assistant: posts to /api/assistant and
 * reads the plain-text stream chunk by chunk, appending into the trailing
 * assistant message so the UI gets a typewriter effect (design system:
 * every animation ties to real state, not decoration).
 */
export function useAssistantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(0);

  const nextId = () => `msg-${++idRef.current}`;

  const send = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || isStreaming) return;

      setError(null);
      const userMessage: ChatMessage = { id: nextId(), role: "user", content: trimmed };
      const assistantId = nextId();

      const historyForRequest = [...messages, userMessage].map(({ role, content }) => ({
        role,
        content,
      }));

      setMessages((prev) => [
        ...prev,
        userMessage,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setIsStreaming(true);

      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyForRequest }),
        });

        if (!response.ok || !response.body) {
          throw new Error(await response.text().catch(() => "Request failed."));
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
          );
        }
      } catch {
        setError("The assistant is unavailable right now. Please try again.");
        setMessages((prev) => prev.filter((m) => m.id !== assistantId || m.content.length > 0));
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming]
  );

  return { messages, isStreaming, error, send };
}
