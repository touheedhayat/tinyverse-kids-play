import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "@/hooks/use-toast";

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
    e.stopPropagation();
    addToCart(
      product,
      1,
      product.sizes[0]?.size || "One Size",
      product.colors[0]?.name || "Default"
    );
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist! ❤️",
        description: `${product.title} has been added to your wishlist.`,
      });
    }
  };

  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-sky-blue text-foreground font-bold">
                  NEW
                </Badge>
              )}
              {product.salePrice && (
                <Badge className="bg-coral text-white font-bold">
                  -{discountPercentage}%
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge className="bg-sunshine text-foreground font-bold">
                  BEST SELLER
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlist}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  inWishlist
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white text-foreground hover:bg-secondary shadow-md transition-colors"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Add to Cart Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <p className="text-xs text-muted-foreground capitalize mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
              {product.title}
            </h3>
            {product.titleUrdu && (
              <p className="text-sm text-muted-foreground mb-2" dir="rtl">
                {product.titleUrdu}
              </p>
            )}

            {/* Color Options */}
            <div className="flex gap-1 mb-3">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              {product.salePrice ? (
                <>
                  <span className="font-bold text-lg text-coral">
                    Rs. {product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    Rs. {product.price.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="font-bold text-lg text-foreground">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Size Options */}
            <div className="flex gap-1 mt-2">
              {product.sizes.slice(0, 3).map((size) => (
                <span
                  key={size.size}
                  className="text-xs px-2 py-1 bg-muted rounded-md"
                >
                  {size.size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-xs px-2 py-1 text-muted-foreground">
                  +{product.sizes.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
