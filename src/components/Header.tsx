import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, Menu, X, User } from "lucide-react";
import TinyVerseLogo from "./TinyVerseLogo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/category/boys", label: "Boys" },
    { href: "/category/girls", label: "Girls" },
    { href: "/category/baby", label: "Baby" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/sale", label: "Sale", highlight: true },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top announcement bar */}
      <div className="bg-trust text-trust-foreground py-2 px-4 text-center">
        <motion.p
          className="text-sm font-semibold"
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✅ پہلے چیک کریں، پھر ادائیگی کریں - First Check Then Pay! ✅
        </motion.p>
      </div>

      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20 px-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="mt-8">
                <TinyVerseLogo size="sm" />
                <nav className="mt-8 flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`text-lg font-medium transition-colors ${
                        isActive(link.href)
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      } ${link.highlight ? "text-coral" : ""}`}
                    >
                      {link.label}
                      {link.highlight && (
                        <Badge className="ml-2 bg-coral text-white">HOT</Badge>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <TinyVerseLogo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative group"
              >
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  } ${link.highlight ? "text-coral font-bold" : ""}`}
                >
                  {link.label}
                </span>
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
                {link.highlight && (
                  <span className="absolute -top-2 -right-4 text-[10px] bg-coral text-white px-1.5 py-0.5 rounded-full font-bold">
                    HOT
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative hidden md:block"
                >
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-8"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </AnimatePresence>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Admin Link (hidden on mobile) */}
            <Link to="/admin" className="hidden md:block">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
