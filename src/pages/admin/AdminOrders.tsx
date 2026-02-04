import { motion } from "framer-motion";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/admin/AdminLayout";

const orders = [
  { id: "ORD-001", customer: "Ali Khan", email: "ali@email.com", total: 2499, status: "pending", date: "2024-01-15", items: 2 },
  { id: "ORD-002", customer: "Fatima Ahmed", email: "fatima@email.com", total: 3299, status: "processing", date: "2024-01-14", items: 3 },
  { id: "ORD-003", customer: "Hassan Ali", email: "hassan@email.com", total: 1899, status: "shipped", date: "2024-01-13", items: 1 },
  { id: "ORD-004", customer: "Sara Malik", email: "sara@email.com", total: 4599, status: "delivered", date: "2024-01-12", items: 4 },
  { id: "ORD-005", customer: "Ahmed Raza", email: "ahmed@email.com", total: 2199, status: "pending", date: "2024-01-11", items: 2 },
];

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  processing: "bg-blue-100 text-blue-700 border-blue-200",
  shipped: "bg-purple-100 text-purple-700 border-purple-200",
  delivered: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

const AdminOrders = () => {
  return (
    <AdminLayout title="Orders" subtitle={`${orders.length} orders total`}>
      {/* Actions Bar */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders by ID or customer..." 
            className="pl-10 font-sans"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 font-sans">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 font-sans">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div 
        className="bg-card rounded-lg border border-border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="font-sans font-medium">Order ID</TableHead>
              <TableHead className="font-sans font-medium">Customer</TableHead>
              <TableHead className="font-sans font-medium">Items</TableHead>
              <TableHead className="font-sans font-medium">Total</TableHead>
              <TableHead className="font-sans font-medium">Status</TableHead>
              <TableHead className="font-sans font-medium">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <motion.tr
                key={order.id}
                className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}
              >
                <TableCell className="font-sans font-medium text-sm">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <span className="font-sans font-medium text-sm">{order.customer}</span>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell className="font-sans text-sm text-muted-foreground">
                  {order.items} {order.items === 1 ? 'item' : 'items'}
                </TableCell>
                <TableCell className="font-sans font-medium text-sm">
                  Rs. {order.total.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={`font-sans text-xs capitalize ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-sans text-sm text-muted-foreground">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminOrders;