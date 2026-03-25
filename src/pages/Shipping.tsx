import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Package, Truck, CheckCircle2, Clock, MapPin } from "lucide-react";

const mockOrders = [
  { id: "SWF-20260325-001", status: "delivered", items: 6, total: 289.94, tracking: "NG1234567890" },
  { id: "SWF-20260324-002", status: "in_transit", items: 4, total: 156.96, tracking: "NG0987654321" },
  { id: "SWF-20260323-003", status: "processing", items: 8, total: 412.91, tracking: "NG1122334455" },
];

const statusSteps = [
  { key: "processing", label: "Processing", icon: Clock },
  { key: "shipped", label: "Shipped", icon: Package },
  { key: "in_transit", label: "In Transit", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle2 },
];

function getStepIndex(status: string) {
  const map: Record<string, number> = { processing: 0, shipped: 1, in_transit: 2, delivered: 3 };
  return map[status] ?? 0;
}

export default function Shipping() {
  const [trackingInput, setTrackingInput] = useState("");
  const [tracked, setTracked] = useState<typeof mockOrders[0] | null>(null);

  const handleTrack = () => {
    const found = mockOrders.find((o) => o.tracking === trackingInput || o.id === trackingInput);
    setTracked(found || null);
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Shipping & Tracking</h1>
          <p className="mt-2 text-muted-foreground">Track your orders and view shipping details.</p>

          {/* Tracker */}
          <div className="mt-8 rounded-xl border bg-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Track Your Order</h2>
            <div className="mt-4 flex gap-2">
              <Input placeholder="Enter tracking number or order ID" value={trackingInput} onChange={(e) => setTrackingInput(e.target.value)} />
              <Button onClick={handleTrack}>Track</Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Try: NG1234567890, NG0987654321, or NG1122334455</p>
          </div>

          {tracked && (
            <div className="mt-6 rounded-xl border bg-card p-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-foreground">Order {tracked.id}</p>
                  <p className="text-sm text-muted-foreground">{tracked.items} items • ${tracked.total.toFixed(2)}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">{tracked.status.replace("_", " ")}</span>
              </div>
              <div className="mt-6 flex items-center justify-between">
                {statusSteps.map((step, i) => {
                  const active = i <= getStepIndex(tracked.status);
                  return (
                    <div key={step.key} className="flex flex-1 flex-col items-center text-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <span className={`mt-2 text-xs ${active ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{step.label}</span>
                      {i < statusSteps.length - 1 && (
                        <div className={`absolute h-0.5 w-full ${active ? "bg-primary" : "bg-muted"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Shipping Info */}
          <div className="mt-10 space-y-6">
            <h2 className="font-display text-2xl font-semibold text-foreground">Shipping Information</h2>
            {[
              { title: "Standard Shipping", desc: "2-5 business days. Free on orders over $50.", price: "$4.99" },
              { title: "Express Shipping", desc: "1-2 business days. Priority handling.", price: "$12.99" },
              { title: "Same Day Delivery", desc: "Available in Lagos. Order before 12pm.", price: "$19.99" },
            ].map((s) => (
              <div key={s.title} className="rounded-xl border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold text-foreground">{s.title}</h3>
                  <span className="font-display font-bold text-primary">{s.price}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
