import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import OeufHeader from "@/components/OeufHeader";
import OeufFooter from "@/components/OeufFooter";

const OeufAboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <OeufHeader />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1920&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center text-background max-w-4xl mx-auto px-6"
          >
            <p className="text-lg md:text-xl lg:text-2xl font-serif italic leading-relaxed">
              Based in Lahore, TinyVerse is a sustainable children's lifestyle brand. We are a family-run studio that believes children deserve good design and a better world. Since 2020 we've been combining playful modernism with ethical production and simple, intuitive designs.
            </p>
          </motion.div>
        </section>

        {/* Design Philosophy */}
        <section className="max-w-3xl mx-auto px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs tracking-[0.2em] font-medium mb-8">OUR DESIGN PHILOSOPHY</h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                TinyVerse began out of necessity: When we were expecting our first child, we couldn't find clothes that were well-designed, well-made and produced ethically. So we created our own.
              </p>
              
              <p>
                Years later, our design process is guided by the same philosophy. What do families need? Can we make it well? Can we produce it sustainably? And can we do it in a fresh, interesting way? We only develop a product when we can answer those questions with a resounding yes!
              </p>
              
              <p>
                We value quality over quantity, and we don't rush the design process. Like growing children themselves, good ideas take time to develop. We embrace trial and error, and we give ourselves the freedom to fail and try again.
              </p>
              
              <p>
                TinyVerse still designs everything in-house. How can you tell? We leave our fingerprints everywhere: Pakistani craftsmanship, global design sensibility, and our never-ending quest to find creative, sustainable and practical solutions to families' needs.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Full Width Image */}
        <section className="relative h-[60vh] md:h-[80vh]">
          <img
            src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1920&q=80"
            alt="Children playing"
            className="w-full h-full object-cover"
          />
        </section>

        {/* Sustainability */}
        <section className="max-w-3xl mx-auto px-6 py-20 md:py-32" id="sustainability">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs tracking-[0.2em] font-medium mb-8">SUSTAINABILITY</h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                From the very beginning, sustainability has been core to who we are. We use organic cotton, eco-friendly dyes, and partner only with factories that share our values of fair labor and environmental responsibility.
              </p>
              
              <p>
                We believe that children deserve clothing that's good for them and good for the planet they'll inherit. Every piece is designed to be loved hard and handed down—creating less waste and more memories.
              </p>
              
              <p>
                Our motto—for our kids, ourselves, and our company—is "be good."
              </p>
            </div>
          </motion.div>
        </section>

        {/* Values Grid */}
        <section className="bg-secondary py-20 md:py-32">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-5xl font-serif italic mb-4 block">01</span>
                <h3 className="text-sm tracking-[0.15em] font-medium mb-4">SUSTAINABLE MATERIALS</h3>
                <p className="text-sm text-muted-foreground">
                  100% organic cotton, eco-friendly dyes, and sustainable packaging.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-5xl font-serif italic mb-4 block">02</span>
                <h3 className="text-sm tracking-[0.15em] font-medium mb-4">ETHICAL PRODUCTION</h3>
                <p className="text-sm text-muted-foreground">
                  Fair wages, safe working conditions, and transparent supply chains.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-5xl font-serif italic mb-4 block">03</span>
                <h3 className="text-sm tracking-[0.15em] font-medium mb-4">TIMELESS DESIGN</h3>
                <p className="text-sm text-muted-foreground">
                  Made to last and be passed down, reducing waste and creating memories.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Join the TinyVerse family
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Discover our collection of thoughtfully designed children's clothing, made with love and care.
            </p>
            <Link
              to="/category/all"
              className="inline-block text-xs tracking-[0.15em] font-medium border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
            >
              SHOP COLLECTION
            </Link>
          </motion.div>
        </section>
      </main>

      <OeufFooter />
    </div>
  );
};

export default OeufAboutPage;
