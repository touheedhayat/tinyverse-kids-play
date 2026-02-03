import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Product } from "@/types";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

interface OeufProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const OeufProductCarousel = ({ title, products, viewAllLink }: OeufProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const formatPrice = (price: number) => {
    return `Rs. ${price.toLocaleString()}`;
  };

  const getBadges = (product: Product) => {
    const badges: string[] = [];
    if (product.isBestSeller) badges.push("BEST SELLER");
    if (product.isNew) badges.push("NEW ARRIVAL");
    if (product.salePrice) badges.push("SALE");
    return badges;
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-serif">{title}</h2>
          
          <div className="flex items-center gap-4">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="p-2 border border-border hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="p-2 border border-border hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-[0_0_280px] md:flex-[0_0_320px] lg:flex-[0_0_360px] group"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-secondary overflow-hidden mb-4">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {getBadges(product).map((badge) => (
                      <span
                        key={badge}
                        className="px-2 py-1 text-[9px] tracking-wider font-medium bg-background/90 text-foreground"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => {
                      if (isInWishlist(product.id)) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                    className="absolute top-3 right-3 z-10 p-2 bg-background/80 hover:bg-background transition-colors"
                    aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isInWishlist(product.id) ? "fill-foreground" : ""
                      }`}
                    />
                  </button>

                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={product.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    )}
                  </Link>

                  {/* Quick Add */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      onClick={() => {
                        addToCart(product, 1, product.sizes[0]?.size || "One Size", product.colors[0]?.name || "Default");
                      }}
                      className="w-full py-3 bg-background text-foreground text-xs tracking-wider font-medium hover:bg-secondary transition-colors"
                    >
                      {product.colors.length > 1 ? "CHOOSE OPTIONS" : "ADD TO CART"}
                    </button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="text-center">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium mb-2 hover:underline">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-center gap-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm font-medium text-destructive">
                          {formatPrice(product.salePrice)}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm">{formatPrice(product.price)}</span>
                    )}
                  </div>

                  {/* Color Swatches */}
                  {product.colors.length > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Link */}
        {viewAllLink && (
          <div className="text-center mt-12">
            <Link
              to={viewAllLink}
              className="inline-block text-xs tracking-[0.15em] font-medium border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
            >
              SHOP ALL
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OeufProductCarousel;
