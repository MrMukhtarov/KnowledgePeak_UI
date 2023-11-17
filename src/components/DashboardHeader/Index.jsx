import React, { useEffect, useState } from "react";
import "./Index.css";
import $ from "jquery";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const openDropDown = () => {
    const down = $(".dashboard-header-dropdown");
    down.fadeToggle("slow");
  };
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [start, setStart] = useState(false);
  const [type, setType] = useState("");

  function check(){
    if (user.roles[0] === "Teacher") {
      setType("TeacherAuth");
    } else if (user && user.roles[0] === "Admin") {
      setType("AdminAuth");
    } else if (user && user.roles[0] === "Tutor") {
      setType("TutorAuth");
    } else if (user && user.roles[0] === "Student") {
      setType("StudentAuth");
    }
  }

  useEffect(() => {
    if (start) {
      axios
        .post(`https://localhost:7153/api/${type}/SignOut`,{}, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json"
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.removeItem("user");
            navigate('/login')
          }
        })
        .catch((e) => console.log(e));
    }
  }, [type,start,user && user.token,]);

  const startCount = () => {
    setStart(true)
    check()
  }

  return (
    <header id="dashboard_header" className="py-2">
      <div className="container">
        <div className="dashboard_header_all d-flex justify-content-between align-items-center">
          <div className="dashboard_header_left">
            <div>
              <h4>Knowlegde Peak University</h4>
              <span>{user && user.roles}</span>
            </div>
          </div>
          <div className="dashboard_header_right">
            <div className="dashboard-header-dropwdown-top-right">
              <i
                onClick={startCount}
                className="fa-solid fa-right-from-bracket"
              ></i>
            </div>
            {/* <i onClick={openDropDown} className="fa-regular fa-user">
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
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Index;
