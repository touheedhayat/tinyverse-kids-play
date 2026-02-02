import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const collections = [
  {
    title: "For the Boys",
    subtitle: "Adventurous styles for little explorers",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    link: "/category/boys",
  },
  {
    title: "For the Girls",
    subtitle: "Elegant pieces for little dreamers",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80",
    link: "/category/girls",
  },
];

const DualCollectionBanner = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                to={collection.link}
                className="relative block aspect-[4/5] overflow-hidden group"
              >
                {/* Image with Zoom Effect */}
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
                  {/* Star Accent */}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.15 }}
                    className="text-background/80 text-lg mb-3"
                  >
                    ✦
                  </motion.span>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-background mb-2">
                    {collection.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-background/80 text-sm md:text-base mb-4">
                    {collection.subtitle}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-background group-hover:gap-3 transition-all">
                    Shop Now
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DualCollectionBanner;
