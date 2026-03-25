import { Layout } from "@/components/layout/Layout";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  { slug: "future-of-agentic-commerce", title: "The Future of Agentic Commerce", excerpt: "How AI agents are transforming the way we shop online — from intent to delivery.", date: "2026-03-20", category: "Industry" },
  { slug: "multi-retailer-checkout", title: "Why Multi-Retailer Checkout Matters", excerpt: "The hidden cost of checkout fragmentation and how SWIFT solves it.", date: "2026-03-15", category: "Product" },
  { slug: "ranking-transparency", title: "Transparent Product Ranking: Our Approach", excerpt: "How SWIFT's scoring engine works and why we show you the math behind every recommendation.", date: "2026-03-10", category: "Technology" },
  { slug: "hackathon-shopping", title: "Planning a Hackathon? Let AI Do the Shopping", excerpt: "A case study on how SWIFT helped organize a 60-person hackathon in under 10 minutes.", date: "2026-03-05", category: "Case Study" },
];

export default function Blog() {
  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Blog</h1>
          <p className="mt-2 text-muted-foreground">Insights on agentic commerce, AI shopping, and the future of retail.</p>
          <div className="mt-10 space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold text-foreground">{post.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <button className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Read more <ArrowRight className="h-3 w-3" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
