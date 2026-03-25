import { Layout } from "@/components/layout/Layout";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, ShoppingCart, Star, Info } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { hackathonProducts, scoreProduct, getRecommendedCart, Product } from "@/data/mock-products";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "👋 Welcome to SWIFT AI Agent! I'm here to help you shop smarter.\n\nTell me what you need — for example:\n**\"I'm hosting a hackathon for 60 people — figure out what I need (snacks, badges, adapters, decorations, prizes) and buy it at the best price.\"**\n\nI'll find products across multiple retailers, rank them transparently, and build your cart!",
  },
];

function parseShoppingIntent(input: string) {
  const lower = input.toLowerCase();
  const budget = lower.match(/budget\s*\$?(\d+)/)?.[1] || lower.match(/\$(\d+)/)?.[1] || "500";
  const days = lower.match(/(\d+)\s*day/)?.[1] || "5";
  const isHackathon = lower.includes("hackathon") || lower.includes("event") || lower.includes("hosting") || lower.includes("party");
  return { budget: parseInt(budget), days: parseInt(days), isHackathon };
}

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

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsThinking(true);

    setTimeout(() => {
      const { budget, days, isHackathon } = parseShoppingIntent(userMsg);

      if (isHackathon || userMsg.toLowerCase().includes("snack") || userMsg.toLowerCase().includes("need") || userMsg.toLowerCase().includes("buy") || userMsg.toLowerCase().includes("shop")) {
        const recommended = getRecommendedCart(budget, days);
        const totalCost = recommended.reduce((s, p) => s + p.price, 0);

        const response = `## 🛒 Shopping Spec Generated!\n\n**Budget:** $${budget} | **Deadline:** ${days} days | **Scenario:** Hackathon Host Kit (60 people)\n\n### Recommended Products (${recommended.length} items from ${[...new Set(recommended.map(p => p.retailer))].length} retailers)\n\nI've ranked products using our **transparent scoring engine** based on:\n- 💰 **Cost efficiency** (30%)\n- 🚚 **Delivery feasibility** (30%)\n- 🎯 **Preference match** (20%)\n- 🧩 **Set coherence** (20%)\n\nTotal: **$${totalCost.toFixed(2)}** ${totalCost <= budget ? "✅ Within budget!" : "⚠️ Slightly over budget"}\n\nClick "Add All to Cart" below, or tap individual items. You can swap any item and I'll adapt!`;

        setMessages((prev) => [...prev, { role: "assistant", content: response, products: recommended }]);
      } else if (userMsg.toLowerCase().includes("why") || userMsg.toLowerCase().includes("rank")) {
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: "## 📊 Ranking Explanation\n\nEach product is scored on 4 dimensions:\n\n1. **Cost (30%)** — Lower price relative to budget = higher score\n2. **Delivery (30%)** — Meets your deadline? Full score. Each day over = -30 points\n3. **Preference Match (20%)** — How well it fits your stated preferences\n4. **Set Coherence (20%)** — How well it fits with other items in your cart\n\nThe #1 ranked item in each category has the highest combined score. You can click the ℹ️ icon on any product to see its exact breakdown!"
        }]);
      } else if (userMsg.toLowerCase().includes("cheaper") || userMsg.toLowerCase().includes("optim")) {
        const optimized = hackathonProducts
          .map((p) => scoreProduct(p, 300, days))
          .sort((a, b) => a.price - b.price)
          .slice(0, 6);
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: "## 💡 Budget Optimizer\n\nHere's the cheapest setup that still covers all categories:\n\nTotal: **$" + optimized.reduce((s, p) => s + p.price, 0).toFixed(2) + "**\n\nThese are the most cost-effective options from each category.",
          products: optimized,
        }]);
      } else {
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: "I'd love to help! Try telling me:\n- What you're planning (hackathon, party, event)\n- Your budget\n- Delivery deadline\n\nFor example: *\"I'm hosting a hackathon for 60 people, budget $400, need everything in 3 days\"*"
        }]);
      }

      setIsThinking(false);
    }, 1500);
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
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.content.split("\n").map((line, li) => {
                      if (line.startsWith("## ")) return <h2 key={li} className="mt-2 font-display text-lg font-bold">{line.replace("## ", "")}</h2>;
                      if (line.startsWith("### ")) return <h3 key={li} className="mt-2 font-display text-base font-semibold">{line.replace("### ", "")}</h3>;
                      if (line.startsWith("**") && line.endsWith("**")) return <p key={li} className="font-semibold">{line.replace(/\*\*/g, "")}</p>;
                      if (line.startsWith("- ")) return <p key={li} className="ml-2">• {line.slice(2).replace(/\*\*/g, "")}</p>;
                      return <p key={li}>{line.replace(/\*\*/g, "").replace(/\*/g, "")}</p>;
                    })}
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
                            <p className="font-display font-bold text-primary">${p.price.toFixed(2)}</p>
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
