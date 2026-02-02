import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const FeaturedStorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-secondary overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-0 items-center">
          {/* Left - Large Image with Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden"
          >
            <motion.img
              style={{ y: imageY }}
              src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1200&q=80"
              alt="Kids wearing TinyVerse clothing"
              className="w-full h-[110%] object-cover absolute -top-[5%]"
            />
          </motion.div>

          {/* Right - Content Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 lg:pl-16 flex flex-col justify-center"
          >
            {/* Decorative Star */}
            <span className="text-accent text-2xl mb-6">✦</span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-foreground mb-6 leading-tight">
              The TinyVerse Story
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
              Every piece in our collection is crafted with love, designed for the little ones who make our world magical. We believe childhood should be filled with comfort, joy, and endless adventure.
            </p>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              From organic fabrics to timeless designs, TinyVerse brings together quality craftsmanship and playful elegance—because your little ones deserve nothing but the best.
            </p>

            {/* CTA Button */}
            <Link
              to="/category/all"
              className="inline-flex items-center gap-2 text-sm tracking-wider uppercase border-b border-foreground pb-1 w-fit hover:opacity-70 transition-opacity group"
            >
              Shop Collection
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStorySection;
