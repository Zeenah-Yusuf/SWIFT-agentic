import { Layout } from "@/components/layout/Layout";
import { hackathonProducts, scoreProduct, formatNaira, getEffectivePrice, PricingTier } from "@/data/mock-products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Tag, Package, Truck } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tiers: { key: PricingTier; label: string; icon: typeof Tag; desc: string }[] = [
  { key: "retail", label: "Retail", icon: Tag, desc: "Single unit pricing" },
  { key: "wholesale", label: "Wholesale", icon: Package, desc: "5+ units — save up to 20%" },
  { key: "bulk", label: "Bulk Deals", icon: Truck, desc: "20+ units — max savings" },
];

const categories = ["All", ...new Set(hackathonProducts.map((p) => p.category))];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function NewArrivals() {
  const { addItem } = useCart();
  const [activeTier, setActiveTier] = useState<PricingTier>("retail");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = hackathonProducts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .map((p) => scoreProduct(p, 200000, 5));

  return (
    <Layout>
      <section className="py-16">
        <div className="container">
          <h1 className="font-display text-4xl font-bold text-foreground">Shop Products</h1>
          <p className="mt-2 text-muted-foreground">Nigerian stores — retail, wholesale & bulk pricing.</p>

          {/* Tier Selector */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {tiers.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTier(t.key)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  activeTier === t.key
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "bg-card hover:border-primary/30"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${activeTier === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <t.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border bg-card text-muted-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => {
                const effectivePrice = getEffectivePrice(p, activeTier);
                const savings = p.price - effectivePrice;
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={fadeUp}
                    className="rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
                  >
                    <img src={p.image} alt={p.name} className="h-36 w-full rounded-lg object-cover" />
                    <h3 className="mt-3 font-display text-sm font-semibold text-foreground line-clamp-2">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.retailer}</p>

                    <div className="mt-2">
                      <span className="font-display text-lg font-bold text-primary">{formatNaira(effectivePrice)}</span>
                      {savings > 0 && (
                        <span className="ml-2 text-xs text-muted-foreground line-through">{formatNaira(p.price)}</span>
                      )}
                    </div>

                    {savings > 0 && (
                      <span className="mt-1 inline-block rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-semibold text-green-600">
                        Save {formatNaira(savings)}
                      </span>
                    )}

                    {activeTier !== "retail" && (
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        Min qty: {activeTier === "wholesale" ? p.minQtyWholesale : p.minQtyBulk} units
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{p.deliveryDays}d delivery</span>
                      {p.score && <span className="font-medium text-primary">Score: {p.score}</span>}
                    </div>

                    <Button size="sm" className="mt-3 w-full gap-1" onClick={() => addItem({ ...p, price: effectivePrice })}>
                      <ShoppingCart className="h-3 w-3" /> Add to Cart
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
}
