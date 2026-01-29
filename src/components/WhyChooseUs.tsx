import { motion } from "framer-motion";
import { Check, Truck, RotateCcw, Shield, Heart } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Check,
      title: "پہلے چیک کریں، پھر ادائیگی کریں",
      titleEnglish: "First Check, Then Pay",
      description:
        "We believe in transparency. Check your order upon delivery, and only pay when you're 100% satisfied!",
      color: "bg-trust",
      iconColor: "text-trust-foreground",
    },
    {
      icon: Truck,
      title: "مفت ڈیلیوری",
      titleEnglish: "Free Delivery",
      description:
        "Enjoy free delivery on all orders above Rs. 2000. We deliver across Pakistan!",
      color: "bg-secondary",
      iconColor: "text-secondary-foreground",
    },
    {
      icon: RotateCcw,
      title: "آسان واپسی",
      titleEnglish: "Easy Returns",
      description:
        "Not satisfied? Return within 7 days for a full refund. No questions asked!",
      color: "bg-accent",
      iconColor: "text-accent-foreground",
    },
    {
      icon: Shield,
      title: "کوالٹی گارنٹی",
      titleEnglish: "Quality Guaranteed",
      description:
        "All our products are 100% original with premium quality fabrics that are safe for kids.",
      color: "bg-baby-pink",
      iconColor: "text-foreground",
    },
    {
      icon: Heart,
      title: "بچوں کے لیے محفوظ",
      titleEnglish: "Safe for Kids",
      description:
        "Soft, breathable fabrics that are gentle on sensitive skin. No harmful chemicals!",
      color: "bg-lavender",
      iconColor: "text-foreground",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-fredoka font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient">TinyVerse</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best shopping experience for parents
            and the cutest clothes for little ones!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div
                className={`h-full p-6 rounded-2xl ${
                  index === 0
                    ? "bg-trust text-trust-foreground"
                    : "bg-card shadow-card"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    index === 0 ? "bg-white/20" : feature.color
                  }`}
                >
                  <feature.icon
                    className={`w-7 h-7 ${
                      index === 0 ? "text-white" : feature.iconColor
                    }`}
                  />
                </div>

                <h3
                  className={`text-xl font-bold mb-1 ${
                    index === 0 ? "text-white" : "text-foreground"
                  }`}
                  dir="rtl"
                >
                  {feature.title}
                </h3>
                <h4
                  className={`text-lg font-semibold mb-3 ${
                    index === 0 ? "text-white/90" : "text-primary"
                  }`}
                >
                  {feature.titleEnglish}
                </h4>
                <p
                  className={`text-sm ${
                    index === 0 ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {feature.description}
                </p>

                {index === 0 && (
                  <motion.div
                    className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xl">✅</span>
                    <span className="font-semibold text-sm">
                      Order with confidence!
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
