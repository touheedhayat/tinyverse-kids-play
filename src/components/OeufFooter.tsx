import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TinyVerseLogo from "@/components/TinyVerseLogo";

const OeufFooter = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-14 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-background/50 uppercase mb-3">Stay Connected</p>
              <h3 className="text-2xl md:text-3xl font-serif italic mb-2">
                Join the TinyVerse Family
              </h3>
              <p className="text-sm text-background/50 max-w-md">
                Subscribe for exclusive offers, new arrivals, and style inspiration delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-transparent border-background/20 text-background placeholder:text-background/35 rounded-none h-12 focus:border-background/50"
              />
              <Button className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground rounded-none h-12 px-8 text-[10px] tracking-[0.2em] transition-colors duration-300">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-medium mb-5 text-background/80">SHOP</h4>
            <ul className="space-y-3">
              {["All Products", "Girls", "Boys", "Baby", "Sale"].map((item) => (
                <li key={item}>
                  <Link to={`/category/${item.toLowerCase()}`} className="text-sm text-background/50 hover:text-background transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-medium mb-5 text-background/80">ABOUT</h4>
            <ul className="space-y-3">
              {[
                { name: "Our Story", path: "/about" },
                { name: "Sustainability", path: "/sustainability" },
                { name: "Press", path: "/press" },
                { name: "Careers", path: "/careers" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-background/50 hover:text-background transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-medium mb-5 text-background/80">HELP</h4>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", path: "/contact" },
                { name: "FAQ", path: "/faq" },
                { name: "Shipping", path: "/shipping" },
                { name: "Returns", path: "/returns" },
                { name: "Size Guide", path: "/size-guide" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-background/50 hover:text-background transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[0.2em] font-medium mb-5 text-background/80">LEGAL</h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Accessibility", path: "/accessibility" },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-background/50 hover:text-background transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-[10px] tracking-[0.2em] font-medium mb-5 text-background/80">CONTACT</h4>
            <ul className="space-y-3 text-sm text-background/50">
              <li><a href="mailto:hello@tinyverse.pk" className="hover:text-background transition-colors">hello@tinyverse.pk</a></li>
              <li><a href="tel:+923001234567" className="hover:text-background transition-colors">+92 300 123 4567</a></li>
              <li>Lahore, Pakistan</li>
            </ul>
            <div className="flex gap-5 mt-6">
              {["Instagram", "Facebook", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com/tinyverse`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/40 hover:text-background transition-colors text-xs tracking-wider"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <TinyVerseLogo size="sm" variant="light" />
          <p className="text-[11px] text-background/40 tracking-wider">
            © {new Date().getFullYear()} TinyVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default OeufFooter;
