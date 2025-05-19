
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import FeaturesList from "../components/FeaturesList";
import CTASection from "../components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <div className="bg-black">
        <FeaturesList />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
