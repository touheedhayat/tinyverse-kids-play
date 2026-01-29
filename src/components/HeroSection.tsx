import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center min-h-[600px] py-12 lg:py-0">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <span className="inline-block text-sm font-medium tracking-widest uppercase text-primary/70 mb-4">
              New Collection 2025
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Timeless Style
              <br />
              <span className="text-primary">for Little Ones</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8">
              Discover our curated collection of premium children's clothing. 
              Quality craftsmanship meets playful elegance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/category/all">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base h-12 px-8">
                  Shop Collection
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/new-arrivals">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-base h-12 px-8 border-primary/30 hover:bg-primary/5"
                >
                  New Arrivals
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 pt-10 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="w-5 h-5 text-trust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Check Before Pay</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="w-5 h-5 text-trust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Free Shipping 2000+</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="w-5 h-5 text-trust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Easy Returns</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[600px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80"
                alt="Kids Fashion"
                className="w-full h-full object-cover"
              />
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm px-6 py-4 shadow-lg"
              >
                <p className="text-xs font-medium tracking-wider uppercase text-muted-foreground mb-1">
                  Premium Quality
                </p>
                <p className="text-lg font-serif font-semibold text-foreground">
                  100% Cotton Collection
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;