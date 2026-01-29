import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { sampleProducts } from "@/data/products";

interface ProductGridProps {
  title: string;
  subtitle?: string;
  filter: "new" | "featured" | "bestSeller" | "sale" | "all";
  limit?: number;
  showViewAll?: boolean;
  viewAllLink?: string;
}

const ProductGrid = ({
  title,
  subtitle,
  filter,
  limit = 4,
  showViewAll = true,
  viewAllLink = "/category/all",
}: ProductGridProps) => {
  const getFilteredProducts = () => {
    switch (filter) {
      case "new":
        return sampleProducts.filter((p) => p.isNew);
      case "featured":
        return sampleProducts.filter((p) => p.isFeatured);
      case "bestSeller":
        return sampleProducts.filter((p) => p.isBestSeller);
      case "sale":
        return sampleProducts.filter((p) => p.salePrice);
      default:
        return sampleProducts;
    }
  };

  const products = getFilteredProducts().slice(0, limit);

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground mt-2 max-w-md">{subtitle}</p>
            )}
          </div>

          {showViewAll && (
            <Link to={viewAllLink}>
              <Button variant="ghost" className="gap-2 group text-sm font-medium">
                View All
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;