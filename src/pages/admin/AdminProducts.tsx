import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { sampleProducts } from "@/data/products";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminProducts = () => {
  return (
    <AdminLayout title="Products" subtitle={`Manage your ${sampleProducts.length} products`}>
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
            placeholder="Search products..." 
            className="pl-10 font-sans"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 font-sans">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="gap-2 font-sans">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div 
        className="bg-card rounded-lg border border-border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="font-sans font-medium">Product</TableHead>
              <TableHead className="font-sans font-medium">Category</TableHead>
              <TableHead className="font-sans font-medium">Price</TableHead>
              <TableHead className="font-sans font-medium">Stock</TableHead>
              <TableHead className="font-sans font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleProducts.map((product, index) => (
              <motion.tr
                key={product.id}
                className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}
              >
                <TableCell className="flex items-center gap-3">
                  <motion.img 
                    src={product.images[0]} 
                    alt="" 
                    className="w-12 h-12 rounded-lg object-cover border border-border"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div>
                    <span className="font-sans font-medium text-sm">{product.title}</span>
                    <p className="text-xs text-muted-foreground">SKU-{product.id}</p>
                  </div>
                </TableCell>
                <TableCell className="capitalize font-sans text-sm text-muted-foreground">
                  {product.category}
                </TableCell>
                <TableCell className="font-sans text-sm">
                  {product.salePrice ? (
                    <div>
                      <span className="font-medium">Rs. {product.salePrice.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground line-through ml-2">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <span className="font-medium">Rs. {product.price.toLocaleString()}</span>
                  )}
                </TableCell>
                <TableCell className="font-sans text-sm">{product.stock}</TableCell>
                <TableCell>
                  <Badge 
                    variant={product.stock > 10 ? "default" : "destructive"}
                    className="font-sans text-xs"
                  >
                    {product.stock > 10 ? "In Stock" : "Low Stock"}
                  </Badge>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminProducts;