
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ValueProposition from "../components/ValueProposition";
import FeaturesList from "../components/FeaturesList";
import Testimonials from "../components/Testimonials";
import PricingPlans from "../components/PricingPlans";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import PartnersSection from "../components/PartnersSection";
import CTASection from "../components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-neutral-light">
      <Navbar />
      <HeroSection />
      <div className="bg-white">
        <ValueProposition />
        <FeaturesList />
        <PartnersSection />
        <Testimonials />
        <PricingPlans />
        <FAQ />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
