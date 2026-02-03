import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

interface PressItem {
  logo: string;
  quote: string;
  name: string;
}

const pressItems: PressItem[] = [
  {
    logo: "VOGUE",
    quote: '"Must-Have Baby Essentials"',
    name: "Vogue",
  },
  {
    logo: "GQ",
    quote: '"A New Standard in Kids Fashion"',
    name: "GQ",
  },
  {
    logo: "ELLE",
    quote: '"The Best Dressed Little Ones"',
    name: "ELLE",
  },
];

const OeufPressLogos = () => {
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
    }, 4000);

    return () => clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 md:py-20 border-y border-border">
      <div className="max-w-4xl mx-auto px-6">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {pressItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex-[0_0_100%] min-w-0 text-center"
              >
                <h3 className="text-4xl md:text-5xl font-serif italic mb-4">
                  {item.quote}
                </h3>
                <p className="text-xs tracking-[0.2em] text-muted-foreground">
                  {item.logo}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {pressItems.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-foreground" : "bg-foreground/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OeufPressLogos;
