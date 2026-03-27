import { Layout } from "@/components/layout/Layout";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, ShoppingCart, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { hackathonProducts, getRecommendedCart, Product } from "@/data/mock-products";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "👋 Hey! I'm your SWIFT shopping agent.\n\nTell me what you're planning and I'll find the best products across multiple retailers, rank them transparently, and build your cart.\n\n**Try:** *\"I'm hosting a hackathon for 60 people, budget $400\"*",
  },
];

const quickPrompts = [
  "I'm hosting a hackathon for 60 people, budget $400",
  "Why is this ranked #1?",
  "Find a cheaper setup",
  "What about delivery?",
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
        if (jsonStr === "[DONE]") { streamDone = true; break; }

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

    const lower = assistantSoFar.toLowerCase();
    if (lower.includes("snack") || lower.includes("badge") || lower.includes("prize") || lower.includes("recommend")) {
      const recommended = getRecommendedCart(400, 5);
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
        {/* Chat header */}
        <div className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container max-w-3xl flex items-center gap-3 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-foreground">SWIFT AI Agent</h1>
              <p className="text-xs text-muted-foreground">Multi-retailer shopping assistant</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="container max-w-3xl flex-1 py-6">
          <div className="space-y-5">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/20">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "border bg-card rounded-bl-md"
                  }`}>
                    <div className="prose prose-sm max-w-none text-sm leading-relaxed dark:prose-invert">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>

                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {msg.products.map((p) => (
                          <div key={p.id} className="flex items-center gap-3 rounded-xl border bg-background p-3 transition-colors hover:border-primary/30">
                            <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
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
                            <div className="text-right shrink-0">
                              <p className="font-bold text-primary">${p.price.toFixed(2)}</p>
                              <Button size="sm" variant="outline" className="mt-1 h-7 rounded-lg text-xs" onClick={() => { addItem(p); toast({ title: `Added ${p.name}` }); }}>
                                <ShoppingCart className="mr-1 h-3 w-3" /> Add
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button className="w-full gap-2 rounded-xl" onClick={() => addAllToCart(msg.products!)}>
                          <ShoppingCart className="h-4 w-4" /> Add All to Cart ({msg.products.length} items)
                        </Button>
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isThinking && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-bl-md border bg-card px-5 py-4">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input */}
        <div className="sticky bottom-0 border-t bg-background/80 backdrop-blur-xl">
          <div className="container max-w-3xl py-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you need to buy..."
                className="h-12 flex-1 rounded-xl border-2 focus-visible:ring-0 focus-visible:border-primary"
                disabled={isThinking}
              />
              <Button type="submit" disabled={isThinking || !input.trim()} size="icon" className="h-12 w-12 rounded-xl shadow-lg shadow-primary/20">
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <div className="mt-3 flex flex-wrap gap-2">
              {quickPrompts.map((q) => (
                <button key={q} onClick={() => setInput(q)} className="rounded-full border bg-card px-3.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:shadow-sm">
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
