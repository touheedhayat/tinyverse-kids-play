import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  Truck,
  RotateCcw,
  Share2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import TrustBadges from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleProducts } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "@/hooks/use-toast";

const ProductPage = () => {
  const { id } = useParams();
  const product = sampleProducts.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.size || "");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name || ""
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    toast({
      title: "Added to Cart! 🛒",
      description: `${quantity}x ${product.title} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from Wishlist" });
    } else {
      addToWishlist(product);
      toast({ title: "Added to Wishlist! ❤️" });
    }
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to order:\n\n` +
        `Product: ${product.title}\n` +
        `Size: ${selectedSize}\n` +
        `Color: ${selectedColor}\n` +
        `Quantity: ${quantity}\n` +
        `Price: Rs. ${(
          (product.salePrice || product.price) * quantity
        ).toLocaleString()}\n\n` +
        `Please confirm availability.`
    );
    window.open(`https://wa.me/923001234567?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
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
              </div>

              {/* Share Button */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => {
                  navigator.share?.({
                    title: product.title,
                    url: window.location.href,
                  });
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category */}
            <p className="text-sm text-muted-foreground capitalize">
              {product.category}
            </p>

            {/* Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-fredoka font-bold text-foreground mb-2">
                {product.title}
              </h1>
              {product.titleUrdu && (
                <p className="text-xl text-muted-foreground" dir="rtl">
                  {product.titleUrdu}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-bold text-coral">
                    Rs. {product.salePrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <Badge className="bg-coral text-white">
                    Save Rs. {(product.price - product.salePrice).toLocaleString()}
                  </Badge>
                </>
              ) : (
                <span className="text-3xl font-bold text-foreground">
                  Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Trust Message */}
            <motion.div
              className="bg-trust/10 border border-trust/30 rounded-2xl p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-trust rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-trust-foreground" />
                </div>
                <div>
                  <p className="font-bold text-trust" dir="rtl">
                    پہلے چیک کریں، پھر ادائیگی کریں
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Order with confidence - Check your items before paying!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Color Selection */}
            <div>
              <p className="font-semibold mb-3">
                Color: <span className="text-primary">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-primary ring-4 ring-primary/20 scale-110"
                        : "border-muted hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <p className="font-semibold mb-3">
                Size: <span className="text-primary">{selectedSize}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    disabled={size.stock === 0}
                    className={`px-4 py-2 rounded-xl border-2 transition-all ${
                      selectedSize === size.size
                        ? "border-primary bg-primary text-primary-foreground"
                        : size.stock === 0
                        ? "border-muted text-muted-foreground opacity-50 cursor-not-allowed"
                        : "border-muted hover:border-primary"
                    }`}
                  >
                    <span className="font-semibold">{size.size}</span>
                    {size.ageRange && (
                      <span className="text-xs block opacity-70">
                        {size.ageRange}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-semibold mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-xl">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 gap-2 rounded-xl text-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`gap-2 rounded-xl ${
                  inWishlist ? "text-primary border-primary" : ""
                }`}
                onClick={handleWishlist}
              >
                <Heart
                  className={`w-5 h-5 ${inWishlist ? "fill-primary" : ""}`}
                />
                {inWishlist ? "Saved" : "Wishlist"}
              </Button>
            </div>

            {/* WhatsApp Order */}
            <Button
              size="lg"
              className="w-full bg-trust hover:bg-trust/90 gap-2 rounded-xl text-lg"
              onClick={handleWhatsAppOrder}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </Button>

            {/* Delivery Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    Orders over Rs. 2000
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">Within 7 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <ProductGrid
            title="You May Also Like"
            subtitle="Similar products you might love"
            filter="all"
            limit={4}
            showViewAll={false}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
