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
        {/* Hero Section */}
        <HeroSection />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Featured Categories */}
        <CategorySection />

        {/* New Arrivals */}
        <ProductGrid
          title="New Arrivals"
          subtitle="Discover our latest styles, fresh from our design studio"
          filter="new"
          limit={4}
          viewAllLink="/new-arrivals"
        />

        {/* Special Offer Banner */}
        <SpecialOfferBanner />

        {/* Best Sellers */}
        <div className="bg-secondary/20">
          <ProductGrid
            title="Best Sellers"
            subtitle="Our most loved pieces, trusted by parents everywhere"
            filter="bestSeller"
            limit={4}
            viewAllLink="/category/all?sort=popular"
          />
        </div>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Featured Products */}
        <ProductGrid
          title="Editor's Picks"
          subtitle="Handpicked favorites for your little ones"
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