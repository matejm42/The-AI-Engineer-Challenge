"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "🎂 HAPPY BIRTHDAY!! 🎂\n\nWelcome, birthday girl! I am the OFFICIAL Gift Guardian, sworn protector of secrets and celebrator of birthdays! 🎉\n\nI know EVERYTHING... including where a certain someone hid your gift. But my lips? SEALED. My oath? SACRED. My resolve? Unbreakable.\n\n...probably.\n\nVšechno nejlepší!!!!! 🎈🦄🎊✨🎁",
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const allMessages = [...messages, userMessage];
    setMessages(allMessages);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
    }
    setLoading(true);

    try {
      const API_BASE = typeof window !== "undefined" && window.location.hostname !== "localhost"
        ? ""
        : "http://localhost:8000";
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("Backend error");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "💥 Oops! The Gift Guardian tripped over a birthday cake. Is the backend running? 🎂",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const floatingEmojis = ["🎂", "🎉", "🥳", "🎁", "🎈", "🦄", "🌟", "🍰", "🎊", "🥂", "🎀", "✨", "🌈", "🦋", "🍭", "🪄"];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-rose-700 flex flex-col items-center justify-start py-6 px-4">
      {/* Floating decorative emojis in the background */}
      {floatingEmojis.map((emoji, i) => (
        <span
          key={i}
          className="pointer-events-none absolute select-none opacity-20"
          style={{
            left: `${(i * 6.3 + 3) % 95}%`,
            top: `${(i * 13 + 5) % 90}%`,
            fontSize: `${1.5 + (i % 4)}rem`,
            animation: `floaty ${5 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* GIANT birthday banner */}
      <div className="relative z-10 text-center mb-3 px-2 flex-shrink-0">
        <h1
          className="font-black tracking-tight leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          style={{
            fontSize: "clamp(2rem, 7vw, 5rem)",
            background: "linear-gradient(90deg, #fff7ad, #ffa9f9, #fff7ad, #a9c7ff, #fff7ad)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shimmer 4s linear infinite",
          }}
        >
          HAPPY BIRTHDAY SISTER!!!!
        </h1>
        <div className="text-2xl sm:text-3xl mt-1 tracking-widest">🎂🎉🥳🎁🎈🦄🎊🎀</div>
      </div>

      <div
        className="relative z-10 w-full max-w-2xl flex flex-col bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border-2 border-white/30"
        style={{ height: "70vh" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-center flex-shrink-0">
          <h2 className="text-white font-bold text-lg tracking-wide">🎁 Birthday Gift Guardian 🎁</h2>
          <p className="text-pink-100 text-sm mt-1">Can you convince me to reveal the secret? 👀</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-sm mr-2 flex-shrink-0 mt-1">
                  🎁
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-md ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-tr-sm max-w-[75%]"
                    : "bg-white/20 text-white backdrop-blur-sm rounded-tl-sm border border-white/20 max-w-[80%]"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-sm ml-2 flex-shrink-0 mt-1">
                  🎀
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                🎁
              </div>
              <div className="bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1 items-center h-5">
                  <span
                    className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-pink-300 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-4 bg-white/5 border-t border-white/10 flex-shrink-0">
          <div className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              className="flex-1 bg-white/15 text-white placeholder-pink-200 border border-white/20 rounded-2xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent backdrop-blur-sm leading-relaxed"
              placeholder="Try to convince the Guardian... 🎁"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "48px";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKey}
              style={{ minHeight: "48px", maxHeight: "120px" }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-2xl transition-all duration-200 text-lg shadow-lg hover:shadow-pink-500/30 flex-shrink-0"
              style={{ height: "48px" }}
            >
              🎉
            </button>
          </div>
          <p className="text-pink-200/50 text-xs text-center mt-2">Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </main>
  );
}
