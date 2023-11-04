import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";
import "./Index,.css";
import {useNavigate } from "react-router-dom";

function Index() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [student, setStudent] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [grade, setGrade] = useState([]);
  const nav = useNavigate();

  const handleClose = () => setShow(false);

  const handleShow = (eventInfo) => {
    setSelectedEvent(eventInfo.event);
    setShow(true);
  };

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/StudentAuth/GetByUserName?userName=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setStudent(res.data.classSchedules);
        setGrade(res.data.studentHistory && res.data.studentHistory);
      });
  }, []);

  const currentDate = new Date();
  const dates = format(currentDate, "yyyy-MM-dd");
  const dateNow = `${dates}`;

  var notification =
    grade && grade.filter((g) => g.grade.gradeDate.substring(0,10) === dateNow);

  return (
    <div className="py-2 student_home" style={{ width: "90%" }}>
      {notification && (
        <div
          onClick={() => nav('/student/history')}
          style={{ cursor: "pointer" }}
          className="student_home_grade_not"
        >
          You Have {notification.length} New Grade
        </div>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectOverlap={true}
        events={
          student &&
          student.map((s) => ({
            date: s.scheduleDate.substring(0, 10),
            title:
              s.room.roomNumber +
              " " +
              s.lesson.name +
              " " +
              s.classTime.startTime +
              " " +
              s.classTime.endTime,
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
  );
}

export default Index;
