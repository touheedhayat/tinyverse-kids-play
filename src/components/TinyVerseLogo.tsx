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

  const variantClasses = {
    default: { primary: "text-foreground", accent: "text-accent" },
    light: { primary: "text-white", accent: "text-white/80" },
    dark: { primary: "text-foreground", accent: "text-accent" },
  };

  const colors = variantClasses[variant];

  return (
    <motion.div 
      className="relative inline-flex flex-col items-center cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="relative">
        {/* Elegant underline animation */}
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-px bg-accent/40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        />

        {/* Main Logo Text */}
        <motion.h1
          className={`font-serif font-medium ${sizeClasses[size]} relative z-10 tracking-wide`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.span 
            className={`${colors.primary} italic`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Tiny
          </motion.span>
          <motion.span 
            className={`${colors.accent} italic`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Verse
          </motion.span>
        </motion.h1>
      </div>

      {/* Tagline */}
      {showTagline && (
        <motion.p
          className="text-[10px] text-muted-foreground mt-0.5 font-sans tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          For Little Ones
        </motion.p>
      )}
    </motion.div>
  );
};

export default TinyVerseLogo;
