import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface OeufFeatureBannerProps {
  image: string;
  label: string;
  title: string;
  description?: string;
  cta: string;
  link: string;
  imagePosition?: "left" | "right";
  bgColor?: string;
}

const OeufFeatureBanner = ({
  image,
  label,
  title,
  description,
  cta,
  link,
  imagePosition = "left",
  bgColor = "bg-secondary",
}: OeufFeatureBannerProps) => {
  return (
    <section className={`${bgColor}`}>
      <div className="max-w-[1800px] mx-auto">
        <div className={`grid lg:grid-cols-2 items-center ${imagePosition === "right" ? "lg:flex-row-reverse" : ""}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "left" ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`relative aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden ${
              imagePosition === "right" ? "order-2" : ""
            }`}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "left" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={`p-8 md:p-12 lg:p-20 ${imagePosition === "right" ? "order-1" : ""}`}
          >
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground mb-4 font-medium">
              {label}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                {description}
              </p>
            )}
            <Link
              to={link}
              className="inline-block text-xs tracking-[0.15em] font-medium border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
            >
              {cta}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OeufFeatureBanner;
