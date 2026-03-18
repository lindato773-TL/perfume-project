import { useState, useRef, useEffect } from "react";
import { PRODUCTS } from "../data/products";

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to ScentSational's AI Advisor! 🌸 Tell me about your personality, mood, or occasion — and I'll find the perfect fragrance for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const systemPrompt = `You are a luxury perfume advisor for ScentSational, a Nigerian perfume brand. 
Help customers find the perfect fragrance based on their personality, mood, occasion or preferences.

Available products: ${PRODUCTS.map(
      (p) => `${p.name} (${p.category}, ₦${p.price.toLocaleString()}, notes: ${p.notes}) — ${p.desc}`
    ).join("; ")}.

Give warm, elegant, knowledgeable advice. Recommend 1-2 products with brief reasoning. 
Keep responses concise (under 120 words). Use ✨ emojis sparingly.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again in a moment." },
      ]);
    }

    setLoading(false);
  };

  const SUGGESTIONS = [
    "I need a gift for my partner",
    "Something for a formal event",
    "Fresh & casual everyday scent",
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">✨</span>
        </div>
        <h2 className="font-serif text-3xl font-semibold text-gray-900">AI Scent Advisor</h2>
        <p className="text-gray-400 text-sm mt-2">Powered by Claude — your personal fragrance consultant</p>
      </div>

      {/* Chat Box */}
      <div className="bg-white rounded-3xl border border-yellow-400/20 overflow-hidden shadow-sm">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-yellow-400/15 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <span className="text-xs">✨</span>
                </div>
              )}
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-yellow-500 text-white rounded-br-sm"
                    : "bg-amber-50 text-gray-900 rounded-bl-sm border border-yellow-400/10"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-yellow-400/15 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <span className="text-xs">✨</span>
              </div>
              <div className="bg-amber-50 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-sm border border-yellow-400/10 text-sm">
                Finding your perfect scent...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-yellow-400/10 p-4 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="e.g. I love fresh, clean scents for the office..."
            className="flex-1 bg-amber-50 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 border border-yellow-400/15"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors disabled:opacity-40"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            className="text-xs text-gray-400 border border-yellow-400/20 px-3 py-1.5 rounded-full hover:border-yellow-400/50 hover:text-gray-700 transition-colors bg-white"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}