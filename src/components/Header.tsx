import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();

  const navLinks = [
    { name: "Shop All", path: "/category/all" },
    { name: "Girls", path: "/category/girls" },
    { name: "Boys", path: "/category/boys" },
    { name: "Baby", path: "/category/baby" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Sale", path: "/category/sale" },
  ];

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs tracking-widest uppercase">
        Free Shipping on Orders Over Rs. 2,000 | Check Before You Pay
      </div>

      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="px-4 md:px-8 lg:px-12">
          {/* Main Header */}
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left - Navigation (Desktop) / Menu (Mobile) */}
            <div className="flex items-center gap-8">
              <button
                className="lg:hidden p-2 -ml-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs tracking-wider uppercase transition-colors hover:text-muted-foreground ${
                      location.pathname === link.path
                        ? "text-foreground"
                        : "text-foreground/70"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="text-2xl md:text-3xl font-serif font-normal tracking-wide text-foreground italic">
                TinyVerse
              </h1>
            </Link>

            {/* Right - Actions */}
            <div className="flex items-center gap-4">
              <nav className="hidden lg:flex items-center gap-6 mr-4">
                {navLinks.slice(4).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs tracking-wider uppercase transition-colors hover:text-muted-foreground ${
                      location.pathname === link.path
                        ? "text-foreground"
                        : "text-foreground/70"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/wishlist"
                className="p-2 hover:opacity-70 transition-opacity relative"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="p-2 hover:opacity-70 transition-opacity relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="py-6 px-4 md:px-8">
                <div className="relative max-w-md mx-auto">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="w-full h-12 pl-4 pr-12 text-sm border-0 border-b border-foreground/20 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-foreground"
                    autoFocus
                  />
                  <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-border overflow-hidden bg-background"
            >
              <nav className="py-6 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 text-sm tracking-wider uppercase transition-colors border-b border-border/50 ${
                      location.pathname === link.path
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-sm tracking-wider uppercase text-foreground/60 hover:text-foreground"
                >
                  Admin
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
