import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageData } from "@/hooks/use-assistant-chat";

interface ChatMessageProps {
  message: ChatMessageData;
  pending?: boolean;
}

export function ChatMessage({ message, pending = false }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%]",
          isUser
            ? "bg-signal/10 text-foreground"
            : "border border-border bg-card text-foreground"
        )}
      >
        {message.content ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : pending ? (
          <span className="inline-flex items-center gap-1" aria-label="Thinking">
            <span className="size-1.5 animate-pulse rounded-full bg-signal [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-pulse rounded-full bg-signal [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-pulse rounded-full bg-signal" />
          </span>
        ) : null}
      </div>
    </div>
  );
}
