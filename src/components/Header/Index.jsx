  import React from "react";
  import "./Index.css";
  import { NavLink } from "react-router-dom";
  import logo from "../../assets/knowledge-peak-university-high-resolution-logo-black-transparent.png";
  import $ from 'jquery';

  const Index = () => {
      const Burger = () => {
        const mobileMenu = $(".mobile-menu");
          mobileMenu.fadeIn("slow")
      }
      const CloseMenu = () => {
          const mobileMenu = $(".mobile-menu");
          mobileMenu.fadeOut("slow")
      }
      const menuClose = () => {
        const mobileMenu = $(".mobile-menu");
        mobileMenu.fadeOut("slow")
      }
  
    return (
      <header className="p-3">
        <div className="container">
          <div className="header-all d-flex align-items-center justify-content-between">
            <div className="header-left col-lg-2">
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
            <div className="header-center col-lg-4">
              <NavLink to="/">
                <img className="img-fluid" src={logo} alt="logo" />
              </NavLink>
            </div>
            <div className="header-right col-lg-3">
              <NavLink to="/">Blog</NavLink>
              <NavLink className="header-login" to="/login">
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

        <div className="mobile-menu w-100" style={{left:"0"}}>
          <i onClick={CloseMenu} className="fa-solid fa-x"></i>
          <ul>
            <li>
              <NavLink onClick={menuClose} to="/">Home</NavLink>
            </li>
            <li>
              <NavLink onClick={menuClose} to="/about">About</NavLink>
            </li>
            <li>
              <NavLink onClick={menuClose} to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink onClick={menuClose} to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink onClick={menuClose} to="/">Blog</NavLink>
            </li>
          </ul>
        </div>
      </header>
    );
  };

  export default Index;
