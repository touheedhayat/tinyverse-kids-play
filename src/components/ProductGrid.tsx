import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
      <div className="px-4 md:px-8 lg:px-12">
        {/* Section Header - Centered, Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-serif italic text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Link */}
        {showViewAll && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to={viewAllLink}
              className="inline-block text-sm tracking-wider uppercase border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
            >
              View All
            </Link>
          </motion.div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
