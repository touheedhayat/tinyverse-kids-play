import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(
      product,
      1,
      product.sizes[0]?.size || "One Size",
      product.colors[0]?.name || "Default"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-[3/4] bg-secondary/30 mb-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-foreground text-background text-[10px] tracking-wider uppercase px-2 py-1">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-background text-foreground text-[10px] tracking-wider uppercase px-2 py-1">
                Best Seller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              inWishlist 
                ? "bg-foreground text-background" 
                : "bg-background/90 text-foreground opacity-0 group-hover:opacity-100"
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>

          {/* Quick Add - Shows on Hover */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 left-3 right-3 py-3 bg-background text-foreground text-xs tracking-wider uppercase text-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-foreground hover:text-background"
          >
            Quick Add
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          <h3 className="text-sm text-foreground line-clamp-1">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-sm text-foreground">
                  Rs. {product.salePrice.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-sm text-foreground">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1 pt-1">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
