import React from "react";
import "./Index.css";
import $ from 'jquery'

const Index = () => {

  const OpenMobileMenu = () => {
    const x = $(".super_admin_mobile_menu")
    x.fadeIn("slow")
    document.body.style.overflow = "hidden"
  }

  return (
    <section id="superAdmin_home" className="py-5">
      <div className="container">
      <i onClick={OpenMobileMenu} className="fa-solid fa-bars supad-bars"></i>
        <div className="super_admin_home_all d-flex justify-content-center flex-wrap gap-5">
          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Stdents</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>3</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i class="fa-solid fa-graduation-cap"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Teacher</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>10</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i class="fa-solid fa-school"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Facultys</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>25</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i class="fa-solid fa-pen"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Groups</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>52</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i class="fa-solid fa-people-group"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Lessons</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>48</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i class="fa-solid fa-book"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Rooms</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>353</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i class="fa-solid fa-people-roof"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Specialityies</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>41</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i class="fa-solid fa-glasses"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
