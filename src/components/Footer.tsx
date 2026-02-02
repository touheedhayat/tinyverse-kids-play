import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, MessageCircle, CreditCard, Banknote } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: MessageCircle, href: "https://wa.me/923001234567", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-secondary/30">
      <div className="px-4 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-serif italic text-foreground">TinyVerse</h2>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Premium children's fashion crafted with love, 
              designed for comfort, and made to last.
            </p>
            {/* Animated Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs tracking-wider uppercase text-foreground mb-6">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/all" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/category/girls" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Girls
                </Link>
              </li>
              <li>
                <Link to="/category/boys" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Boys
                </Link>
              </li>
              <li>
                <Link to="/category/baby" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Baby
                </Link>
              </li>
              <li>
                <Link to="/category/sale" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs tracking-wider uppercase text-foreground mb-6">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/size-guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-wider uppercase text-foreground mb-6">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="tel:+923001234567" className="hover:text-foreground transition-colors">
                  +92 300 1234567
                </a>
              </li>
              <li>
                <a href="mailto:hello@tinyverse.pk" className="hover:text-foreground transition-colors">
                  hello@tinyverse.pk
                </a>
              </li>
              <li className="pt-2">
                Lahore, Pakistan
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="text-xs tracking-wider uppercase text-foreground mb-3">We Accept</h4>
              <div className="flex gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-7 bg-background border border-border flex items-center justify-center"
                  title="Credit/Debit Card"
                >
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-7 bg-background border border-border flex items-center justify-center"
                  title="Cash on Delivery"
                >
                  <Banknote className="w-5 h-5 text-muted-foreground" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-7 bg-background border border-border flex items-center justify-center text-[10px] font-medium text-muted-foreground"
                  title="EasyPaisa"
                >
                  EP
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-7 bg-background border border-border flex items-center justify-center text-[10px] font-medium text-muted-foreground"
                  title="JazzCash"
                >
                  JC
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {currentYear} TinyVerse. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button with Pulse */}
      <motion.a
        href="https://wa.me/923001234567?text=Hi! I'm interested in your products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(37, 211, 102, 0.4)",
            "0 0 0 15px rgba(37, 211, 102, 0)",
            "0 0 0 0 rgba(37, 211, 102, 0)",
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
          },
        }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    </footer>
  );
};

export default Footer;
