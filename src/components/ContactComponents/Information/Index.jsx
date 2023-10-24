import React from "react";
import "./Index.css";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

const Index = () => {
  return (
    <section id="Contact_Info" className="mt-5 py-3">
      <div className="container-contact">
        <div className="contact_info_all d-flex justify-content-center text-center">

          <div className="contact_info_box d-flex flex-column gap-4 col-lg-5 justify-content-end text-start">
            <h3>Visit Us</h3>
            <p>
              Riga 3839, Vilku Pagasts, Latvia 57766. Office : Monday to Friday:
              10am to 7pm
            </p>
            <div>
              <HashLink to="/contact#contact_map">Get Directions</HashLink>
            </div>
          </div>

          <div className="contact_info_box d-flex flex-column gap-4 col-lg-3 text-start">
            <h3>Get In Touch</h3>
            <div>
              <p>TEL +1 9009 23456789</p>
              <p>EMAIL info@kenzap.com</p>
            </div>
            <div>
              <NavLink to="/">sayidan.kenzap.com</NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
