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
      titleUrdu: "پہلے چیک کریں",
      titleEnglish: "First Check",
      subtitleUrdu: "پھر ادائیگی کریں",
      subtitleEnglish: "Then Pay",
      isPrimary: true,
      color: "bg-trust text-trust-foreground",
    },
    {
      icon: Truck,
      titleUrdu: "مفت ڈیلیوری",
      titleEnglish: "Free Delivery",
      subtitleUrdu: "2000 سے اوپر",
      subtitleEnglish: "Over Rs. 2000",
      isPrimary: false,
      color: "bg-secondary text-secondary-foreground",
    },
    {
      icon: RotateCcw,
      titleUrdu: "آسان واپسی",
      titleEnglish: "Easy Returns",
      subtitleUrdu: "7 دن",
      subtitleEnglish: "Within 7 Days",
      isPrimary: false,
      color: "bg-secondary text-secondary-foreground",
    },
    {
      icon: Shield,
      titleUrdu: "کوالٹی گارنٹی",
      titleEnglish: "Quality Guaranteed",
      subtitleUrdu: "100% اصلی",
      subtitleEnglish: "100% Original",
      isPrimary: false,
      color: "bg-secondary text-secondary-foreground",
    },
  ];

  const filteredBadges = showPrimary ? badges : badges.filter((b) => !b.isPrimary);

  if (variant === "compact") {
    return (
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-trust text-trust-foreground shadow-soft"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Check className="w-5 h-5" />
        <span className="font-semibold text-sm">
          پہلے چیک کریں، پھر ادائیگی کریں
        </span>
      </motion.div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className="flex flex-col gap-3">
        {filteredBadges.map((badge, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              badge.isPrimary ? badge.color : "bg-card"
            } shadow-card`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div
              className={`p-2 rounded-full ${
                badge.isPrimary ? "bg-white/20" : "bg-primary/10"
              }`}
            >
              <badge.icon
                className={`w-5 h-5 ${
                  badge.isPrimary ? "text-white" : "text-primary"
                }`}
              />
            </div>
            <div>
              <p className="font-semibold text-sm">{badge.titleEnglish}</p>
              <p className="text-xs opacity-80">{badge.subtitleEnglish}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-center gap-4 md:gap-8 py-4 min-w-max px-4">
        {filteredBadges.map((badge, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${
              badge.isPrimary
                ? "bg-trust text-trust-foreground shadow-lg"
                : "bg-card shadow-card"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
          >
            <div
              className={`p-2.5 rounded-full ${
                badge.isPrimary ? "bg-white/20" : "bg-primary/10"
              }`}
            >
              <badge.icon
                className={`w-5 h-5 ${
                  badge.isPrimary ? "text-white" : "text-primary"
                }`}
              />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm leading-tight">
                {badge.titleUrdu}
              </p>
              <p className="text-xs opacity-90">{badge.subtitleUrdu}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
