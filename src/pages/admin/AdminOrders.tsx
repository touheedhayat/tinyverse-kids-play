import { Link } from "react-router-dom";
import { Package, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "ORD-001", customer: "Ali Khan", total: 2499, status: "pending", date: "2024-01-15" },
  { id: "ORD-002", customer: "Fatima Ahmed", total: 3299, status: "processing", date: "2024-01-14" },
  { id: "ORD-003", customer: "Hassan Ali", total: 1899, status: "shipped", date: "2024-01-13" },
  { id: "ORD-004", customer: "Sara Malik", total: 4599, status: "delivered", date: "2024-01-12" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500", processing: "bg-blue-500", shipped: "bg-purple-500", delivered: "bg-green-500", cancelled: "bg-red-500",
};

const AdminOrders = () => (
  <div className="min-h-screen bg-muted/30">
    <header className="bg-card border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-fredoka font-bold">TinyVerse Admin</h1>
        <Link to="/"><Button variant="outline">View Store</Button></Link>
      </div>
    </header>

    <div className="flex">
      <aside className="w-64 bg-card border-r min-h-[calc(100vh-73px)] p-4">
        <nav className="space-y-2">
          {[
            { href: "/admin", label: "Dashboard", icon: TrendingUp },
            { href: "/admin/products", label: "Products", icon: Package },
            { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
            { href: "/admin/settings", label: "Settings", icon: AlertTriangle },
          ].map((item) => (
            <Link key={item.href} to={item.href}>
              <Button variant={item.href === "/admin/orders" ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                <item.icon className="w-4 h-4" />{item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-6">Orders</h2>
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>Rs. {order.total.toLocaleString()}</TableCell>
                  <TableCell><Badge className={`${statusColors[order.status]} text-white capitalize`}>{order.status}</Badge></TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  </div>
);

export default AdminOrders;
