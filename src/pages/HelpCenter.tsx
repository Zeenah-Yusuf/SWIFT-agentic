import { Layout } from "@/components/layout/Layout";
import { ChevronDown, Search, Phone, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const faqs = [
  { q: "How does SWIFT work?", a: "SWIFT uses AI agents to understand your shopping needs, search across multiple retailers, rank products transparently, and orchestrate checkout — all from one conversation." },
  { q: "Is my payment secure?", a: "Yes. SWIFT uses simulated checkout in demo mode. In production, all payments are processed through secure, encrypted channels." },
  { q: "Can I modify my cart after the AI builds it?", a: "Absolutely! You can swap any item, adjust quantities, or ask the AI to find alternatives. The agent adapts in real time." },
  { q: "How many retailers does SWIFT support?", a: "We currently source from 3+ major retailers including Amazon, Walmart, Party City, and Costco, with more being added." },
  { q: "What is the ranking engine?", a: "Our ranking engine scores products by cost, delivery feasibility, preference match, and set coherence. We show you the breakdown so you know exactly why an item is recommended." },
  { q: "How do I track my order?", a: "Visit the Shipping & Tracking page and enter your tracking number to see real-time delivery status." },
  { q: "How do I contact support?", a: "Call us at +234 817 683 1186, +234 903 715 5936, or +234 813 610 0999. You can also email support@swift.com." },
];

export default function HelpCenter() {
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Help Center</h1>
          <p className="mt-2 text-muted-foreground">Find answers to common questions.</p>

          <div className="relative mt-8">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search FAQs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>

          <div className="mt-8 space-y-3">
            {filtered.map((faq, i) => (
              <div key={i} className="rounded-xl border bg-card">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left">
                  <span className="font-display text-sm font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <div className="border-t px-5 py-4 text-sm text-muted-foreground">{faq.a}</div>}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-primary/5 p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-foreground">Still need help?</h2>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <a href="tel:+2348176831186" className="flex items-center gap-1 hover:text-primary"><Phone className="h-4 w-4" /> +234 817 683 1186</a>
              <a href="tel:+2349037155936" className="flex items-center gap-1 hover:text-primary"><Phone className="h-4 w-4" /> +234 903 715 5936</a>
              <a href="mailto:support@swift.com" className="flex items-center gap-1 hover:text-primary"><Mail className="h-4 w-4" /> support@swift.com</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
