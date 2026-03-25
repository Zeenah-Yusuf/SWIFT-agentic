import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <section className="flex flex-col items-center justify-center py-24">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Start shopping with our AI agent to fill your cart.</p>
          <Link to="/agent"><Button className="mt-6 gap-2">Start Shopping <ArrowRight className="h-4 w-4" /></Button></Link>
        </section>
      </Layout>
    );
  }

  const retailers = [...new Set(items.map((i) => i.retailer))];

  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-4xl font-bold text-foreground">Your Cart</h1>
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">Clear All</Button>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">Items from {retailers.length} retailer{retailers.length > 1 ? "s" : ""}: {retailers.join(", ")}</p>

          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-xl border bg-card p-4">
                <span className="text-3xl">{item.image}</span>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-semibold text-foreground">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.retailer} • {item.deliveryDays}d delivery</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="w-20 text-right font-display font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-foreground">Total</span>
              <span className="font-display text-2xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <Button className="mt-4 w-full gap-2" size="lg">Proceed to Checkout <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
