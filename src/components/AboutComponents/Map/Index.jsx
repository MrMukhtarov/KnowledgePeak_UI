import React from "react";
import "./Index.css";
import AboutMap from '../../../assets/about-2.jpg'

const Index = () => {
  return (
    <section id="AboutMap" className="text-center">
      <h1>We are not just Friend, We are Family</h1>
      <p>
        uis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
        eros et accumsan.
      </p>
      <img className="img-fluid" src={AboutMap} alt="" />
    </section>
  );
};

export default Index;
