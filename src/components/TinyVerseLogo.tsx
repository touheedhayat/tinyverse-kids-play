import { motion } from "framer-motion";

interface TinyVerseLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

const TinyVerseLogo = ({ size = "md", showTagline = false }: TinyVerseLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-4xl md:text-5xl",
  };

  const starPositions = [
    { top: "-6px", left: "0px", delay: 0 },
    { top: "-2px", right: "-10px", delay: 0.5 },
    { bottom: "2px", left: "-6px", delay: 1 },
    { top: "50%", right: "-16px", delay: 0.3 },
  ];

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative">
        {/* Twinkling Stars - Now using gold accent */}
        {starPositions.map((pos, index) => (
          <motion.span
            key={index}
            className="absolute text-accent text-xs"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
            }}
            animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: pos.delay,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.span>
        ))}

        {/* Orbiting Element - Subtle dot instead of emoji */}
        <motion.span
          className="absolute text-xs text-accent"
          style={{ top: "-12px", left: "50%" }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
            style={{ transform: "translateX(20px)" }}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.span>

        {/* Main Logo Text */}
        <motion.h1
          className={`font-serif font-bold ${sizeClasses[size]} relative z-10 tracking-tight`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-primary">TINY</span>
          <span className="text-accent">VERSE</span>
        </motion.h1>
      </div>

      {/* Tagline */}
      {showTagline && (
        <motion.p
          className="text-xs text-muted-foreground mt-1 font-sans tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Premium Kids Fashion
        </motion.p>
      )}
    </div>
  );
};

export default TinyVerseLogo;
