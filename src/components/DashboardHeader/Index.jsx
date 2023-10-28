import React from "react";
import "./Index.css";
import $ from "jquery";

const Index = () => {
  const openDropDown = () => {
    const down = $(".dashboard-header-dropdown");
    down.fadeToggle("slow");
  };
  return (
    <header id="dashboard_header" className="py-2">
      <div className="container">
        <div className="dashboard_header_all d-flex justify-content-between align-items-center">
          <div className="dashboard_header_left">
           <div>
           <h4>Knowlegde Peak University</h4>
            <span>Super Admin</span>
           </div>
          </div>
          <div className="dashboard_header_right">
            <i onClick={openDropDown} className="fa-regular fa-user">
              <i className="fa-solid fa-angle-down"></i>
            </i>

            <div className="dashboard-header-dropdown">
              <div className="dashboard-header-dropdown-all d-flex flex-column align-items-center">
                <div className="dashboard-header-dropdown-top d-flex align-items-center justify-content-between">
                  <div className="dashboard-header-dropwdown-top-left d-flex align-items-center gap-2">
                    <div className="w-25">
                      <img
                        src="https://www.hitechparks.com/web/apps/university/dashboard/images/user/avatar-2.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <span className="dashboard-header-dropdown-role">
                      Super Admin
                    </span>
                  </div>
                  <div className="dashboard-header-dropwdown-top-right">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </div>
                </div>
                <div className="dashboard-header-dropdown-bottom">
                  <i className="fa-solid fa-circle-user">
                    <span>My Profile</span>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Index;
