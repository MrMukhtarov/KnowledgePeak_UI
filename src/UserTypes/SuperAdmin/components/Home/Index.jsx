import React from "react";
import "./Index.css";
import $ from "jquery";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from 'react-icons/fa';
import { CiTimer } from 'react-icons/ci';
import { MdFeedback } from "react-icons/md";
import { format } from "date-fns";

const Index = () => {
  const [stuCount, setStuCount] = useState();
  const [teacherCount, setTeacherCount] = useState();
  const [facultyCount, setFacultyCount] = useState();
  const [groupCount, setGroupCount] = useState();
  const [lessonCount, setLessonCount] = useState();
  const [roomCount, setRoomCount] = useState();
  const [specialityCount, setSpecialityCount] = useState();
  const [tutorCount, setTutorCount] = useState();
  const [classTimeCount, setClassTimeCount] = useState();
  const [feedBack, setFeedBack] = useState();
  const nav = useNavigate();
  const [feedbackList, setFeedBackList] = useState([])
  const user = JSON.parse(localStorage.getItem("user"));
  const colors = ["#002140","green"];
  const [value, setvalue] = useState(0);

  const OpenMobileMenu = () => {
    const x = $(".super_admin_mobile_menu");
    x.fadeIn("slow");
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if(feedbackList && feedbackList.length > 0){
      const interval = setInterval(() => {
        setvalue((v) => {
          return v === 4 ? 0 : v + 1;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [feedbackList]);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/StudentAuth/Count")
      .then((res) => setStuCount(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Contacts/Count")
      .then((res) => setFeedBack(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/classtime/Count")
      .then((res) => setClassTimeCount(res.data))
      .catch((err) => console.log(err));
  }, []);

   useEffect(() => {
    axios
      .get("https://localhost:7153/api/TutorAuth/Count")
      .then((res) => setTutorCount(res.data))
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



  const currentDate = new Date();
  const dates = format(currentDate, "yyyy-MM-dd");
  const dateNow = `${dates}`

  useEffect(() => {
    axios.get(`https://localhost:7153/api/Contacts/GetAllForNotification`,{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then(res => setFeedBackList(res.data && res.data.filter(f => f.isRead === false)))
  },[dateNow,user.token])

  console.log(feedbackList);

  return (
    <section>
        <div className="px-5 ms-3 mt-5">
          {feedbackList && feedbackList.length > 0 ? <span onClick={() => nav("/superadmin/feedback")} style={{ backgroundColor: colors[value], cursor:"pointer" }}  className="admin_feedback_notification">{feedbackList && feedbackList.length} New Feedback!</span> :
          <span className="admin_feedback_notification">You Have 0 New Feedback!</span>}
        </div>
        <div  id="superAdmin_home" className="py-5">
        <div className="container">
        <i onClick={OpenMobileMenu} className="fa-solid fa-bars supad-bars"></i>
        <div className="super_admin_home_all d-flex justify-content-center flex-wrap gap-5">
          <div onClick={() => nav('/superadmin/student')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
            <div  className="super_admin_home_box_top">
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

          <div onClick={() => nav('/superadmin/teacher')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
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

          <div onClick={() => nav('/superadmin/faculty')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
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

          <div onClick={() => nav('/superadmin/group')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
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

          <div onClick={() => nav('/superadmin/lesson')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
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

          <div onClick={() => nav('/superadmin/room')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
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

          <div onClick={() => nav('/superadmin/speciality')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
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

          <div onClick={() => nav('/superadmin/tutor')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Tutor</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>{tutorCount}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i><FaChalkboardTeacher/></i>
              </div>
            </div>
          </div>

          <div onClick={() => nav('/superadmin/classtime')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Class Time</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>{classTimeCount}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i><CiTimer/></i>
              </div>
            </div>
          </div>

          <div onClick={() => nav('/superadmin/feedback')} style={{cursor:"pointer"}} className="super_admin_home_box col-lg-3">
            <div className="super_admin_home_box_top">
              <h5>Feedback</h5>
            </div>
            <div className="super_admin_home_box_bottom d-flex justify-content-between align-items-center">
              <div className="super_admin_home_box_bottom_left">
                <h3>{feedBack}</h3>
              </div>
              <div className="super_admin_home_box_bottom_right">
                <i><MdFeedback/></i>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
   
    </section>
  );
};

export default Index;
