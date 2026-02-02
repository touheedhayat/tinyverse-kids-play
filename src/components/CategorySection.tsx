import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                </div>
                
                {/* Title Below Image */}
                <div className="mt-4 text-center">
                  <h3 className="text-xl md:text-2xl font-serif italic text-foreground">
                    {category.name}
                  </h3>
                  <span className="inline-block mt-2 text-xs tracking-wider uppercase text-muted-foreground border-b border-transparent group-hover:border-muted-foreground transition-colors">
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
