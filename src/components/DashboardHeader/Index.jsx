import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [start, setStart] = useState(false);
  const [type, setType] = useState("");

  function check() {
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
        .post(
          `https://localhost:7153/api/${type}/SignOut`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.removeItem("user");
            navigate("/login");
          }
        })
        .catch((e) => console.log(e));
    }
  }, [type, start, user && user.token]);

  const startCount = () => {
    setStart(true);
    check();
  };

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
            <div className="dashboard-header-dropwdown-top-right d-flex align-items-center">
              <div onClick={() => navigate(`/${user.roles[0].toLowerCase()}/profile`)} style={{cursor:"pointer"}}>
                <i className="fa-regular fa-user me-2"></i>
                <span
                  style={{ color: "white", fontWeight: "bolder" }}
                  className="me-3"
                >
                  {user.username}
                </span>
              </div>
              <i
                onClick={startCount}
                className="fa-solid fa-right-from-bracket"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Index;
