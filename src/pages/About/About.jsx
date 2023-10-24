import React, { useEffect } from "react";
import "./Index.css";
import Banner from "../../components/AboutComponents/AboutBanner/Index";
import Description from "../../components/AboutComponents/Description/Index";
import Map from "../../components/AboutComponents/Map/Index";

const About = () => {
  useEffect(() => {
    document.title = "Knowledge Peak | About";
  }, []);
  return (
    <div>
      <Banner />
      <Description />
      <Map />
    </div>
  );
};

export default About;
