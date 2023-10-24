import React from "react";
import "./Index.css";
import homeHero from "../../../assets/homehero.jpg";
import { NavLink } from "react-router-dom";

const Index = () => {
  return (
    <section id="HomeHero" className="pt-1">
      <div className="homehero-img">
        <img className="img-fluid" src={homeHero} alt="" />
        <div className="HomeHero-content">
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
