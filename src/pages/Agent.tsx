import { Layout } from "@/components/layout/Layout";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { hackathonProducts, scoreProduct, getRecommendedCart, Product } from "@/data/mock-products";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "👋 Welcome to SWIFT AI Agent! I'm here to help you shop smarter.\n\nTell me what you need — for example:\n\n**\"I'm hosting a hackathon for 60 people — figure out what I need (snacks, badges, adapters, decorations, prizes) and buy it at the best price.\"**\n\nI'll find products across multiple retailers, rank them transparently, and build your cart!",
  },
];

export default function Agent() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamChat = useCallback(async (allMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ error: "AI request failed" }));
      throw new Error(err.error || `Request failed (${resp.status})`);
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantSoFar = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantSoFar += content;
            const snapshot = assistantSoFar;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && last !== initialMessages[0]) {
                return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: snapshot } : m));
              }
              return [...prev, { role: "assistant", content: snapshot }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // flush remaining
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantSoFar += content;
            const snapshot = assistantSoFar;
            setMessages((prev) =>
              prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: snapshot } : m))
            );
          }
        } catch { /* ignore */ }
      }
    }

    // After AI response, check if we should attach product cards
    const lower = assistantSoFar.toLowerCase();
    if (lower.includes("snack") || lower.includes("badge") || lower.includes("prize") || lower.includes("recommend")) {
      const budget = 400;
      const days = 5;
      const recommended = getRecommendedCart(budget, days);
      setMessages((prev) =>
        prev.map((m, i) => (i === prev.length - 1 ? { ...m, products: recommended } : m))
      );
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsThinking(true);

    try {
      await streamChat(newMessages);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const addAllToCart = (products: Product[]) => {
    products.forEach((p) => addItem(p));
    toast({ title: `${products.length} items added to cart!` });
  };

  return (
    <Layout>
      <div className="flex flex-1 flex-col">
        <div className="container max-w-3xl flex-1 py-6">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-xl p-4 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "border bg-card"}`}>
                  <div className="prose prose-sm max-w-none text-sm leading-relaxed dark:prose-invert">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>

                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {msg.products.map((p) => (
                        <div key={p.id} className="flex items-center gap-3 rounded-lg border bg-background p-3">
                          <span className="text-2xl">{p.image}</span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.retailer} • {p.deliveryDays}d • Score: {p.score}/100</p>
                            {p.scoreBreakdown && (
                              <div className="mt-1 flex gap-2 text-[10px] text-muted-foreground">
                                <span>💰{p.scoreBreakdown.cost}</span>
                                <span>🚚{p.scoreBreakdown.delivery}</span>
                                <span>🎯{p.scoreBreakdown.preferenceMatch}</span>
                                <span>🧩{p.scoreBreakdown.setCoherence}</span>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">${p.price.toFixed(2)}</p>
                            <Button size="sm" variant="outline" className="mt-1 h-7 text-xs" onClick={() => { addItem(p); toast({ title: `Added ${p.name}` }); }}>
                              <ShoppingCart className="mr-1 h-3 w-3" /> Add
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button className="w-full gap-2" onClick={() => addAllToCart(msg.products!)}>
                        <ShoppingCart className="h-4 w-4" /> Add All to Cart ({msg.products.length} items)
                      </Button>
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-xl border bg-card p-4">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur-sm">
          <div className="container max-w-3xl py-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you need to buy..."
                className="flex-1"
                disabled={isThinking}
              />
              <Button type="submit" disabled={isThinking || !input.trim()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-2 flex flex-wrap gap-2">
              {["I'm hosting a hackathon for 60 people, budget $400", "Why is this ranked #1?", "Find a cheaper setup", "What about delivery?"].map((q) => (
                <button key={q} onClick={() => { setInput(q); }} className="rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
