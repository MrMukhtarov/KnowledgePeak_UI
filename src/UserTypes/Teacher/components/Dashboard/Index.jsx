import React, { useEffect, useState } from "react";
import "./Index.css";
import img1 from "../../../../assets/teacher-icon-01.svg";
import img2 from "../../../../assets/stu.svg";
import img3 from "../../../../assets/lesson.svg";
import axios from "axios";

const Index = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const [teacher, setTeacher] = useState({});
  const [groups, setGroups] = useState([]);
  const [getGroups, setGetGrops] = useState([]);
  var count = [];
  var stuCount = 0;

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/TeacherAuth/GetByUserName?Usermame=${user.username}`
      )
      .then((res) => {
        setTeacher(res.data);
        setGroups(
          res.data.classSchedules &&
            res.data.classSchedules.map((g) => g.group.id)
        );
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios.get("https://localhost:7153/api/Groups").then((res) => {
      setGetGrops(res.data);
    });
  }, []);

  function RemoveDuplicateid(data) {
    return [...new Set(data)];
  }
  function CountStudent(ids, getGroups) {
    ids &&
      ids.forEach((e) => {
        getGroups &&
          getGroups.forEach((g) => {
            if (e === g.id) {
              count.push(g);
            }
          });
      });
  }
  var ids = RemoveDuplicateid(groups);
  CountStudent(ids, getGroups);
  function Student(count) {
    count &&
      count.forEach((s) => {
        stuCount += s.students.length;
      });
  }
Student(count);

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  return (
    <section className="teacher_dashboard py-3 h-100">
      <div className="container">
        <h1 className="teacher_dashboard_title">Welcome <span style={{fontWeight:"bolder", color:"blue"}}>{teacher.userName}</span></h1>
        <div className="teacher_dashboard_top d-flex justify-content-center gap-5 mt-5">
          <div className="teacher_dashboard_top_box col-lg-3 d-flex justify-content-between align-items-center">
            <div className="teacher_dashboard_top_box_left">
              <h6>Total Lessons</h6>
              <h3>{teacher.lessons && teacher.lessons.length}</h3>
            </div>
            <div className="teacher_dashboard_top_box_right">
              <img src={img3} alt="" />
            </div>
          </div>

          <div className="teacher_dashboard_top_box col-lg-3 d-flex justify-content-between align-items-center">
            <div className="teacher_dashboard_top_box_left">
              <h6>Total Groups</h6>
              <h3>{count.length}</h3>
            </div>
            <div className="teacher_dashboard_top_box_right">
              <img src={img1} alt="" />
            </div>
          </div>

          <div className="teacher_dashboard_top_box col-lg-3 d-flex justify-content-between align-items-center">
            <div className="teacher_dashboard_top_box_left">
              <h6>Total Students</h6>
              <h3>{stuCount && stuCount}</h3>
            </div>
            <div className="teacher_dashboard_top_box_right">
              <img src={img2} alt="" />
            </div>
          </div>
        </div>
        <div className="teacher_dashboard_bottom mt-5">
          <h5 className="teacher_dashboard_bottom_title text-center mb-4">
            Upcoming Lesson
          </h5>
          <div className="teacher_dashboard_bottom_all d-flex justify-content-center flex-wrap gap-3">
            {teacher.classSchedules &&
              teacher.classSchedules
                .filter((g) => g.scheduleDate > currentDate)
                .map((c) => {
                  return (
                    <div
                      key={c.id}
                      className="teacher_dashboard_bottom_box col-lg-3 d-flex flex-column justify-content-center align-items-center gap-2"
                    >
                      <div className="teacher_dashboard_bottom_box_top text-center">
                        <span className="text-center">{c.group.name}</span>
                      </div>
                      <div className="teacher_dashboard_bottom_box_bottom d-flex gap-3 justify-centent-center">
                        <span>
                          <i className="fa-solid fa-calendar-days me-1"></i>
                          {c.scheduleDate.substring(0,10)}
                        </span>
                        |
                        <span>
                          <i class="fa-solid fa-clock me-1"></i>{c.classTime.startTime}-{c.classTime.endTime}
                        </span>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
