import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-serif font-bold">TINYVERSE</h2>
            </Link>
            <p className="text-sm text-primary-foreground/70 mb-6 max-w-xs">
              Premium children's fashion for the little ones who deserve the best. 
              Quality, comfort, and style in every piece.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/new-arrivals" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/category/girls" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Girls
                </Link>
              </li>
              <li>
                <Link to="/category/boys" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Boys
                </Link>
              </li>
              <li>
                <Link to="/category/baby" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Baby
                </Link>
              </li>
              <li>
                <Link to="/category/sale" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/size-guide" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <a href="tel:+923001234567" className="hover:text-primary-foreground transition-colors">
                  +92 300 1234567
                </a>
              </li>
              <li>
                <a href="mailto:hello@tinyverse.pk" className="hover:text-primary-foreground transition-colors">
                  hello@tinyverse.pk
                </a>
              </li>
              <li className="pt-2">
                Lahore, Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} TinyVerse. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923001234567?text=Hi! I'm interested in your kids fashion products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-trust text-trust-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  );
};

export default Footer;