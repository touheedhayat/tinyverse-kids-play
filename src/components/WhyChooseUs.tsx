import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif italic text-foreground mb-6">
              Why TinyVerse
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We believe every child deserves clothing that's as thoughtful as they are. 
              Our pieces are crafted with premium materials, designed for comfort and durability, 
              and made to inspire joy in everyday moments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h3 className="text-lg font-serif italic text-foreground mb-3">
                Premium Quality
              </h3>
              <p className="text-sm text-muted-foreground">
                100% organic cotton and sustainable materials for gentle, long-lasting wear.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-lg font-serif italic text-foreground mb-3">
                Check Before Pay
              </h3>
              <p className="text-sm text-muted-foreground">
                Inspect your order at delivery. Only pay when you're completely satisfied.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h3 className="text-lg font-serif italic text-foreground mb-3">
                Timeless Design
              </h3>
              <p className="text-sm text-muted-foreground">
                Classic styles that transcend seasons and grow with your child's journey.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
