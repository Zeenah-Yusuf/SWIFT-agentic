import { Layout } from "@/components/layout/Layout";
import { hackathonProducts, scoreProduct } from "@/data/mock-products";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

const arrivals = hackathonProducts.slice(0, 8).map((p) => scoreProduct(p, 500, 5));

export default function NewArrivals() {
  const { addItem } = useCart();

  return (
    <Layout>
      <section className="py-16">
        <div className="container">
          <h1 className="font-display text-4xl font-bold text-foreground">New Arrivals</h1>
          <p className="mt-2 text-muted-foreground">Fresh products added to our multi-retailer catalog.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {arrivals.map((p) => (
              <div key={p.id} className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
                <div className="flex h-16 items-center justify-center text-4xl">{p.image}</div>
                <h3 className="mt-3 font-display text-sm font-semibold text-foreground line-clamp-2">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.retailer}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-display font-bold text-primary">${p.price.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">{p.deliveryDays}d delivery</span>
                </div>
                <Button size="sm" className="mt-3 w-full gap-1" onClick={() => addItem(p)}>
                  <ShoppingCart className="h-3 w-3" /> Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
