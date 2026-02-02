import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Product } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  // Calculate sale percentage
  const salePercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  // Get secondary image if available
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <motion.div 
          className="relative overflow-hidden aspect-[3/4] bg-secondary/30 mb-4"
          whileHover={{ 
            boxShadow: "0 10px 40px -15px rgba(0,0,0,0.15)",
            y: -4
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full" />
          )}

          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={product.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered && secondaryImage !== primaryImage ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Secondary Image (on hover) */}
          {secondaryImage !== primaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.title} - alternate view`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <motion.span 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-foreground text-background text-[10px] tracking-wider uppercase px-2 py-1"
              >
                New
              </motion.span>
            )}
            {product.isBestSeller && (
              <motion.span 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-background text-foreground text-[10px] tracking-wider uppercase px-2 py-1"
              >
                Best Seller
              </motion.span>
            )}
            {salePercentage > 0 && (
              <motion.span 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-accent text-accent-foreground text-[10px] tracking-wider uppercase px-2 py-1"
              >
                -{salePercentage}%
              </motion.span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all ${
              inWishlist 
                ? "bg-foreground text-background" 
                : "bg-background/90 text-foreground opacity-0 group-hover:opacity-100"
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
          </motion.button>

          {/* Quick Add - Shows on Hover */}
          <motion.button
            onClick={handleQuickAdd}
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: isHovered ? 0 : 20, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3 py-3 bg-background text-foreground text-xs tracking-wider uppercase text-center hover:bg-foreground hover:text-background transition-colors"
          >
            Quick Add
          </motion.button>
        </motion.div>

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

          {/* Colors with hover effect */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 pt-1">
              {product.colors.slice(0, 4).map((color, colorIndex) => (
                <motion.div
                  key={color.name}
                  whileHover={{ scale: 1.3 }}
                  className="w-3.5 h-3.5 border border-border cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + colorIndex * 0.05 }}
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
