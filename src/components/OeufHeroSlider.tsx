import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface HeroSlide {
  id: string;
  image: string;
  label: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

const slides: HeroSlide[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1920&q=80",
    label: "NEW COLLECTION",
    title: "Little Explorers",
    subtitle: "Discover our latest curated collection for tiny adventurers",
    cta: "EXPLORE NOW",
    link: "/new-arrivals",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1920&q=80",
    label: "FOR THE GIRLS",
    title: "Spring Florals",
    subtitle: "Delicate prints and soft fabrics for the season",
    cta: "SHOP GIRLS",
    link: "/category/girls",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1920&q=80",
    label: "FOR THE BOYS",
    title: "Classic Essentials",
    subtitle: "Timeless pieces crafted with care and comfort",
    cta: "SHOP BOYS",
    link: "/category/boys",
  },
];

const OeufHeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 6000);

    return () => clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollToSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex">
          {slides.map((slide, index) => (
            <div key={slide.id} className="embla__slide flex-[0_0_100%] min-w-0 relative">
              {/* Background Image with Ken Burns */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.15 }}
                animate={{ scale: currentSlide === index ? 1 : 1.15 }}
                transition={{ duration: 10, ease: "easeOut" }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </motion.div>

              {/* Content Box */}
              <AnimatePresence mode="wait">
                {currentSlide === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-6 md:left-16 lg:left-24 bottom-24 md:bottom-32 z-10"
                  >
                    <div className="bg-background/95 backdrop-blur-sm p-8 md:p-10 lg:p-14 max-w-sm md:max-w-lg shadow-2xl">
                      <motion.p 
                        className="text-[10px] md:text-xs tracking-[0.25em] text-accent mb-3 font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {slide.label}
                      </motion.p>
                      <motion.h2 
                        className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-foreground mb-3"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {slide.title}
                      </motion.h2>
                      <motion.p
                        className="text-sm text-muted-foreground mb-6 max-w-xs"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Link
                          to={slide.link}
                          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] font-medium bg-foreground text-background px-6 py-3 hover:bg-accent transition-colors duration-300 group"
                        >
                          {slide.cta}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators - Horizontal bottom */}
      <div className="absolute bottom-10 right-8 md:right-16 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className="relative group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className={`h-0.5 transition-all duration-500 ${
              currentSlide === index ? "w-10 bg-white" : "w-5 bg-white/40 group-hover:bg-white/60"
            }`} />
            <span className={`absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-white/70 transition-opacity ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}>
              0{index + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll Down */}
      <motion.button
        onClick={scrollToSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll to next section"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
};

export default OeufHeroSlider;
