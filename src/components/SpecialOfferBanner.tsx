import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const SpecialOfferBanner = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-coral via-primary to-baby-pink opacity-90" />

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-white/10 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 py-12 md:py-16 px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-4"
                >
                  <Percent className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold text-sm">
                    Limited Time Offer
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-fredoka font-bold text-white mb-4"
                >
                  Summer Sale
                  <br />
                  <span className="text-sunshine">Up to 50% OFF!</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/90 mb-6 max-w-md mx-auto md:mx-0"
                >
                  Grab the best deals on adorable kids fashion. 
                  Premium quality at unbeatable prices!
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                >
                  <Link to="/sale">
                    <Button
                      size="lg"
                      className="bg-white text-coral hover:bg-white/90 gap-2 rounded-xl"
                    >
                      Shop Sale
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>

                {/* Trust Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 inline-flex items-center gap-2 text-white/90"
                >
                  <span className="text-xl">✅</span>
                  <span className="text-sm">
                    Remember: پہلے چیک کریں، پھر ادائیگی کریں
                  </span>
                </motion.div>
              </div>

              {/* Timer / Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-white mb-4 justify-center">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Offer Ends In</span>
                  </div>

                  <div className="flex gap-4 justify-center">
                    {[
                      { value: "03", label: "Days" },
                      { value: "12", label: "Hours" },
                      { value: "45", label: "Mins" },
                      { value: "22", label: "Secs" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="text-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: index * 0.1,
                        }}
                      >
                        <div className="bg-white text-coral text-2xl md:text-3xl font-bold rounded-xl w-14 md:w-16 h-14 md:h-16 flex items-center justify-center">
                          {item.value}
                        </div>
                        <p className="text-white/80 text-xs mt-1">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-4 right-8 text-4xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  🎉
                </motion.div>
                <motion.div
                  className="absolute bottom-8 right-16 text-3xl"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOfferBanner;
