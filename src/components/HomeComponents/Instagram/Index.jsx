import React from "react";
import "./Index.css";
import { NavLink } from "react-router-dom";
import one from "../../../assets/ins1.jpg";
import two from "../../../assets/ins2.jpg";
import three from "../../../assets/ins3.jpg";
import four from "../../../assets/ins4.jpg";
import five from "../../../assets/ins5.jpg";
import six from "../../../assets/ins6.jpg";

const Index = () => {
  return (
    <section id="Instagram">
      <div className="instagram-all d-flex flex-column">
        <div className="instgram-top d-flex">
          <NavLink to="/" className="col-lg-2">
            <img className="img-fluid" src={one} alt="" />
          </NavLink>
          <NavLink to="/" className="col-lg-2">
            <img className="img-fluid" src={two} alt="" />
          </NavLink>
          <NavLink to="/" className="col-lg-2">
            <img className="img-fluid" src={three} alt="" />
          </NavLink>
          <NavLink to="/" className="col-lg-2">
            <img className="img-fluid" src={four} alt="" />
          </NavLink>
          <NavLink to="/" className="col-lg-2">
            <img className="img-fluid" src={five} alt="" />
          </NavLink>
          <NavLink to="/" className="col-lg-2">
            <img className="img-fluid" src={six} alt="" />
          </NavLink>
        </div>
        <div className="instgram-bottom text-center d-flex align-items-center justify-content-center gap-2">
          <i className="fa-brands fa-instagram"></i>
          <span>@KnwoledgePeakEdu</span>
        </div>
      </div>
    </section>
  );
};

export default Index;
