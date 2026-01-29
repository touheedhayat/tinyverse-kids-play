import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SpecialOfferBanner = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary/50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&q=80"
              alt="Special Offer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6 bg-destructive text-destructive-foreground px-4 py-2 font-semibold">
              UP TO 50% OFF
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left lg:pl-8"
          >
            <span className="inline-block text-sm font-medium tracking-widest uppercase text-primary/70 mb-4">
              Limited Time Offer
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Winter Collection Sale
            </h2>
            
            <p className="text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8">
              Wrap your little ones in warmth with our cozy winter collection. 
              Premium sweaters, jackets, and accessories at unbeatable prices.
            </p>

            <Link to="/category/sale">
              <Button size="lg" className="gap-2">
                Shop Sale
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferBanner;