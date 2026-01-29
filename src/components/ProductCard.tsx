import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(
      product,
      1,
      product.sizes[0]?.size || "One Size",
      product.colors[0]?.name || "Default"
    );
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
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
        <div className="relative overflow-hidden bg-secondary/30 aspect-[3/4] mb-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1">
                NEW
              </span>
            )}
            {product.salePrice && (
              <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2.5 py-1">
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              inWishlist 
                ? "bg-primary text-primary-foreground" 
                : "bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>

          {/* Quick Add */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button 
              onClick={handleAddToCart}
              className="w-full gap-2"
              size="sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
          
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-sm font-semibold text-foreground">
                  Rs. {product.salePrice.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  Rs. {product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-foreground">
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