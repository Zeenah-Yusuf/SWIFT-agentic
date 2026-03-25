import { Layout } from "@/components/layout/Layout";
import { Star } from "lucide-react";

const reviews = [
  { name: "Adewale O.", role: "Event Planner", rating: 5, text: "SWIFT saved me hours of work. I described what I needed for a hackathon and had a complete cart in minutes." },
  { name: "Chioma A.", role: "Startup Founder", rating: 5, text: "The ranking engine is transparent and trustworthy. I could see exactly why each product was recommended." },
  { name: "Emeka I.", role: "Developer", rating: 4, text: "Finally, a shopping experience that respects my time. The multi-retailer cart is genius." },
  { name: "Ngozi M.", role: "Marketing Manager", rating: 5, text: "Used SWIFT to outfit our entire team for a conference. Budget was respected, everything arrived on time." },
  { name: "Tunde K.", role: "Operations Lead", rating: 5, text: "The checkout orchestration is seamless. One payment for items from 4 different stores!" },
  { name: "Amara B.", role: "Community Manager", rating: 4, text: "The AI agent understood my needs perfectly. It even suggested items I hadn't thought of." },
];

export default function Reviews() {
  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Reviews</h1>
          <p className="mt-2 text-muted-foreground">What our users are saying about SWIFT.</p>
          <div className="mt-10 space-y-6">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-xl border bg-card p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">"{r.text}"</p>
                <div className="mt-3">
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
