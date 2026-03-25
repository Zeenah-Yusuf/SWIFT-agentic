import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ShoppingCart, Search, CreditCard, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20 lg:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" /> Agentic Commerce Platform
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Describe what you need.{" "}
              <span className="text-primary">We handle the rest.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              SWIFT uses AI agents to understand your shopping intent, discover products across multiple retailers, build a combined cart, and orchestrate checkout — all from a single conversation.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/agent">
                <Button size="lg" className="gap-2 font-display">
                  Start Shopping with AI <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="font-display">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-0 opacity-30" style={{ background: "radial-gradient(circle at 50% 0%, hsl(24 85% 50% / 0.15), transparent 60%)" }} />
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">How SWIFT Works</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">Three simple steps to go from idea to delivered.</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Search, title: "1. Describe", desc: "Tell our AI agent what you need — budget, deadline, preferences. No browsing required." },
              { icon: ShoppingCart, title: "2. AI Shops", desc: "SWIFT searches 3+ retailers, ranks products transparently, and builds your combined cart." },
              { icon: CreditCard, title: "3. One-Click Checkout", desc: "Enter payment once. SWIFT handles checkout across all retailers simultaneously." },
            ].map((step) => (
              <div key={step.title} className="rounded-xl border bg-card p-6 text-center transition-shadow hover:shadow-md">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-card py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">Why Choose SWIFT?</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🛒", title: "Multi-Retailer", desc: "Products from Amazon, Walmart, Party City, Costco and more in one cart." },
              { icon: "🤖", title: "AI-Powered", desc: "Conversational agents that understand your intent and shop for you." },
              { icon: "📊", title: "Smart Ranking", desc: "Transparent scoring by cost, delivery, and preference match." },
              { icon: "⚡", title: "Fast Checkout", desc: "One payment, one address — we orchestrate across all stores." },
            ].map((f) => (
              <div key={f.title} className="rounded-lg border bg-background p-5 transition-shadow hover:shadow-sm">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-3 font-display font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">Loved by Organizers</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { name: "Adewale O.", text: "Planned a 60-person hackathon in 10 minutes. SWIFT found everything I needed across 4 stores!", stars: 5 },
              { name: "Chioma A.", text: "The AI understood exactly what I wanted. Budget was respected and delivery was on time.", stars: 5 },
              { name: "Emeka I.", text: "Finally, shopping that doesn't waste my time. One conversation, one checkout. Brilliant.", stars: 4 },
            ].map((t) => (
              <div key={t.name} className="rounded-xl border bg-card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">"{t.text}"</p>
                <p className="mt-3 text-sm font-semibold text-foreground">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to shop smarter?</h2>
          <p className="mt-3 text-primary-foreground/80">Let SWIFT's AI agent handle your next big purchase.</p>
          <Link to="/agent">
            <Button size="lg" variant="secondary" className="mt-6 gap-2 font-display">
              Try AI Shopping Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
