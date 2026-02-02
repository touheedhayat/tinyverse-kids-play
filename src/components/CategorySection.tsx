import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sampleProducts } from "@/data/products";

const categories = [
  {
    id: "girls",
    name: "Girls",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80",
    slug: "girls",
  },
  {
    id: "boys",
    name: "Boys",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
    slug: "boys",
  },
  {
    id: "baby",
    name: "Baby",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80",
    slug: "baby",
  },
];

// Get product counts per category
const getCategoryCount = (slug: string) => {
  return sampleProducts.filter((p) => p.category.toLowerCase() === slug).length;
};

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/category/${category.slug}`} className="group block">
                <motion.div 
                  className="relative overflow-hidden aspect-[4/5]"
                  whileHover={{ 
                    boxShadow: "0 20px 50px -20px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category Count Badge */}
                  <motion.div 
                    className="absolute top-4 right-4 bg-background/90 px-3 py-1.5"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <span className="text-xs tracking-wider text-foreground">
                      {getCategoryCount(category.slug)} items
                    </span>
                  </motion.div>

                  {/* Hover Text Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <span className="bg-background px-6 py-3 text-sm tracking-wider uppercase text-foreground">
                        Explore
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Title Below Image */}
                <div className="mt-4 text-center">
                  <motion.h3 
                    className="text-xl md:text-2xl font-serif italic text-foreground"
                    whileHover={{ letterSpacing: "0.05em" }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.name}
                  </motion.h3>
                  <span className="inline-block mt-2 text-xs tracking-wider uppercase text-muted-foreground border-b border-transparent group-hover:border-muted-foreground transition-all duration-300">
                    Shop Now
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

export default CategorySection;
