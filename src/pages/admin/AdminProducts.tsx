import { Link } from "react-router-dom";
import { Package, ShoppingCart, TrendingUp, AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { sampleProducts } from "@/data/products";

const AdminProducts = () => (
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
              <Button variant={item.href === "/admin/products" ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                <item.icon className="w-4 h-4" />{item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Products ({sampleProducts.length})</h2>
          <Button className="gap-2"><Plus className="w-4 h-4" />Add Product</Button>
        </div>

        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <span className="font-medium">{product.title}</span>
                  </TableCell>
                  <TableCell className="capitalize">{product.category}</TableCell>
                  <TableCell>Rs. {(product.salePrice || product.price).toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell><Badge variant={product.stock > 10 ? "default" : "destructive"}>{product.stock > 10 ? "In Stock" : "Low Stock"}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  </div>
);

export default AdminProducts;
