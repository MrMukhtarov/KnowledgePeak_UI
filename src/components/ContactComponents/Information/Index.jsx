import React, { useEffect, useState } from "react";
import "./Index.css";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [setting, setSetting] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Settings")
      .then((res) => setSetting(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="Contact_Info" className="mt-5 py-3">
      <div className="container-contact">
        {setting.map((set) => {
          return (
            <div
              key={set.id}
              className="contact_info_all d-flex justify-content-center text-center"
            >
              <div className="contact_info_box d-flex flex-column gap-4 col-lg-5 justify-content-end text-start">
                <h3>Visit Us</h3>
                <p>{set.location}</p>
                <div>
                  <HashLink to="/contact#contact_map">Get Directions</HashLink>
                </div>
              </div>

              <div className="contact_info_box d-flex flex-column gap-4 col-lg-5 text-start">
                <h3>Get In Touch</h3>
                <div>
                  <p>TEL {set.phone}</p>
                  <p>EMAIL {set.email}</p>
                </div>
                <div>
                  <NavLink to="/">KnowledgePeak.com</NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Index;
