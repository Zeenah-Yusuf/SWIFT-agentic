import { Layout } from "@/components/layout/Layout";
import { ExternalLink, Calendar } from "lucide-react";

const pressItems = [
  { title: "SWIFT Raises Seed Round to Build Agentic Commerce Platform", source: "TechCrunch", date: "2026-03-18", url: "#" },
  { title: "The Future of Shopping is Conversational, Says SWIFT CEO", source: "Bloomberg", date: "2026-03-12", url: "#" },
  { title: "SWIFT's AI Shopping Agent: A First Look", source: "The Verge", date: "2026-03-08", url: "#" },
  { title: "How SWIFT is Reinventing Multi-Retailer Checkout", source: "Wired", date: "2026-03-01", url: "#" },
];

export default function Press() {
  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Press</h1>
          <p className="mt-2 text-muted-foreground">SWIFT in the news.</p>
          <div className="mt-10 space-y-4">
            {pressItems.map((item) => (
              <a key={item.title} href={item.url} className="flex items-start justify-between gap-4 rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date} • {item.source}</p>
                  <h2 className="mt-2 font-display text-lg font-semibold text-foreground">{item.title}</h2>
                </div>
                <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground" />
              </a>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-primary/5 p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-foreground">Press Inquiries</h2>
            <p className="mt-2 text-sm text-muted-foreground">For media inquiries, contact us at press@swift.com</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
