import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tutor, setTutor] = useState({});
  const [schedules, setSchedules] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/TutorAuth/GetSingle?userName=${user.username}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setTutor(res.data);
        setSchedules(res.data.classSchedules);
      });
  }, []);
  const newSchedules = schedules.sort((a, b) => b.id - a.id);

  return (
    <section className="tutor_home py-3">
      <div className="container">
        <h1 className="tutor_home_title mb-5">
          Welcome <span style={{ color: "blue" }}>{tutor.name}</span>
        </h1>
        <div className="tutor_home_all">
          <div className="tutor_home_top text-center">
            <h1
              className="tutor_home_groups_box_title_head"
              style={{ color: "blue" }}
            >
              My Groups
            </h1>
            <div className="tutor_home_groups d-flex gap-4 justify-content-center">
              {tutor.groups &&
                tutor.groups.map((e) => {
                  return (
                    <h3 onClick={() => nav(`/tutor/group/${e.id}`)} key={e.id} className="tutor_home_groups_box_title">
                      {e.name}
                    </h3>
                  );
                })}
            </div>
          </div>
          <div className="tutor_home_bottom mt-5 d-flex justify-content-center flex-column">
            <h1
              className="tutor_home_groups_box_title_head text-center"
              style={{ color: "blue" }}
            >
              Class Schedules
            </h1>
            <div className="d-flex  flex-wrap gap-3 justify-content-center">
              {newSchedules.slice(0, 6).map((c) => {
                return (
                  <div
                    key={c.id}
                    className="teacher_dashboard_bottom_box col-lg-3 d-flex flex-column justify-content-center align-items-center gap-2"
                  >
                    <div className="teacher_dashboard_bottom_box_top text-center">
                      <span className="text-center" style={{color:"blue"}}>Group Name : {c.group.name}</span><br />
                      <span className="text-center" style={{color:"blue"}}>Room : {c.room.roomNumber}</span>
                    </div>
                    <div className="teacher_dashboard_bottom_box_bottom d-flex gap-3 justify-centent-center">
                      <span>
                        <i className="fa-solid fa-calendar-days me-1"></i>
                        {c.scheduleDate.substring(0, 10)}
                      </span>
                      |
                      <span>
                        <i class="fa-solid fa-clock me-1"></i>
                        {c.classTime.startTime} : {c.classTime.endTime}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="m-auto btn btn-primary mt-3" onClick={() => nav(`/tutor/classschedules/${user.username}`)}>Show More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
