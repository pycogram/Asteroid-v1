import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import AboutSection from "@/components/AboutSection";
import TokenomicsSection from "@/components/TokenomicsSection";
import HowToBuySection from "@/components/HowToBuySection";
import RoadmapSection from "@/components/RoadmapSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import PfpMemeGenerator from "@/components/PfpMemeGenerator";

const Index = () => {
  return ( 
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <PfpMemeGenerator />
        <LiveActivityFeed />
        <TokenomicsSection />
        <HowToBuySection />
        <RoadmapSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
