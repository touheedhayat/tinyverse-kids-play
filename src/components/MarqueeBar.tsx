import { motion } from "framer-motion";

const announcements = [
  "✦ Free Shipping on Orders Over Rs. 5,000",
  "✦ Check Before Pay — Inspect at Delivery",
  "✦ 100% Premium Organic Cotton",
  "✦ Fast Nationwide Delivery",
  "✦ Premium Quality Guaranteed",
  "✦ Sustainably Sourced Materials",
];

const MarqueeBar = () => {
  const content = announcements.join("     ·     ");
  
  return (
    <div className="bg-foreground text-background py-2 overflow-hidden relative">
      <div className="flex">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}
        >
          <span className="text-[11px] tracking-[0.18em] uppercase font-light mx-4">
            {content}
          </span>
          <span className="text-[11px] tracking-[0.18em] uppercase font-light mx-4">
            {content}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeBar;
