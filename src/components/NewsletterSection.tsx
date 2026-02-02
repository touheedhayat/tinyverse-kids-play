import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Decorative Element */}
            <div className="flex justify-center mb-6">
              <span className="text-accent text-2xl">✦</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif italic text-foreground mb-4">
              Join the TinyVerse Family
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto">
              Subscribe for exclusive offers, new arrivals, and styling tips delivered to your inbox.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-4 bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-foreground transition-colors"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-foreground text-background text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-foreground/90 transition-colors"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      Subscribed
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            {/* Trust Note */}
            <p className="text-xs text-muted-foreground mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
