import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, ShoppingCart, Search, CreditCard, ArrowRight, Star, Sparkles, Globe, Shield } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="container relative z-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" /> AI-Powered Agentic Commerce
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Describe what you need.
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                We handle the rest.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              SWIFT's AI agents understand your intent, discover products across retailers, rank them transparently, and orchestrate checkout — from one conversation.
            </motion.p>
            
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/agent">
                <Button size="lg" className="h-14 gap-2 rounded-xl px-8 text-base font-display shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30">
                  Start Shopping with AI <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="h-14 rounded-xl px-8 text-base font-display">
                  How It Works
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Secure Checkout</span>
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-primary" /> Multi-Retailer</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> AI-Powered</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-primary">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">Three steps to smarter shopping</motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-16 grid gap-8 sm:grid-cols-3"
          >
            {[
              { icon: Search, step: "01", title: "Describe", desc: "Tell our AI what you need — budget, timeline, preferences. No browsing required." },
              { icon: ShoppingCart, step: "02", title: "AI Shops", desc: "SWIFT searches retailers, scores products transparently, and builds your optimal cart." },
              { icon: CreditCard, step: "03", title: "One Checkout", desc: "Pay once, ship to one address. SWIFT handles multi-retailer orchestration." },
            ].map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="group relative rounded-2xl border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="font-display text-5xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">{step.step}</span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-card/50 py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Platform Features</motion.p>
            <motion.h2 variants={fadeUp} className="mt-2 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">Built for the way you actually shop</motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { emoji: "🛒", title: "Multi-Retailer", desc: "Products from Amazon, Walmart, Party City & Costco in one unified cart." },
              { emoji: "🤖", title: "AI-Powered Agent", desc: "Conversational agents that understand intent and shop autonomously." },
              { emoji: "📊", title: "Smart Ranking", desc: "Transparent scoring: cost 30%, delivery 30%, preference 20%, coherence 20%." },
              { emoji: "⚡", title: "Fast Checkout", desc: "One payment, one address — SWIFT orchestrates across all stores." },
            ].map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="rounded-2xl border bg-background p-6 transition-all hover:border-primary/20 hover:shadow-md">
                <span className="text-3xl">{f.emoji}</span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
            <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="mt-2 font-display text-3xl font-bold text-foreground">Loved by organizers</motion.h2>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { name: "Adewale O.", role: "Hackathon Organizer", text: "Planned a 60-person hackathon in 10 minutes. SWIFT found everything across 4 stores!", stars: 5 },
              { name: "Chioma A.", role: "Event Planner", text: "The AI understood exactly what I wanted. Budget was respected and delivery was on time.", stars: 5 },
              { name: "Emeka I.", role: "Tech Lead", text: "Finally, shopping that doesn't waste my time. One conversation, one checkout. Brilliant.", stars: 5 },
            ].map((t) => (
              <motion.div key={t.name} variants={fadeUp} className="rounded-2xl border bg-card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container relative z-10 text-center">
          <h2 className="font-display text-4xl font-bold text-primary-foreground">Ready to shop smarter?</h2>
          <p className="mt-3 text-lg text-primary-foreground/80">Let SWIFT's AI agent handle your next big purchase.</p>
          <Link to="/agent">
            <Button size="lg" variant="secondary" className="mt-8 h-14 gap-2 rounded-xl px-10 text-base font-display shadow-lg">
              Try AI Shopping Now <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
