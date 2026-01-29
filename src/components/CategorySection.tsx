import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

const CategorySection = () => {
  const categoryEmojis: Record<string, string> = {
    boys: "👦",
    girls: "👧",
    baby: "👶",
  };

  const categoryColors: Record<string, string> = {
    boys: "from-sky-blue to-sky-blue-light",
    girls: "from-baby-pink to-baby-pink-light",
    baby: "from-mint-green to-mint-green-light",
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-fredoka font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Find the perfect outfit for your little ones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Link to={`/category/${category.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-3xl">
                  {/* Background Image */}
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${categoryColors[category.slug]} opacity-60 group-hover:opacity-40 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <motion.span
                        className="text-6xl mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {categoryEmojis[category.slug]}
                      </motion.span>

                      <h3 className="text-3xl font-fredoka font-bold text-foreground mb-2">
                        {category.name}
                      </h3>
                      <p className="text-lg text-foreground/80 font-urdu" dir="rtl">
                        {category.nameUrdu}
                      </p>
                      <p className="text-sm text-foreground/70 mt-2">
                        {category.productCount}+ Products
                      </p>

                      <motion.div
                        className="mt-4 flex items-center gap-2 text-foreground font-semibold"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ x: 5 }}
                      >
                        <span>Shop Now</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <motion.div
                      className="absolute top-4 right-4 text-2xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      ✦
                    </motion.div>
                    <motion.div
                      className="absolute bottom-4 left-4 text-xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ⭐
                    </motion.div>
                  </div>
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
