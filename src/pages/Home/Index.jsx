import React, { useEffect } from "react";
import HomeHero from "../../components/HomeComponents/HomeHero/Index";
import Information from "../../components/HomeComponents/Information/Index";
import Instagram from "../../components/HomeComponents/Instagram/Index";

const Index = () => {
  useEffect(() => {
    document.title = "Knowledge Peak";
  }, []);
  return (
    <div>
      <HomeHero />
      <Information />
      <Instagram />
    </div>
  );
};

export default Index;
