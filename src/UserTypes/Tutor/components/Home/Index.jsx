import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/daygrid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tutor, setTutor] = useState({});
  const [schedules, setSchedules] = useState([]);
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
  }, [user.token,user.username]);
  const handleClose = () => setShow(false);

  const handleShow = (eventInfo) => {
    setSelectedEvent(eventInfo.event);
    setShow(true);
  };
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
                    <h3
                      onClick={() => nav(`/tutor/group/${e.id}`)}
                      key={e.id}
                      className="tutor_home_groups_box_title"
                    >
                      {e.name}
                    </h3>
                  );
                })}
            </div>
          </div>
          <div className="tutor_home_bottom mt-5 d-flex justify-content-center flex-column">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectOverlap={true}
              events={
                schedules &&
                schedules.map((s) => ({
                  date: s.scheduleDate.substring(0, 10),
                  title:
                    s.room.roomNumber +
                    " " +
                    s.lesson.name +
                    " " +
                    s.group.name +
                    " " +
                    s.classTime.startTime +
                    " " +
                    s.classTime.endTime + " " + s.teacher.name,
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
            <button
              className="m-auto btn btn-primary mt-3"
              onClick={() => nav(`/tutor/classschedules/${user.username}`)}
            >
              Show More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
