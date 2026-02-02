import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1600&q=80",
    label: "New Season",
    title: "Spring Collection",
    link: "/new-arrivals",
  },
  {
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=1600&q=80",
    label: "Carefully Curated",
    title: "Party Dresses",
    link: "/category/girls",
  },
  {
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1600&q=80",
    label: "Timeless Style",
    title: "Boys Collection",
    link: "/category/boys",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Box - Oeuf Style */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute left-4 md:left-12 lg:left-20 bottom-16 md:bottom-24"
      >
        <div className="bg-background px-8 py-10 md:px-12 md:py-14 max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">
                {slides[currentSlide].label}
              </p>
              <h1 className="text-3xl md:text-4xl font-serif italic text-foreground mb-6">
                {slides[currentSlide].title}
              </h1>
              <Link
                to={slides[currentSlide].link}
                className="inline-block text-sm tracking-wider uppercase border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
              >
                Shop Now
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute right-4 md:right-12 bottom-16 md:bottom-24 flex flex-col gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-background w-2 h-6" 
                : "bg-background/50 hover:bg-background/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-10 h-10 rounded-full bg-background flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="w-5 h-5 text-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
