"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { useAssistantChat } from "@/hooks/use-assistant-chat";
import { fadeInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ChatMessage } from "@/components/assistant/chat-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SUGGESTED_QUESTIONS = [
  "What's the scale of the $211M budget he managed?",
  "Which industries has he worked across?",
  "What did the Capex Optimization Project involve?",
  "How large a team has he led?",
];

/**
 * "Query the Network" — the AI assistant as a first-class console styled
 * consistently with the signal/node motif, not a bolted-on chat bubble
 * (docs/creative-direction.md's adopted recommendation). Grounded entirely
 * in /api/assistant's server-side context; never claims anything beyond it.
 */
export function QueryTheNetwork() {
  const { messages, isStreaming, error, send } = useAssistantChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!input.trim() || isStreaming) return;
    send(input);
    setInput("");
  }

  function handleSuggested(question: string) {
    if (isStreaming) return;
    send(question);
  }

  const lastMessage = messages[messages.length - 1];
  const showPendingIndicator =
    isStreaming && lastMessage?.role === "assistant" && lastMessage.content === "";

  return (
    <Section id="assistant">
      <Container>
        <SectionHeading
          index="10"
          title="Query the Network"
          description="Ask about the career, the metrics, or the work — grounded entirely in what's on this page. It will say so if something isn't covered here."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="mx-auto flex max-w-3xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card"
        >
          <div
            ref={scrollRef}
            className="flex max-h-[28rem] min-h-[16rem] flex-col gap-3 overflow-y-auto p-4 sm:p-6"
          >
            {messages.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Try one of these, or ask your own question.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => handleSuggested(question)}
                      className="rounded-sm border border-border bg-background px-3 py-1.5 text-left font-mono text-xs text-muted-foreground transition-colors duration-150 hover:border-signal/40 hover:text-foreground"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  pending={showPendingIndicator && message.id === lastMessage.id}
                />
              ))
            )}
          </div>

          {error && (
            <p className="border-t border-border px-4 py-2 text-sm text-destructive sm:px-6">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-border p-3 sm:p-4"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about his career, metrics, or industries..."
              aria-label="Ask Query the Network a question"
              disabled={isStreaming}
              className="h-10"
            />
            <Button
              type="submit"
              size="icon"
              aria-label="Send question"
              disabled={isStreaming || !input.trim()}
              className={cn("h-10 w-10 shrink-0")}
            >
              <ArrowUp className="size-4" />
            </Button>
          </form>
        </motion.div>
      </Container>
    </Section>
  );
}
