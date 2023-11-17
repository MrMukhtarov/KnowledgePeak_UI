import React, { useEffect, useState } from "react";
import "./Index.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/knowledge-peak-university-high-resolution-logo-black-transparent.png";
import $ from "jquery";
import axios from "axios";

const Index = () => {
  const [setting, setSetting] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Settings")
      .then((res) => setSetting(res.data))
      .catch((err) => console.log(err));
  }, []);

  const Burger = () => {
    const mobileMenu = $(".mobile-menu");
    mobileMenu.fadeIn("slow");
  };
  const CloseMenu = () => {
    const mobileMenu = $(".mobile-menu");
    mobileMenu.fadeOut("slow");
  };
  const menuClose = () => {
    const mobileMenu = $(".mobile-menu");
    mobileMenu.fadeOut("slow");
  };

  const Active = () => {};

  return (
    <header className="p-3">
      <div className="container">
        <div className="header-all d-flex align-items-center justify-content-between">
          <div className="header-left col-lg-2">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "header_active" : "header_link"
              }
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "header_active" : "header_link"
              }
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
          <div className="header-center col-lg-4">
            {setting.map((set) => {
              return (
                <NavLink key={set.id} to="/">
                  <img
                    className="img-fluid"
                    src={`${set.headerLogo.replace(/\\/g, "/")}`}
                    alt="logo"
                  />
                </NavLink>
              );
            })}
          </div>
          <div className="header-right col-lg-3">
            <NavLink
              className={({ isActive }) =>
                isActive ? "header_active" : "header_link"
              }
              to="/ourteacher"
            >
              Teacher
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "header_active" : "header_link"
              }
              to="/login"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>

      <div className="mobile-header">
        <div className="mobile-header-all d-flex align-items-center justify-content-between">
          <div className="mobile-header-left">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="mobile-header-right">
            <i onClick={Burger} className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>

      <div className="mobile-menu w-100" style={{ left: "0" }}>
        <i onClick={CloseMenu} className="fa-solid fa-x"></i>
        <ul>
          <li>
            <NavLink onClick={menuClose} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={menuClose} to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink onClick={menuClose} to="/contact">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink onClick={menuClose} to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink onClick={menuClose} to="/">
              Teacher
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Index;
