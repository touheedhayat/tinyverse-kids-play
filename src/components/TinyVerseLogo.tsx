import { motion } from "framer-motion";

interface TinyVerseLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

const TinyVerseLogo = ({ size = "md", showTagline = false }: TinyVerseLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const starPositions = [
    { top: "-8px", left: "0px", delay: 0 },
    { top: "-4px", right: "-12px", delay: 0.5 },
    { bottom: "0px", left: "-8px", delay: 1 },
    { top: "50%", right: "-20px", delay: 0.3 },
  ];

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative">
        {/* Twinkling Stars */}
        {starPositions.map((pos, index) => (
          <motion.span
            key={index}
            className="absolute text-sunshine"
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

        {/* Orbiting Planet */}
        <motion.span
          className="absolute text-lg"
          style={{ top: "-15px", left: "50%" }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.span
            className="inline-block"
            style={{ transform: "translateX(25px)" }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🪐
          </motion.span>
        </motion.span>

        {/* Main Logo Text */}
        <motion.h1
          className={`font-fredoka font-bold ${sizeClasses[size]} relative z-10`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-foreground">Tiny</span>
          <motion.span
            className="text-gradient"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "linear-gradient(90deg, hsl(350 100% 75%), hsl(280 60% 70%), hsl(197 71% 65%), hsl(350 100% 75%))",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Verse
          </motion.span>
        </motion.h1>
      </div>

      {/* Tagline */}
      {showTagline && (
        <motion.p
          className="text-xs text-muted-foreground mt-1 font-nunito tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A tiny universe for little ones ✨
        </motion.p>
      )}
    </div>
  );
};

export default TinyVerseLogo;
