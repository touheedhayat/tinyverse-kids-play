import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, ChevronDown, X, Menu } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import TinyVerseLogo from "@/components/TinyVerseLogo";
import MarqueeBar from "@/components/MarqueeBar";

interface NavItem {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
}

const navigation: NavItem[] = [
  {
    name: "SHOP ALL",
    path: "/category/all",
    children: [
      { name: "All Products", path: "/category/all" },
      { name: "New Arrivals", path: "/new-arrivals" },
      { name: "Best Sellers", path: "/category/all?sort=popular" },
      { name: "Sale", path: "/sale" },
    ],
  },
  {
    name: "GIRLS",
    path: "/category/girls",
    children: [
      { name: "All Girls", path: "/category/girls" },
      { name: "Dresses", path: "/category/girls?type=dresses" },
      { name: "Tops & Shirts", path: "/category/girls?type=tops" },
      { name: "Bottoms", path: "/category/girls?type=bottoms" },
      { name: "Party Wear", path: "/category/girls?type=party" },
    ],
  },
  {
    name: "BOYS",
    path: "/category/boys",
    children: [
      { name: "All Boys", path: "/category/boys" },
      { name: "Shirts & Polos", path: "/category/boys?type=shirts" },
      { name: "Pants & Shorts", path: "/category/boys?type=pants" },
      { name: "Jackets", path: "/category/boys?type=jackets" },
      { name: "Formal Wear", path: "/category/boys?type=formal" },
    ],
  },
  {
    name: "BABY",
    path: "/category/baby",
    children: [
      { name: "All Baby", path: "/category/baby" },
      { name: "Rompers", path: "/category/baby?type=rompers" },
      { name: "Onesies", path: "/category/baby?type=onesies" },
      { name: "Sets", path: "/category/baby?type=sets" },
      { name: "Accessories", path: "/category/baby?type=accessories" },
    ],
  },
  { name: "SALE", path: "/sale" },
  {
    name: "ABOUT",
    path: "/about",
    children: [
      { name: "Our Story", path: "/about" },
      { name: "Sustainability", path: "/about#sustainability" },
      { name: "Contact Us", path: "/contact" },
    ],
  },
];

const OeufHeader = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      {/* Marquee Announcement Bar */}
      <MarqueeBar />

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between h-20 px-6 lg:px-10">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <TinyVerseLogo size="md" showTagline />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1 px-12">
              <ul className="flex items-center gap-1">
                {navigation.map((item) => (
                  <li
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.children && handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-1 px-4 py-2 text-[11px] tracking-[0.14em] font-medium transition-colors hover:text-accent ${
                        location.pathname === item.path ? "text-foreground" : "text-foreground/75"
                      }`}
                    >
                      {item.name}
                      {item.children && (
                        <ChevronDown
                          className="w-3 h-3 transition-transform duration-200"
                          style={{ transform: activeMenu === item.name ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      )}
                    </Link>

                    <AnimatePresence>
                      {item.children && activeMenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2 z-50"
                          onMouseEnter={() => handleMouseEnter(item.name)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="bg-background border border-border shadow-xl min-w-[220px] py-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className="block px-5 py-2.5 text-[11px] tracking-[0.08em] hover:bg-secondary hover:text-accent transition-colors"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:text-accent transition-colors" aria-label="Search">
                <Search className="w-[18px] h-[18px]" />
              </button>
              <Link to="/account" className="hidden sm:flex p-2 hover:text-accent transition-colors" aria-label="Account">
                <User className="w-[18px] h-[18px]" />
              </Link>
              <Link to="/wishlist" className="p-2 hover:text-accent transition-colors relative" aria-label="Wishlist">
                <Heart className="w-[18px] h-[18px]" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-semibold rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="p-2 hover:text-accent transition-colors relative" aria-label="Cart">
                <ShoppingBag className="w-[18px] h-[18px]" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-semibold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <nav className="py-4 px-6 bg-background">
                {navigation.map((item) => (
                  <div key={item.name} className="border-b border-border/30 last:border-0">
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3.5 text-sm tracking-[0.1em] hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="pl-4 pb-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-xs tracking-wider text-muted-foreground hover:text-accent"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-sm"
          >
            <div className="max-w-2xl mx-auto pt-32 px-6">
              <button onClick={() => setIsSearchOpen(false)} className="absolute top-6 right-6 p-2 hover:text-accent transition-colors" aria-label="Close search">
                <X className="w-6 h-6" />
              </button>

              <motion.div 
                className="relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent border-b-2 border-foreground text-2xl md:text-3xl py-4 outline-none placeholder:text-muted-foreground/50 font-serif italic"
                  autoFocus
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </motion.div>

              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-[10px] text-muted-foreground mt-8 tracking-[0.2em]">POPULAR SEARCHES</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Dresses", "Polo Shirts", "Baby Rompers", "Party Wear", "Sale"].map((term) => (
                    <Link
                      key={term}
                      to={`/search?q=${term.toLowerCase()}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="px-4 py-2 border border-border text-xs tracking-wider hover:bg-foreground hover:text-background transition-colors duration-200"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OeufHeader;
