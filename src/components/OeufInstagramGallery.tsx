import { motion } from "framer-motion";

const instagramImages = [
  "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80",
  "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80",
  "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80",
  "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80",
  "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80",
  "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&q=80",
];

const OeufInstagramGallery = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <p className="text-center text-sm text-muted-foreground mb-10">
          Mais oui, you can shop our Instagram! Don't forget to tag #tinyverse to be featured.
        </p>

        {/* Gallery */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
          {instagramImages.map((image, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/tinyverse"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden group"
            >
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-[10px] tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                  See More
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Link */}
        <div className="text-center mt-8">
          <a
            href="https://instagram.com/tinyverse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.15em] font-medium hover:underline"
          >
            Follow @tinyverse
          </a>
        </div>
      </div>
    </section>
  );
};

export default OeufInstagramGallery;
