import { motion } from "framer-motion";

interface TinyVerseLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  variant?: "default" | "light" | "dark";
}

const TinyVerseLogo = ({ size = "md", showTagline = false, variant = "default" }: TinyVerseLogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl md:text-2xl",
    lg: "text-3xl md:text-4xl",
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  const variantClasses = {
    default: { primary: "text-foreground", accent: "text-accent", dot: "bg-accent" },
    light: { primary: "text-white", accent: "text-white/80", dot: "bg-white/80" },
    dark: { primary: "text-foreground", accent: "text-accent", dot: "bg-accent" },
  };

  const colors = variantClasses[variant];

  return (
    <motion.div 
      className="relative inline-flex flex-col items-center cursor-pointer group"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="relative flex items-center gap-1">
        {/* Decorative left flourish */}
        <motion.span
          className={`${colors.accent} text-sm font-serif opacity-60`}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          ✦
        </motion.span>

        {/* Main Logo Text */}
        <motion.h1
          className={`font-serif font-medium ${sizeClasses[size]} relative z-10 tracking-wide`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.span 
            className={`${colors.primary} italic font-semibold`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Tiny
          </motion.span>
          {/* Animated dot separator */}
          <motion.span
            className={`inline-block ${dotSizes[size]} ${colors.dot} rounded-full mx-0.5 align-middle`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.3 }}
          />
          <motion.span 
            className={`${colors.accent} italic font-light`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Verse
          </motion.span>
        </motion.h1>

        {/* Decorative right flourish */}
        <motion.span
          className={`${colors.accent} text-sm font-serif opacity-60`}
          initial={{ opacity: 0, x: 5 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          ✦
        </motion.span>
      </div>

      {/* Animated double underline */}
      <div className="relative w-full mt-1">
        <motion.div
          className="h-px bg-accent/50 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="h-px bg-accent/25 mx-auto mt-0.5"
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
        />
      </div>

      {/* Tagline */}
      {showTagline && (
        <motion.p
          className="text-[9px] text-muted-foreground mt-1.5 font-sans tracking-[0.25em] uppercase"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          For Little Ones
        </motion.p>
      )}
    </motion.div>
  );
};

export default TinyVerseLogo;
