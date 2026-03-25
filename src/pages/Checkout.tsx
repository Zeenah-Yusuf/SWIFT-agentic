import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PaymentPopup } from "@/components/checkout/PaymentPopup";
import { CheckCircle2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [payOpen, setPayOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const orderId = `SWF-${Date.now().toString().slice(-8)}`;

  if (items.length === 0 && !orderComplete) return <Navigate to="/cart" />;

  if (orderComplete) {
    return (
      <Layout>
        <section className="flex flex-col items-center justify-center py-24">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
          <h1 className="mt-4 font-display text-3xl font-bold text-foreground">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">Order ID: {orderId}</p>
          <p className="text-sm text-muted-foreground">SWIFT is orchestrating checkout across all retailers...</p>
          <div className="mt-6 flex gap-3">
            <Link to="/shipping"><Button>Track Order</Button></Link>
            <Link to="/"><Button variant="outline">Back Home</Button></Link>
          </div>
        </section>
      </Layout>
    );
  }

  const retailers = [...new Set(items.map((i) => i.retailer))];

  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Checkout</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your details once — SWIFT handles checkout across {retailers.length} retailers.</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground">Shipping Address</h2>
                <div className="mt-3 space-y-3">
                  <Input placeholder="Full name" />
                  <Input placeholder="Address line 1" />
                  <Input placeholder="Address line 2" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="City" />
                    <Input placeholder="State" />
                  </div>
                  <Input placeholder="Phone number" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Order Summary</h2>
              <div className="mt-3 rounded-xl border bg-card p-5">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.image} {item.name} ×{item.quantity}</span>
                      <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <hr className="my-4 border-border" />
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-foreground">Total</span>
                  <span className="font-display text-xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Retailers: {retailers.join(", ")}
                </div>

                <Button className="mt-4 w-full" size="lg" onClick={() => setPayOpen(true)}>Pay Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PaymentPopup open={payOpen} onClose={() => setPayOpen(false)} total={total} onComplete={() => { setPayOpen(false); clearCart(); setOrderComplete(true); }} />
    </Layout>
  );
}
