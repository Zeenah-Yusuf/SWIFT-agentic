import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Users, ShoppingCart, TrendingUp, Package } from "lucide-react";

const mockUsers = [
  { name: "Adewale O.", email: "adewale@email.com", orders: 3 },
  { name: "Chioma A.", email: "chioma@email.com", orders: 1 },
  { name: "Emeka I.", email: "emeka@email.com", orders: 5 },
];

const mockOrders = [
  { id: "SWF-001", user: "Adewale O.", items: 6, total: 289.94, status: "Delivered" },
  { id: "SWF-002", user: "Chioma A.", items: 4, total: 156.96, status: "In Transit" },
  { id: "SWF-003", user: "Emeka I.", items: 8, total: 412.91, status: "Processing" },
];

export default function AdminDashboard() {
  const { user } = useAuth();

  if (!user?.isAdmin) return <Navigate to="/login" />;

  return (
    <Layout>
      <section className="py-16">
        <div className="container">
          <h1 className="font-display text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage orders and users.</p>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShoppingCart, label: "Total Orders", value: "47" },
              { icon: Users, label: "Total Users", value: "128" },
              { icon: TrendingUp, label: "Revenue", value: "$12,847" },
              { icon: Package, label: "Pending", value: "8" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Orders Table */}
          <div className="mt-10">
            <h2 className="font-display text-xl font-semibold text-foreground">Recent Orders</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order ID</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Items</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((o) => (
                    <tr key={o.id} className="border-t">
                      <td className="px-4 py-3 font-medium text-foreground">{o.id}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.user}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.items}</td>
                      <td className="px-4 py-3 text-foreground">${o.total.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{o.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-10">
            <h2 className="font-display text-xl font-semibold text-foreground">Users</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((u) => (
                    <tr key={u.email} className="border-t">
                      <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{u.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
