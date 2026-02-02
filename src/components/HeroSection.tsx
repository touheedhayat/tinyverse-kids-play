import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [progress, setProgress] = useState(0);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);

  const SLIDE_DURATION = 6000;

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  // Auto-advance with progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (100 / (SLIDE_DURATION / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Text animation variants
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  const titleWords = slides[currentSlide].title.split(" ");

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Images with Parallax & Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{ y: parallaxY }}
        >
          <motion.img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay for better text contrast */}
      <div className="absolute inset-0 bg-foreground/10" />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      {/* Content Box */}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xs tracking-widest uppercase text-muted-foreground mb-3"
              >
                {slides[currentSlide].label}
              </motion.p>
              
              {/* Animated Title Words */}
              <h1 className="text-3xl md:text-4xl font-serif italic text-foreground mb-6">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={`${currentSlide}-${i}`}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={wordVariants}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to={slides[currentSlide].link}
                  className="inline-block text-sm tracking-wider uppercase border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
                >
                  Shop Now
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="mt-8 h-0.5 bg-border overflow-hidden">
            <motion.div
              className="h-full bg-foreground"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute right-4 md:right-12 bottom-16 md:bottom-24 flex flex-col gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 transition-all ${
              index === currentSlide 
                ? "bg-background h-6" 
                : "bg-background/50 hover:bg-background/70 h-2"
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
          className="w-10 h-10 bg-background flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="w-5 h-5 text-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
