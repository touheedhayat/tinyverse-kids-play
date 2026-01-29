import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section with Trust Badge */}
        <HeroSection />

        {/* Featured Categories */}
        <CategorySection />

        {/* New Arrivals */}
        <ProductGrid
          title="New Arrivals"
          subtitle="Fresh styles just landed! Be the first to shop our latest collection."
          filter="new"
          limit={4}
          viewAllLink="/new-arrivals"
        />

        {/* Special Offer Banner */}
        <SpecialOfferBanner />

        {/* Best Sellers */}
        <div className="bg-muted/20">
          <ProductGrid
            title="Best Sellers"
            subtitle="Our most loved items by parents and kids alike."
            filter="bestSeller"
            limit={4}
            viewAllLink="/category/all?sort=popular"
          />
        </div>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Featured Products */}
        <ProductGrid
          title="Featured Collection"
          subtitle="Handpicked favorites for your little ones."
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
