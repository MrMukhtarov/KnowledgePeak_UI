import React from "react";
import "./Index.css";
import { NavLink } from "react-router-dom";
import $ from 'jquery'

const Index = () => {
const Close = () => {
    const x = $(".super_admin_mobile_menu")
    x.fadeOut("slow")
    document.body.style.overflow = "auto"
}
  return (
    <div className="super_admin_mobile_menu">
      <div className="super_admin_mobile_menu_all">
        <i onClick={Close} className="fa-solid fa-x das_x"></i>
        <div className="super_admin_mobile_menu_nav">
            <ul>
                <li><NavLink onClick={Close} to="/superadmin">Dashboard</NavLink></li>
                <li><NavLink onClick={Close} to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink onClick={Close} to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink onClick={Close} to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink onClick={Close} to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink onClick={Close} to="/dashboard">Dashboard</NavLink></li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
