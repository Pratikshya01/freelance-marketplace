import React from "react";
import HeroSection from "../components/home/HeroSection";
import ServiceCategories from "../components/home/ServiceCategories";
import HowItWorks from "../components/home/HowItWorks";
import ClientFeedback from "../components/home/ClientFeedback";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServiceCategories />
      <HowItWorks />
      <ClientFeedback />
    </>
  );
};

export default Home;
