import React from "react";
import Home from "../../components/Home/Index";
import SideBar from "../../components/Sidebar/Index";
import MobileMenu from '../../components/SuperAdminMobileMenu/Index'

const Index = () => {
  return (
    <div className="d-flex">
      <MobileMenu/>
      <div className="col-lg-2">
        <SideBar />
      </div>
      <div className="col-lg-10 superadmin_home">
        <Home />
      </div>
    </div>
  );
};

export default Index;
