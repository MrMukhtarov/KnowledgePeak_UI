import React, { useEffect } from "react";
import "./Index.css";
import AboutMap from '../../../assets/about-2.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <section style={{overflow:"hidden"}} id="AboutMap" className="text-center">
      <h1 data-aos="fade-left">We are not just Friend, We are Family</h1>
      <p data-aos="fade-right">
        uis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
        eros et accumsan.
      </p>
      <img className="img-fluid" src={AboutMap} alt="" />
    </section>
  );
};

export default Index;
