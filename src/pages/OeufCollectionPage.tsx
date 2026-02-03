import { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3x3, LayoutGrid, List, ChevronDown, X, SlidersHorizontal, Heart } from "lucide-react";
import OeufHeader from "@/components/OeufHeader";
import OeufFooter from "@/components/OeufFooter";
import { sampleProducts, categories } from "@/data/products";
import { Product } from "@/types";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";

type ViewMode = "large" | "medium" | "list";
type SortOption = "featured" | "best-selling" | "a-z" | "z-a" | "price-low" | "price-high" | "newest" | "oldest";

const OeufCollectionPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>("large");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Filter products by category
  const filteredProducts = sampleProducts.filter((product) => {
    if (slug && slug !== "all" && slug !== "sale") {
      return product.category === slug;
    }
    if (slug === "sale") {
      return product.salePrice !== undefined;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "best-selling":
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      case "a-z":
        return a.title.localeCompare(b.title);
      case "z-a":
        return b.title.localeCompare(a.title);
      case "price-low":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "price-high":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
  });

  const categoryName = slug === "all" ? "All Products" : 
                       slug === "sale" ? "Sale" :
                       categories.find((c) => c.slug === slug)?.name || "Collection";

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "featured", label: "Featured" },
    { value: "best-selling", label: "Best selling" },
    { value: "a-z", label: "Alphabetically, A-Z" },
    { value: "z-a", label: "Alphabetically, Z-A" },
    { value: "price-low", label: "Price, low to high" },
    { value: "price-high", label: "Price, high to low" },
    { value: "newest", label: "Date, new to old" },
    { value: "oldest", label: "Date, old to new" },
  ];

  const productTypes = ["Dresses", "Shirts", "Pants", "Rompers", "Jackets", "Party Wear"];
  const colors = [
    { name: "Navy", hex: "#1e3a5f" },
    { name: "Pink", hex: "#f8b4c4" },
    { name: "White", hex: "#ffffff" },
    { name: "Sage", hex: "#9cb4a3" },
    { name: "Cream", hex: "#f5f5dc" },
  ];

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`;

  const getBadges = (product: Product) => {
    const badges: string[] = [];
    if (product.isBestSeller) badges.push("BEST SELLER");
    if (product.isNew) badges.push("NEW ARRIVAL");
    if (product.price >= 3000) badges.push("FREE SHIPPING");
    return badges;
  };

  return (
    <div className="min-h-screen bg-background">
      <OeufHeader />

      <main>
        {/* Page Header */}
        <div className="py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-serif">{categoryName}</h1>
        </div>

        {/* Toolbar */}
        <div className="sticky top-20 z-40 bg-background border-y border-border">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between h-14">
              {/* Left: Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 text-xs tracking-wider hover:opacity-70 transition-opacity lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                FILTER
              </button>

              {/* View Mode (Desktop) */}
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setViewMode("large")}
                  className={`p-2 transition-colors ${viewMode === "large" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Large grid view"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("medium")}
                  className={`p-2 transition-colors ${viewMode === "medium" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Medium grid view"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Center: Product Count */}
              <p className="text-xs text-muted-foreground tracking-wider">
                {sortedProducts.length} products
              </p>

              {/* Right: Sort */}
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 text-xs tracking-wider hover:opacity-70 transition-opacity"
                >
                  Sort by
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 bg-background border border-border shadow-lg z-50 min-w-[200px]"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-3 text-xs tracking-wider hover:bg-secondary transition-colors ${
                            sortBy === option.value ? "bg-secondary" : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-8">
          <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-36 space-y-8">
                {/* Product Type */}
                <div>
                  <h3 className="text-xs tracking-[0.15em] font-medium mb-4 flex items-center justify-between cursor-pointer">
                    Product type
                    <ChevronDown className="w-4 h-4" />
                  </h3>
                  <div className="space-y-2">
                    {productTypes.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => {
                            setSelectedTypes((prev) =>
                              prev.includes(type)
                                ? prev.filter((t) => t !== type)
                                : [...prev, type]
                            );
                          }}
                          className="w-4 h-4 border-border rounded-none"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <h3 className="text-xs tracking-[0.15em] font-medium mb-4 flex items-center justify-between cursor-pointer">
                    Color
                    <ChevronDown className="w-4 h-4" />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setSelectedColors((prev) =>
                            prev.includes(color.name)
                              ? prev.filter((c) => c !== color.name)
                              : [...prev, color.name]
                          );
                        }}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedColors.includes(color.name)
                            ? "border-foreground scale-110"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-xs tracking-[0.15em] font-medium mb-4 flex items-center justify-between cursor-pointer">
                    Price
                    <ChevronDown className="w-4 h-4" />
                  </h3>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Rs."
                      className="w-20 px-2 py-1.5 border border-border text-sm bg-transparent"
                    />
                    <span className="text-muted-foreground">to</span>
                    <input
                      type="number"
                      placeholder="Rs."
                      className="w-20 px-2 py-1.5 border border-border text-sm bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div
              className={`grid gap-6 ${
                viewMode === "large"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : viewMode === "medium"
                  ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group ${viewMode === "list" ? "flex gap-6" : ""}`}
                >
                  {/* Image */}
                  <div
                    className={`relative bg-secondary overflow-hidden ${
                      viewMode === "list" ? "w-40 h-52 flex-shrink-0" : "aspect-[4/5] mb-4"
                    }`}
                  >
                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                      {getBadges(product).map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-1 text-[9px] tracking-wider font-medium bg-background/90"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Wishlist */}
                    <button
                      onClick={() => {
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product);
                        }
                      }}
                      className="absolute top-3 right-3 z-10 p-2 bg-background/80 hover:bg-background transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-foreground" : ""}`}
                      />
                    </button>

                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    {/* Quick Add */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          addToCart(product, 1, product.sizes[0]?.size || "One Size", product.colors[0]?.name || "Default");
                        }}
                        className="w-full py-3 bg-background text-foreground text-xs tracking-wider font-medium hover:bg-secondary transition-colors"
                      >
                        {product.colors.length > 1 ? "CHOOSE OPTIONS" : "ADD TO CART"}
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className={viewMode === "list" ? "flex-1" : "text-center"}>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-sm font-medium mb-2 hover:underline">{product.title}</h3>
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
        </div>
      </main>

      <OeufFooter />
    </div>
  );
};

export default OeufCollectionPage;
