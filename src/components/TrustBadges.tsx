import { motion } from "framer-motion";
import { Check, Truck, RotateCcw, Shield } from "lucide-react";

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact";
}

const TrustBadges = ({ variant = "horizontal" }: TrustBadgesProps) => {
  const badges = [
    {
      icon: Check,
      title: "Check Before Pay",
      subtitle: "Inspect your order first",
    },
    {
      icon: Truck,
      title: "Free Delivery 2000+",
      subtitle: "Orders over Rs. 2,000",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      subtitle: "Within 7 days",
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      subtitle: "100% original products",
    },
  ];

  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground">
        <Check className="w-4 h-4" />
        <span className="text-xs tracking-wider uppercase">Check Before Pay</span>
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className="flex flex-col gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-4 bg-secondary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <badge.icon className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-foreground">{badge.title}</p>
              <p className="text-xs text-muted-foreground">{badge.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className="py-8 border-y border-border">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <badge.icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs tracking-wider uppercase text-muted-foreground">
                {badge.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
