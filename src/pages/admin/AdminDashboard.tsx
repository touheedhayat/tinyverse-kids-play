import { motion } from "framer-motion";
import { Package, ShoppingCart, DollarSign, TrendingUp, Users, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleProducts } from "@/data/products";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Products", value: sampleProducts.length, icon: Package, trend: "+12%" },
    { title: "Total Orders", value: 24, icon: ShoppingCart, trend: "+8%" },
    { title: "Revenue", value: "Rs. 45,600", icon: DollarSign, trend: "+23%" },
    { title: "Pending Orders", value: 5, icon: TrendingUp, trend: "-2%" },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "Ali Khan", total: 2499, status: "pending" },
    { id: "ORD-002", customer: "Fatima Ahmed", total: 3299, status: "processing" },
    { id: "ORD-003", customer: "Hassan Ali", total: 1899, status: "shipped" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
  };

  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back! Here's your store overview.">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Card className="border-border hover:border-accent/30 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-sans font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-secondary">
                  <stat.icon className="w-4 h-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-serif font-medium">{stat.value}</p>
                <p className={`text-xs font-sans mt-1 ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif font-medium">Recent Orders</CardTitle>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div>
                      <p className="font-sans font-medium text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans font-medium text-sm">Rs. {order.total.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-serif font-medium">Quick Stats</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm font-sans text-muted-foreground">Total Customers</span>
                  <span className="font-sans font-medium">156</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm font-sans text-muted-foreground">Avg. Order Value</span>
                  <span className="font-sans font-medium">Rs. 2,850</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm font-sans text-muted-foreground">Conversion Rate</span>
                  <span className="font-sans font-medium">3.2%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="text-sm font-sans text-muted-foreground">Return Rate</span>
                  <span className="font-sans font-medium">1.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;