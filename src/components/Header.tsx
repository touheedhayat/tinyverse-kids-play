import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Girls", path: "/category/girls" },
    { name: "Boys", path: "/category/boys" },
    { name: "Baby", path: "/category/baby" },
    { name: "Sale", path: "/category/sale" },
  ];

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2.5 text-sm font-medium tracking-wide">
        <span>FREE SHIPPING ON ORDERS OVER RS. 2,000</span>
        <span className="mx-3">|</span>
        <span className="font-semibold">CHECK BEFORE YOU PAY</span>
      </div>

      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto">
          {/* Main Header */}
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-primary">
                TINYVERSE
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground/70"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 hover:bg-secondary rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/wishlist"
                className="p-2.5 hover:bg-secondary rounded-full transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="p-2.5 hover:bg-secondary rounded-full transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link
                to="/admin"
                className="hidden md:flex p-2.5 hover:bg-secondary rounded-full transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
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
                <div className="py-4">
                  <div className="relative max-w-xl mx-auto">
                    <Input
                      type="text"
                      placeholder="Search for products..."
                      className="w-full h-12 pl-12 pr-4 text-base border-primary/20 focus:border-primary"
                      autoFocus
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden bg-background"
            >
              <nav className="py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium tracking-wide uppercase transition-colors ${
                      location.pathname === link.path
                        ? "text-primary bg-secondary"
                        : "text-foreground/70 hover:text-primary hover:bg-secondary/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium tracking-wide uppercase text-foreground/70 hover:text-primary hover:bg-secondary/50"
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