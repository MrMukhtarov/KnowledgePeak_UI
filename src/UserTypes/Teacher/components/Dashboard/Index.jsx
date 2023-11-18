import React, { useEffect, useState } from "react";
import "./Index.css";
import img1 from "../../../../assets/teacher-icon-01.svg";
import img2 from "../../../../assets/stu.svg";
import img3 from "../../../../assets/lesson.svg";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/daygrid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Index = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const [teacher, setTeacher] = useState({});
  const [groups, setGroups] = useState([]);
  const [getGroups, setGetGrops] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
  }, [user.username]);

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

  const handleClose = () => setShow(false);

  const handleShow = (eventInfo) => {
    setSelectedEvent(eventInfo.event);
    setShow(true);
  };

  return (
    <section className="teacher_dashboard py-3 h-100">
      <div className="container">
        <h1 className="teacher_dashboard_title">
          Welcome{" "}
          <span style={{ fontWeight: "bolder", color: "blue" }}>
            {teacher.userName}
          </span>
        </h1>
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
            All Lesson
          </h5>
          <div className="tutor_home_bottom mt-5 d-flex justify-content-center flex-column">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectOverlap={true}
              events={
                teacher.classSchedules &&
                teacher.classSchedules.map((s) => ({
                  date: s.scheduleDate.substring(0, 10),
                  title:
                    s.group &&
                    s.group.name +
                      " " +
                      s.room.roomNumber +
                      " " +
                      s.classTime.startTime +
                      " " +
                      s.classTime.endTime +
                      " " +
                      s.lesson.name,
                }))
              }
              eventClick={(e) => handleShow(e)}
            />

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Lesson Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedEvent && (
                  <div>
                    <p>Date: {selectedEvent.startStr}</p>
                    <p>Description: {selectedEvent.title}</p>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
