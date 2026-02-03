import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface HeroSlide {
  id: string;
  image: string;
  label: string;
  title: string;
  cta: string;
  link: string;
}

const slides: HeroSlide[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1920&q=80",
    label: "NEW COLLECTION",
    title: "Little Explorers",
    cta: "SHOP NOW",
    link: "/new-arrivals",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1920&q=80",
    label: "FOR THE GIRLS",
    title: "Spring Florals",
    cta: "SHOP NOW",
    link: "/category/girls",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1920&q=80",
    label: "FOR THE BOYS",
    title: "Classic Essentials",
    cta: "SHOP NOW",
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

    // Auto-play
    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 6000);

    return () => {
      clearInterval(autoplay);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollToSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
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
                initial={{ scale: 1.1 }}
                animate={{ 
                  scale: currentSlide === index ? 1 : 1.1,
                }}
                transition={{ duration: 8, ease: "easeOut" }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </motion.div>

              {/* Content Box - Oeuf Style */}
              <AnimatePresence mode="wait">
                {currentSlide === index && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute left-6 md:left-16 lg:left-24 bottom-24 md:bottom-32 z-10"
                  >
                    <div className="bg-background p-8 md:p-10 lg:p-12 max-w-sm md:max-w-md">
                      <p className="text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground mb-3 font-medium">
                        {slide.label}
                      </p>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-foreground mb-6">
                        {slide.title}
                      </h2>
                      <Link
                        to={slide.link}
                        className="inline-block text-xs tracking-[0.15em] font-medium border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
                      >
                        {slide.cta}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute right-8 bottom-32 z-20 flex flex-col gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-foreground h-8"
                : "bg-foreground/40 hover:bg-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Arrow */}
      <motion.button
        onClick={scrollToSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-background flex items-center justify-center hover:scale-110 transition-transform"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        aria-label="Scroll to next section"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </section>
  );
};

export default OeufHeroSlider;
