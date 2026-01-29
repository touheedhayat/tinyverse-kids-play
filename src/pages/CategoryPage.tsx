import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { sampleProducts, categories } from "@/data/products";

const CategoryPage = () => {
  const { slug } = useParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const category = categories.find((c) => c.slug === slug);
  const isAllCategory = slug === "all";

  // Filter products
  let filteredProducts = isAllCategory
    ? sampleProducts
    : sampleProducts.filter((p) => p.category === slug);

  if (selectedAges.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      p.ageGroup.some((age) => selectedAges.includes(age))
    );
  }

  // Sort products
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort(
        (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
      );
      break;
    case "price-high":
      filteredProducts.sort(
        (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
      );
      break;
    case "popular":
      filteredProducts.sort((a, b) =>
        a.isBestSeller === b.isBestSeller ? 0 : a.isBestSeller ? -1 : 1
      );
      break;
    case "newest":
    default:
      filteredProducts.sort((a, b) =>
        a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
      );
  }

  const ageGroups = [
    "0-3 months",
    "3-6 months",
    "6-12 months",
    "1-2 years",
    "2-3 years",
    "3-4 years",
    "4-5 years",
    "5-6 years",
    "6-7 years",
    "7-8 years",
  ];

  const toggleAge = (age: string) => {
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const clearFilters = () => {
    setSelectedAges([]);
    setSelectedSizes([]);
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Age Group</h3>
        <div className="space-y-2">
          {ageGroups.map((age) => (
            <div key={age} className="flex items-center gap-2">
              <Checkbox
                id={age}
                checked={selectedAges.includes(age)}
                onCheckedChange={() => toggleAge(age)}
              />
              <label htmlFor={age} className="text-sm cursor-pointer">
                {age}
              </label>
            </div>
          ))}
        </div>
      </div>

      {(selectedAges.length > 0 || selectedSizes.length > 0) && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Sticky Trust Badge */}
      <div className="sticky top-[104px] z-40 bg-trust/10 backdrop-blur-sm border-b border-trust/20">
        <div className="container mx-auto px-4 py-2">
          <TrustBadges variant="compact" />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-fredoka font-bold text-foreground mb-2">
            {isAllCategory
              ? "All Products"
              : category?.name || "Category"}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-[180px] bg-card rounded-2xl p-6 shadow-card">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>
              <FilterSidebar />
            </div>
          </aside>

          {/* Products Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Active Filters */}
                {selectedAges.length > 0 && (
                  <div className="hidden md:flex items-center gap-2">
                    {selectedAges.slice(0, 3).map((age) => (
                      <Badge key={age} variant="secondary" className="gap-1">
                        {age}
                        <button
                          onClick={() => toggleAge(age)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedAges.length > 3 && (
                      <Badge variant="outline">+{selectedAges.length - 3} more</Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="hidden md:flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found with current filters.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
