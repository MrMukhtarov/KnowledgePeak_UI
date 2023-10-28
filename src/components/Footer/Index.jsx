import React, { useEffect, useState } from "react";
import "./Index.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [setting,setSetting] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:7153/api/Settings")
    .then((res) => setSetting(res.data))
    .catch((err) => console.log(err));
  },[])
  return (
    <footer className="py-4">
      <div className="container">
        <div className="footer-all d-flex flex-column flex-lg-row align-items-center justify-content-between flex-lg-nowrap flex-md-wrap flex-sm-column gap-sm-3">
          <div className="footer-left col-lg-4 col-md-6 d-flex flex-column gap-2 col-sm-12 text-sm-center col-12">
            {setting.map(set => {
              return (
                <NavLink key={set.id} to="/">
                <img className="img-fluid w-75" src={set.footerLogo.replace(/\\/g, "/")} alt="" />
              </NavLink>
              )
            })}
            <p>
              Alumni Association of the University of Sayidan. The best
              university in the world located in Sayidan city.
            </p>
          </div>
          <div className="footer-center col-lg-5 col-md-6 d-flex gap-5 col-sm-12 justify-content-sm-center col-12">
           <div className="footer-center-box">
            <h6>UNIVERSITY</h6>
            <ul>
                <li><NavLink to="/">STUDENTS</NavLink></li>
                <li><NavLink to="/">EVENTS</NavLink></li>
                <li><NavLink to="/">GALLERY</NavLink></li>
                <li><NavLink to="/">NEWS</NavLink></li>
            </ul>
           </div>

           <div className="footer-center-box">
            <h6>ALUMNI</h6>
            <ul>
                <li><NavLink to="/contact">CONTACTS</NavLink></li>
                <li><NavLink to="/">CAREER</NavLink></li>
                <li><NavLink to="/about">ABOUT US</NavLink></li>
                <li><NavLink to="/">APPLY TO JOB</NavLink></li>
            </ul>
           </div>

           <div className="footer-center-box">
            <h6>ACCOUNT</h6>
            <ul>
                <li><NavLink to="/">PROFILE</NavLink></li>
                <li><NavLink to="/">STORIES</NavLink></li>
                <li><NavLink to="/">PASSWORD</NavLink></li>
                <li><NavLink to="/">DOWNLOADS</NavLink></li>
            </ul>
           </div>
          </div>
          <div className="footer-right col-lg-3 d-flex flex-column gap-4 justify-md-center col-md-12 col-12">
            <NavLink to="/about">EXPLORE US</NavLink>
            <ul className="p-0 d-flex justify-content-center gap-3">
                <li><i className="fa-brands fa-facebook-f"></i></li>
                <li><i className="fa-brands fa-twitter"></i></li>
                <li><i className="fa-brands fa-youtube"></i></li>
                <li><i className="fa-brands fa-linkedin-in"></i></li>
                <li><i className="fa-brands fa-instagram"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Index;
