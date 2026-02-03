import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

interface AlpacaItem {
  id: string;
  image: string;
  title: string;
  price: number;
  badges: string[];
  link: string;
}

const alpacaItems: AlpacaItem[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80",
    title: "Organic Cotton Romper",
    price: 1890,
    badges: ["BESTSELLER"],
    link: "/product/3",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
    title: "Floral Summer Dress",
    price: 2490,
    badges: [],
    link: "/product/2",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    title: "Classic Polo Shirt",
    price: 1990,
    badges: ["NEW"],
    link: "/product/1",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80",
    title: "Denim Jacket",
    price: 3590,
    badges: ["SALE"],
    link: "/product/4",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    title: "Party Dress",
    price: 4990,
    badges: [],
    link: "/product/5",
  },
];

interface OeufAlpacaCarouselProps {
  title: string;
  viewAllLink?: string;
}

const OeufAlpacaCarousel = ({ title, viewAllLink }: OeufAlpacaCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-lg md:text-xl font-serif">{title}</h3>
          
          <div className="flex items-center gap-4">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="p-2 border border-border hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="p-2 border border-border hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {alpacaItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex-[0_0_220px] md:flex-[0_0_260px] group"
              >
                <Link to={item.link}>
                  <div className="relative aspect-square bg-secondary overflow-hidden mb-3">
                    {/* Badges */}
                    {item.badges.length > 0 && (
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                        {item.badges.map((badge) => (
                          <span
                            key={badge}
                            className="px-2 py-0.5 text-[8px] tracking-wider font-medium bg-background/90"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <h4 className="text-sm mb-1 group-hover:underline">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">Rs. {item.price.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All */}
        {viewAllLink && (
          <div className="text-center mt-10">
            <Link
              to={viewAllLink}
              className="text-xs tracking-[0.12em] font-medium hover:underline"
            >
              View all
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OeufAlpacaCarousel;
