import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OeufFooter = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/20">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif mb-2">
                Join the TinyVerse family
              </h3>
              <p className="text-sm text-background/60">
                Subscribe for exclusive offers, new arrivals, and style inspiration.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-background/30 text-background placeholder:text-background/50 rounded-none h-12"
              />
              <Button className="bg-background text-foreground hover:bg-background/90 rounded-none h-12 px-8 text-xs tracking-wider">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.15em] font-medium mb-4">SHOP</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/category/all" className="text-sm text-background/70 hover:text-background transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/category/girls" className="text-sm text-background/70 hover:text-background transition-colors">
                  Girls
                </Link>
              </li>
              <li>
                <Link to="/category/boys" className="text-sm text-background/70 hover:text-background transition-colors">
                  Boys
                </Link>
              </li>
              <li>
                <Link to="/category/baby" className="text-sm text-background/70 hover:text-background transition-colors">
                  Baby
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-sm text-background/70 hover:text-background transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs tracking-[0.15em] font-medium mb-4">ABOUT</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-background/70 hover:text-background transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-sm text-background/70 hover:text-background transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-sm text-background/70 hover:text-background transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-background/70 hover:text-background transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs tracking-[0.15em] font-medium mb-4">HELP</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-background/70 hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-background/70 hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-background/70 hover:text-background transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-background/70 hover:text-background transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-sm text-background/70 hover:text-background transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-[0.15em] font-medium mb-4">LEGAL</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-background/70 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-background/70 hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-sm text-background/70 hover:text-background transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-xs tracking-[0.15em] font-medium mb-4">CONTACT</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <a href="mailto:hello@tinyverse.pk" className="hover:text-background transition-colors">
                  hello@tinyverse.pk
                </a>
              </li>
              <li>
                <a href="tel:+923001234567" className="hover:text-background transition-colors">
                  +92 300 123 4567
                </a>
              </li>
              <li>Lahore, Pakistan</li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/tinyverse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/tinyverse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors text-sm"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-serif italic">TinyVerse</h2>
            <span className="text-[10px] italic text-background/60">be good</span>
          </div>
          <p className="text-xs text-background/60">
            © {new Date().getFullYear()} TinyVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default OeufFooter;
