import { Layout } from "@/components/layout/Layout";
import { Zap, Users, Globe, Target } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">About SWIFT</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            <strong>Smart Web Intelligence Fast Trading</strong> — We're building the future of online commerce where AI agents handle the complexity of shopping so you don't have to.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[
              { icon: Target, title: "Our Mission", desc: "Eliminate the friction of multi-retailer shopping by delegating the entire process to intelligent agents." },
              { icon: Globe, title: "Our Vision", desc: "A world where you describe outcomes, not SKUs — and buying becomes a single, coherent experience." },
              { icon: Zap, title: "Our Technology", desc: "Conversational AI that understands intent, a transparent ranking engine, and cross-store checkout orchestration." },
              { icon: Users, title: "Our Team", desc: "A passionate team of engineers, designers, and commerce experts dedicated to reinventing how people shop." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-card p-6">
                <item.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-primary/5 p-8">
            <h2 className="font-display text-2xl font-bold text-foreground">The Problem We Solve</h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              {["Shopping is fragmented across dozens of websites", "Comparing prices and delivery times is tedious", "Repetitive checkouts waste your time", "Search engines find products but don't buy them for you"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
