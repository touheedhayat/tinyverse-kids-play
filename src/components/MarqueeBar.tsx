import { motion } from "framer-motion";

const announcements = [
  "✨ Free Shipping on Orders Over Rs. 5,000",
  "🎁 Check Before Pay — Inspect at Delivery",
  "💯 100% Organic Cotton",
  "🚚 Fast Nationwide Delivery",
  "✦ Premium Quality Guaranteed",
];

const MarqueeBar = () => {
  return (
    <div className="bg-foreground text-background py-2.5 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {/* Duplicate content for seamless loop */}
        {[...announcements, ...announcements].map((text, index) => (
          <span
            key={index}
            className="text-xs tracking-wider uppercase mx-8"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBar;
