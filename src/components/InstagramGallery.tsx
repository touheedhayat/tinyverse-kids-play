import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&q=80",
  "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80",
  "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80",
  "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80",
  "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80",
  "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=400&q=80",
];

const InstagramGallery = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-serif italic text-foreground mb-3">
            @TinyVersePK
          </h2>
          <p className="text-sm text-muted-foreground">
            Join our community and share your little one's style
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {galleryImages.map((image, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/tinyversepk"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden"
            >
              <img
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com/tinyversepk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm tracking-wider uppercase border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            Follow Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramGallery;
