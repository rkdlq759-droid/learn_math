"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { explainAction } from "@/app/actions";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "안녕하세요! 고등 수학 학습 도우미입니다. 어떤 개념이 궁금하신가요?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await explainAction(userMsg, "자유 채팅 모드");
      setMessages(prev => [...prev, { role: "bot", text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "죄송합니다. 답변을 생성하는 중 오류가 발생했습니다." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative">
      {/* Header for Chat */}
      <div className="pt-12 pb-4 px-6">
        <h2 className="text-3xl font-bold tracking-tight">AI 튜터</h2>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 pb-48 scrollbar-hide">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex flex-col max-w-[85%]",
              msg.role === "user" ? "ml-auto items-end" : "items-start"
            )}
          >
            <div className={cn(
              "p-4 px-5 rounded-[28px] shadow-sm text-[15px] leading-relaxed",
              msg.role === "user" 
                ? "bg-primary text-primary-foreground rounded-br-[4px]" 
                : "bg-secondary/60 text-foreground rounded-bl-[4px]"
            )}>
              <ReactMarkdown 
                remarkPlugins={[remarkMath]} 
                rehypePlugins={[rehypeKatex]}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3 bg-secondary/30 w-fit p-3 px-5 rounded-[24px] text-muted-foreground italic text-xs animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            AI가 답변을 준비하고 있어요
          </div>
        )}
      </div>

      <div className="absolute bottom-28 left-4 right-4 z-10">
        <div className="relative flex items-center group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="궁금한 내용을 물어보세요"
            className="w-full bg-secondary/80 backdrop-blur-xl border border-white/10 rounded-[28px] py-4.5 pl-6 pr-16 text-[15px] focus:ring-4 focus:ring-primary/20 shadow-lg transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-3 bg-primary text-primary-foreground rounded-[22px] disabled:opacity-40 transition-all active:scale-90 shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
