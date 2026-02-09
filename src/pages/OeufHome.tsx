import OeufHeader from "@/components/OeufHeader";
import OeufHeroSlider from "@/components/OeufHeroSlider";
import OeufProductCarousel from "@/components/OeufProductCarousel";
import OeufFeatureBanner from "@/components/OeufFeatureBanner";
import OeufAlpacaCarousel from "@/components/OeufAlpacaCarousel";
import OeufInstagramGallery from "@/components/OeufInstagramGallery";
import OeufPressLogos from "@/components/OeufPressLogos";
import OeufFooter from "@/components/OeufFooter";
import { sampleProducts } from "@/data/products";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { motion } from "framer-motion";

const SectionDivider = () => (
  <div className="flex items-center justify-center py-6">
    <div className="h-px w-8 bg-border" />
    <span className="mx-3 text-accent text-xs">✦</span>
    <div className="h-px w-8 bg-border" />
  </div>
);

const OeufHome = () => {
  const bestSellers = sampleProducts.filter((p) => p.isBestSeller);
  const newArrivals = sampleProducts.filter((p) => p.isNew);
  const featured = sampleProducts.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <OeufHeader />

      <main>
        <OeufHeroSlider />

        <SectionDivider />

        {/* Best Sellers */}
        <OeufProductCarousel
          title="Sustainably made best-sellers"
          products={bestSellers.length > 0 ? bestSellers : sampleProducts.slice(0, 6)}
          viewAllLink="/category/all?sort=popular"
        />

        <SectionDivider />

        {/* Feature Banner 1 */}
        <OeufFeatureBanner
          image="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=1200&q=80"
          label="TREAT YOURSELF"
          title="For the kids' room, your room, or even the living room."
          description="Because life's too short for boring clothes. Shop our carefully curated collection of premium children's wear."
          cta="SHOP COLLECTION"
          link="/category/all"
          imagePosition="left"
        />

        {/* Cotton Collection */}
        <OeufAlpacaCarousel
          title="Explore our 100% cotton collection"
          viewAllLink="/category/all"
        />

        <SectionDivider />

        {/* Feature Banner 2 */}
        <OeufFeatureBanner
          image="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=1200&q=80"
          label="NOW CURATING"
          title="Welcome to TinyVerse. Specially curated with love for your little ones."
          description="Discover our sustainable favorites designed with care and crafted with the finest materials."
          cta="SHOP NOW"
          link="/new-arrivals"
          imagePosition="right"
          bgColor="bg-secondary"
        />

        {/* Featured Products */}
        <OeufProductCarousel
          title="A curation of our favorite pieces"
          products={featured.length > 0 ? featured : sampleProducts.slice(0, 6)}
          viewAllLink="/category/all"
        />

        <SectionDivider />

        {/* Instagram Gallery */}
        <OeufInstagramGallery />

        {/* Press Logos */}
        <OeufPressLogos />
      </main>

      <OeufFooter />
      <BackToTop />
    </div>
  );
};

export default OeufHome;
