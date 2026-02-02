import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Palette } from "lucide-react";

const features = [
  {
    number: "01",
    icon: Sparkles,
    title: "Premium Quality",
    description: "100% organic cotton and sustainable materials for gentle, long-lasting wear.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Check Before Pay",
    description: "Inspect your order at delivery. Only pay when you're completely satisfied.",
  },
  {
    number: "03",
    icon: Palette,
    title: "Timeless Design",
    description: "Classic styles that transcend seasons and grow with your child's journey.",
  },
];

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

          {/* Decorative Separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-24 h-px bg-border mx-auto mt-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center relative"
              >
                {/* Number Label */}
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-xs tracking-widest text-muted-foreground/50 font-medium mb-4 block"
                >
                  {feature.number}
                </motion.span>

                {/* Animated Icon */}
                <motion.div
                  className="mb-4 flex justify-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <feature.icon className="w-6 h-6 text-accent" />
                </motion.div>

                <h3 className="text-lg font-serif italic text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>

                {/* Decorative line between items (hidden on last) */}
                {index < features.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
