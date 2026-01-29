import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, ShoppingCart, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sampleProducts } from "@/data/products";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Products", value: sampleProducts.length, icon: Package, color: "bg-sky-blue" },
    { title: "Total Orders", value: 24, icon: ShoppingCart, color: "bg-baby-pink" },
    { title: "Revenue", value: "Rs. 45,600", icon: DollarSign, color: "bg-mint-green" },
    { title: "Pending", value: 5, icon: TrendingUp, color: "bg-lavender" },
  ];

  return (
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
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold mb-6">Dashboard Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${stat.color}`}><stat.icon className="w-4 h-4" /></div>
                  </CardHeader>
                  <CardContent><p className="text-2xl font-bold">{stat.value}</p></CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">No recent activity to display.</p></CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
