"use client";
import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ChessCoachChat({ messages, setMessages }: {
  messages: { role: string; content: string }[];
  setMessages: React.Dispatch<React.SetStateAction<{ role: string; content: string }[]>>;
}) {
  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompts
  const suggestedPrompts = [
    "What was your last move and why?",
    "What is the best move now?",
    "Can you explain this opening?",
    "What are the threats in this position?",
    "How can I improve my position?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(customInput?: string) {
    const messageToSend = customInput !== undefined ? customInput : input;
    if (!messageToSend.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", content: messageToSend }]);
    setInput("");
    // Mock AI response
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { role: "ai", content: "(AI reasoning placeholder for: " + messageToSend + ")" },
      ]);
    }, 800);
  }

  return (
    <Card className="flex flex-col h-full w-full border-l border-border rounded-none">
      <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
          >
            <Card
              className={`max-w-[80%] px-4 py-2 text-sm shadow-sm whitespace-pre-line "
                ${msg.role === "ai"
                  ? "bg-muted text-left self-start ml-2"
                  : "bg-primary text-primary-foreground self-end mr-2"}
              `}
            >
              {msg.content}
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="p-4 border-t border-border flex flex-col gap-2">
        {/* Prompt buttons */}
        <div className="flex flex-wrap gap-2 mb-2">
          {suggestedPrompts.map((prompt, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleSend(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
        {/* Input and send button */}
        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="Ask a question about the game..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={() => handleSend()}>Send</Button>
        </div>
      </div>
    </Card>
  );
} 