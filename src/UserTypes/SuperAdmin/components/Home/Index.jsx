import React from "react";
import "./Index.css";
import $ from "jquery";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Index = () => {
  const [stuCount, setStuCount] = useState();
  const [teacherCount, setTeacherCount] = useState();
  const [facultyCount, setFacultyCount] = useState();
  const [groupCount, setGroupCount] = useState();
  const [lessonCount, setLessonCount] = useState();
  const [roomCount, setRoomCount] = useState();
  const [specialityCount, setSpecialityCount] = useState();

  const OpenMobileMenu = () => {
    const x = $(".super_admin_mobile_menu");
    x.fadeIn("slow");
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/StudentAuth/Count")
      .then((res) => setStuCount(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/TeacherAuth/Count")
      .then((res) => setTeacherCount(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Facultys/Count")
      .then((res) => setFacultyCount(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Groups/Count")
      .then((res) => setGroupCount(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Lessons/Count")
      .then((res) => setLessonCount(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Rooms/Count")
      .then((res) => setRoomCount(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Specialities/Count")
      .then((res) => setSpecialityCount(res.data))
      .catch((err) => console.log(err));
  }, []);

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
                <h3>{stuCount}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Teacher</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>{teacherCount}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i className="fa-solid fa-school"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Facultys</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>{facultyCount}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i className="fa-solid fa-pen"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Groups</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>{groupCount}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i className="fa-solid fa-people-group"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Lessons</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>{lessonCount}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i className="fa-solid fa-book"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Rooms</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>{roomCount}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i className="fa-solid fa-people-roof"></i>
              </div>
            </div>
          </div>

          <div className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Specialityies</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>{specialityCount}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i className="fa-solid fa-glasses"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
