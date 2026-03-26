import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Users, ShoppingCart, TrendingUp, Package, Activity } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const mockOrders = [
  { id: "SWF-001", user: "Adewale O.", items: 6, total: 289.94, status: "Delivered" },
  { id: "SWF-002", user: "Chioma A.", items: 4, total: 156.96, status: "In Transit" },
  { id: "SWF-003", user: "Emeka I.", items: 8, total: 412.91, status: "Processing" },
];

const mockUsers = [
  { name: "Adewale O.", email: "adewale@email.com", orders: 3 },
  { name: "Chioma A.", email: "chioma@email.com", orders: 1 },
  { name: "Emeka I.", email: "emeka@email.com", orders: 5 },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-green-500/10 text-green-600",
  "In Transit": "bg-primary/10 text-primary",
  Processing: "bg-accent/10 text-accent",
};

export default function AdminDashboard() {
  const { user, loading } = useAuth();

  if (loading) return <Layout><div className="flex items-center justify-center py-32"><Activity className="h-8 w-8 animate-spin text-primary" /></div></Layout>;
  if (!user?.isAdmin) return <Navigate to="/login" />;

  return (
    <Layout>
      <section className="py-10">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Admin</p>
              <h1 className="mt-1 font-display text-3xl font-bold text-foreground">Dashboard</h1>
            </motion.div>

            {/* Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: ShoppingCart, label: "Total Orders", value: "47", change: "+12%" },
                { icon: Users, label: "Total Users", value: "128", change: "+8%" },
                { icon: TrendingUp, label: "Revenue", value: "$12,847", change: "+23%" },
                { icon: Package, label: "Pending", value: "8", change: "-5%" },
              ].map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-green-600">{s.change}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
                  <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Orders */}
            <motion.div variants={fadeUp} className="mt-10">
              <h2 className="font-display text-xl font-bold text-foreground">Recent Orders</h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order ID</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">User</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Items</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockOrders.map((o) => (
                      <tr key={o.id} className="transition-colors hover:bg-muted/30">
                        <td className="px-5 py-4 font-mono text-sm font-medium text-foreground">{o.id}</td>
                        <td className="px-5 py-4 text-muted-foreground">{o.user}</td>
                        <td className="px-5 py-4 text-muted-foreground">{o.items}</td>
                        <td className="px-5 py-4 font-semibold text-foreground">${o.total.toFixed(2)}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[o.status] || "bg-muted text-muted-foreground"}`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Users */}
            <motion.div variants={fadeUp} className="mt-10">
              <h2 className="font-display text-xl font-bold text-foreground">Users</h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</th>
                      <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockUsers.map((u) => (
                      <tr key={u.email} className="transition-colors hover:bg-muted/30">
                        <td className="px-5 py-4 font-medium text-foreground">{u.name}</td>
                        <td className="px-5 py-4 text-muted-foreground">{u.email}</td>
                        <td className="px-5 py-4 text-muted-foreground">{u.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
