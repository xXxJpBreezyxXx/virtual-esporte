import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import FeatureStrip from "@/components/FeatureStrip";
import BrazilSpotlight from "@/components/BrazilSpotlight";
import NationsGrid from "@/components/NationsGrid";
import HowToBuy from "@/components/HowToBuy";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020F2A] overflow-x-hidden">
      <Header />
      <HeroBanner />
      <FeatureStrip />
      <BrazilSpotlight />
      <NationsGrid />
      <HowToBuy />
      <SocialProof />
      <Footer />
      <MobileCTA />
    </main>
  );
}
