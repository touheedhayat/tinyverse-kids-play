import { useState, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, Check } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import OeufHeader from "@/components/OeufHeader";
import OeufFooter from "@/components/OeufFooter";
import OeufProductCarousel from "@/components/OeufProductCarousel";
import { sampleProducts } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const OeufProductPage = () => {
  const { id } = useParams();
  const product = sampleProducts.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    axis: "y",
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const relatedProducts = sampleProducts.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ).slice(0, 6);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <OeufHeader />
        <div className="max-w-[1800px] mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-serif mb-4">Product not found</h1>
          <Link to="/category/all" className="text-sm underline">
            Continue shopping
          </Link>
        </div>
        <OeufFooter />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success("Added to cart!");
  };

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const getBadges = () => {
    const badges: string[] = [];
    if (product.price >= 3000) badges.push("FREE SHIPPING");
    if (product.isBestSeller) badges.push("BEST SELLER");
    return badges;
  };

  // Generate multiple images for demo (since we only have 1 image per product)
  const productImages = product.images.length > 1 
    ? product.images 
    : [product.images[0], product.images[0], product.images[0], product.images[0]];

  return (
    <div className="min-h-screen bg-background">
      <OeufHeader />

      <main className="max-w-[1800px] mx-auto px-6 lg:px-10 py-8 lg:py-16">
        <div className="lg:grid lg:grid-cols-[auto_1fr_1fr] lg:gap-8">
          {/* Thumbnail Navigation - Oeuf Style */}
          <div className="hidden lg:block w-20">
            <div ref={thumbsRef} className="overflow-hidden h-[600px]">
              <div className="flex flex-col gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 aspect-[4/5] border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-foreground"
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative mb-8 lg:mb-0">
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/5] bg-secondary overflow-hidden"
            >
              <img
                src={productImages[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Mobile Image Navigation */}
            <div className="lg:hidden flex justify-center gap-2 mt-4">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    selectedImageIndex === index ? "bg-foreground" : "bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:max-w-md lg:pt-4">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {getBadges().map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 text-[9px] tracking-wider font-medium bg-secondary"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Title & Price */}
            <h1 className="text-2xl md:text-3xl font-serif mb-4">{product.title}</h1>
            
            {/* Reviews placeholder */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-foreground">★</span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground underline cursor-pointer">
                3 reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xl font-medium text-destructive">
                    {formatPrice(product.salePrice)}
                  </span>
                </div>
              ) : (
                <span className="text-xl">{formatPrice(product.price)}</span>
              )}
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-xs tracking-wider mb-3">
                  Color: <span className="font-medium">{selectedColor}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? "border-foreground scale-110"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Description Accordion */}
            <div className="border-y border-border mb-6">
              <button
                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                className="w-full flex items-center justify-between py-4 text-xs tracking-[0.15em] font-medium"
              >
                DESCRIPTION
                <Plus className={`w-4 h-4 transition-transform ${isDescriptionOpen ? "rotate-45" : ""}`} />
              </button>
              <AnimatePresence>
                {isDescriptionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {product.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Popular Add-Ons */}
            <div className="mb-6">
              <p className="text-xs tracking-wider mb-3">Popular Add-Ons</p>
              <div className="space-y-3">
                {relatedProducts.slice(0, 2).map((addon) => (
                  <label
                    key={addon.id}
                    className="flex items-center gap-4 p-3 border border-border cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <input type="checkbox" className="w-4 h-4" />
                    <img
                      src={addon.images[0]}
                      alt={addon.title}
                      className="w-16 h-16 object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{addon.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(addon.salePrice || addon.price)}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs tracking-wider">Size</p>
                <button className="text-xs underline text-muted-foreground hover:text-foreground">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    disabled={size.stock === 0}
                    className={`px-4 py-2 border text-sm transition-all ${
                      selectedSize === size.size
                        ? "border-foreground bg-foreground text-background"
                        : size.stock === 0
                        ? "border-border text-muted-foreground/50 cursor-not-allowed line-through"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-6">
              {/* Quantity */}
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                className="flex-1 rounded-none h-12 text-xs tracking-wider"
              >
                ADD TO CART
              </Button>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => {
                if (isInWishlist(product.id)) {
                  removeFromWishlist(product.id);
                  toast.success("Removed from wishlist");
                } else {
                  addToWishlist(product);
                  toast.success("Added to wishlist");
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 border border-border text-xs tracking-wider hover:bg-secondary transition-colors"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-foreground" : ""}`} />
              {isInWishlist(product.id) ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <OeufProductCarousel
              title="You may also like"
              products={relatedProducts}
            />
          </div>
        )}
      </main>

      <OeufFooter />
    </div>
  );
};

export default OeufProductPage;
