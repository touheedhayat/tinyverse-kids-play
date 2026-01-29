import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TrustBadges from "./TrustBadges";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-baby-pink/30 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 rounded-full bg-sky-blue/30 blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-mint-green/30 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
        />

        {/* Floating Stars */}
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-sunshine text-2xl"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <TrustBadges variant="compact" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-fredoka font-bold text-foreground leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Premium Fashion for
              <br />
              <span className="text-gradient"> Little Stars </span>
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground mb-6 max-w-md mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Discover adorable, high-quality clothing for boys, girls, and babies. 
              <span className="font-semibold text-trust"> First check, then pay!</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/category/all">
                <Button size="lg" className="gap-2 rounded-xl text-lg px-8">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/new-arrivals">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl text-lg px-8"
                >
                  New Arrivals
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-8 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "500+", label: "Products" },
                { value: "10K+", label: "Happy Kids" },
                { value: "4.9★", label: "Rating" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <motion.img
                src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600"
                alt="Happy kids in stylish clothes"
                className="rounded-3xl shadow-2xl w-full max-w-md mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating Product Cards */}
              <motion.div
                className="absolute -left-4 md:-left-8 top-1/4 bg-white rounded-2xl shadow-lg p-3 z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-baby-pink-light flex items-center justify-center text-2xl">
                    👗
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Girls Dresses</p>
                    <p className="text-xs text-muted-foreground">From Rs. 999</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 md:-right-8 bottom-1/4 bg-white rounded-2xl shadow-lg p-3 z-20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-sky-blue-light flex items-center justify-center text-2xl">
                    👕
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Boys Collection</p>
                    <p className="text-xs text-muted-foreground">50+ Items</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-4 -top-4 bg-trust text-trust-foreground rounded-full px-4 py-2 shadow-lg z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-sm font-bold">✓ First Check Then Pay</span>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-baby-pink to-lavender rounded-full blur-3xl opacity-40" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="bg-card/50 backdrop-blur-sm border-y border-border">
        <TrustBadges variant="horizontal" />
      </div>
    </section>
  );
};

export default HeroSection;
