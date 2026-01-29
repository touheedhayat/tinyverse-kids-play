import { motion } from "framer-motion";
import { Check, Truck, RotateCcw, Shield } from "lucide-react";

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact";
  showPrimary?: boolean;
}

const TrustBadges = ({ variant = "horizontal", showPrimary = true }: TrustBadgesProps) => {
  const badges = [
    {
      icon: Check,
      title: "Check Before Pay",
      subtitle: "Inspect your order first",
      isPrimary: true,
    },
    {
      icon: Truck,
      title: "Free Delivery",
      subtitle: "Orders over Rs. 2,000",
      isPrimary: false,
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      subtitle: "Within 7 days",
      isPrimary: false,
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      subtitle: "100% original products",
      isPrimary: false,
    },
  ];

  const filteredBadges = showPrimary ? badges : badges.filter((b) => !b.isPrimary);

  if (variant === "compact") {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust/10 text-trust rounded-full">
        <Check className="w-4 h-4" />
        <span className="text-sm font-medium">Check Before Pay</span>
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className="flex flex-col gap-4">
        {filteredBadges.map((badge, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-4 p-4 rounded-lg ${
              badge.isPrimary ? "bg-trust/10 border border-trust/20" : "bg-secondary"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`p-2 rounded-full ${badge.isPrimary ? "bg-trust/20" : "bg-primary/10"}`}>
              <badge.icon className={`w-5 h-5 ${badge.isPrimary ? "text-trust" : "text-primary"}`} />
            </div>
            <div>
              <p className="font-medium text-foreground">{badge.title}</p>
              <p className="text-sm text-muted-foreground">{badge.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className="w-full border-y border-border py-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredBadges.map((badge, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`p-2 rounded-full ${badge.isPrimary ? "bg-trust/10" : "bg-primary/5"}`}>
                <badge.icon className={`w-5 h-5 ${badge.isPrimary ? "text-trust" : "text-primary"}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;