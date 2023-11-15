import React, { useEffect } from "react";
import "./Index.css";
import homeHero from "../../../assets/homehero.jpg";
import { NavLink } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <section id="HomeHero" className="pt-1">
      <div className="homehero-img">
        <img className="img-fluid" src={homeHero} alt="" />
        <div data-aos="fade-right"  className="HomeHero-content">
          <h2 title="Biz istəyirik ki, gənc nəsil bilikli, savadlı olsun, eyni zamanda vətənpərvərlik ruhunda tərbiyə alsın">
            BİZ İSTƏYİRİK Kİ, GƏNC NƏSİL BİLİKLİ, SAVADLI OLSUN, EYNİ ZAMANDA
            VƏTƏNPƏRVƏRLİK RUHUNDA TƏRBİYƏ ALSIN.
          </h2>
          <p>İlham Aliyev</p>
          <NavLink to="/about">Read Story</NavLink>
        </div>
       
      </div>
    </section>
  );
};

export default Index;
