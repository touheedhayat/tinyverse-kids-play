import { motion } from "framer-motion";
import { CheckCircle, Truck, RotateCcw, Shield, Award, Heart } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Check Before You Pay",
    description: "Inspect your order at delivery. Only pay when you're 100% satisfied.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Carefully selected fabrics that are soft, durable, and safe for children.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary delivery on all orders over Rs. 2,000 nationwide.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Not quite right? Return within 7 days for a full refund.",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Your information is protected with industry-standard security.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "Dedicated support team ready to help via WhatsApp or email.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Why Choose TinyVerse
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">
            We're committed to providing the best shopping experience for parents and children alike
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-foreground/10 mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-primary-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;