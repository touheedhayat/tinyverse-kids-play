import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";
import TrustBadges from "@/components/TrustBadges";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Full-Screen Hero Slider */}
        <HeroSection />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Best Sellers */}
        <ProductGrid
          title="Best Sellers"
          filter="bestSeller"
          limit={4}
          viewAllLink="/category/all?sort=popular"
        />

        {/* Featured Categories */}
        <CategorySection />

        {/* New Arrivals */}
        <ProductGrid
          title="New Arrivals"
          filter="new"
          limit={4}
          viewAllLink="/new-arrivals"
        />

        {/* Editorial Grid */}
        <SpecialOfferBanner />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Featured Products */}
        <ProductGrid
          title="Editor's Picks"
          filter="featured"
          limit={8}
          viewAllLink="/category/all"
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
