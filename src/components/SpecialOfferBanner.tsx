import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SpecialOfferBanner = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left - Large Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1000&q=80"
              alt="Sale Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
            
            {/* Content Box */}
            <div className="absolute bottom-6 left-6 bg-background px-8 py-6">
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Up to 50% Off
              </p>
              <h3 className="text-2xl font-serif italic text-foreground mb-4">
                Winter Sale
              </h3>
              <Link
                to="/category/sale"
                className="inline-block text-xs tracking-wider uppercase border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
              >
                Shop Sale
              </Link>
            </div>
          </motion.div>

          {/* Right - Two Stacked Images */}
          <div className="grid grid-rows-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden group"
            >
              <Link to="/category/girls">
                <img
                  src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80"
                  alt="Girls Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-background px-4 py-2 text-xs tracking-wider uppercase">
                    Girls Collection
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden group"
            >
              <Link to="/new-arrivals">
                <img
                  src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80"
                  alt="New Arrivals"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-background px-4 py-2 text-xs tracking-wider uppercase">
                    New Arrivals
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferBanner;
