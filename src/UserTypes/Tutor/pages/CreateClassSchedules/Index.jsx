import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker } from "antd";

const Index = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [lesson, setLesson] = useState([]);
  const [classTime, setClassTime] = useState([]);
  const [room, setRoom] = useState([]);
  const [selectRoom, setSelectRoom] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const [selectTeacher, setSelectTeacher] = useState("");
  const [selectClassTime, setSelectClassTime] = useState("");
  const [selectLesson, setSelectLesson] = useState("");
  const [isLessonSelectDisabled, setIsLessonSelectDisabled] = useState(true);
  const [speciality, setSpeciality] = useState({});
  const [group, setGroup] = useState({});
  const [start,setStart] = useState(false)

  useEffect(() => {
    axios.get("https://localhost:7153/api/TeacherAuth/GetAll").then((res) => {
      setTeacher(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`https://localhost:7153/api/Groups/Get/${id}`)
      .then((res) => {
        setGroup(res.data.speciality && res.data.speciality.id)
        setStart(true)
      });
  }, [id]);

  useEffect(() => {
    if (start) {
      axios
        .get(`https://localhost:7153/api/Specialities/GetById/${group}`)
        .then((res) => setSpeciality(res.data.facultyId && res.data.facultyId));
    }
  }, [group,start]);

  useEffect(() => {
    if (selectTeacher) {
      axios
        .get(`https://localhost:7153/api/TeacherAuth/GetById/${selectTeacher}`)
        .then((res) => {
          setLesson(res.data.lessons);
        });
    }
  }, [isLessonSelectDisabled, selectTeacher]);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Rooms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setRoom(
          res.data.filter((r) => r.faculty && r.faculty.id === speciality)
        );
      });
  }, [speciality, user.token]);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/ClassTime", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setClassTime(res.data);
      });
  }, [user.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "teacherId") {
      setSelectTeacher(value);
      setIsLessonSelectDisabled(false);
    }
    if (name === "lessonId") {
      setSelectLesson(value);
    }
    if (name === "classTimeId") {
      setSelectClassTime(value);
    }
    if (name === "roomId") {
      setSelectRoom(value);
    }
    setErrorMessages((prev) => ({
      ...prev,
      [name]: null,
    }));
    setError("");
  };

  useEffect(() => {
    setErrorMessages({});
  }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("lessonId", selectLesson);
    formdata.append("teacherId", selectTeacher);
    formdata.append("classTimeId", selectClassTime);
    formdata.append("roomId", selectRoom);
    formdata.append("scheduleDate", inputs.scheduleDate);
    formdata.append("groupId", id);

    axios
      .post(`https://localhost:7153/api/ClassSchedules/Create`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/tutor");
        }
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
      });
  };
  return (
    <section className="faculty_create py-4">
      <div className="container">
        <div className="d-flex align-items-center gap-5">
          <i
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
            className="fa-solid fa-arrow-left"
          ></i>
          <h5>Create Schedule</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          {/* ---- */}
          <div className="error-messages">
            <p className="error-message" style={{ color: "red" }}>
              {error && (error.includes("This") || error.includes("written") || error.includes("Empty"))
                ? error
                : ""}
            </p>
          </div>
          <div className="form-group w-100">
            <label className=" control-label">Appoinment Date</label>
            <div className="w-100">
              <DatePicker
                className="w-100"
                showTime
                name="scheduleDate"
                format="YYYY-MM-DD"
                placeholder="Select Date and Time"
                onChange={(date, dateString) =>
                  handleInputChange({
                    target: { name: "scheduleDate", value: dateString },
                  })
                }
              />
              {errorMessages.ScheduleDate ? (
                <div className="error-messages">
                  <p style={{ color: "red" }} className="error-message">
                    {errorMessages.ScheduleDate}
                  </p>
                </div>
              ) : (
                <div className="error-messages">
                  <p className="error-message" style={{ color: "red" }}>
                    {error.includes("ScheduleDate") ? error : ""}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="gender">Teacher</label>
            <select
              type="text"
              className="form-control"
              id="gender"
              onChange={handleInputChange}
              name="teacherId"
              value={selectTeacher}
            >
              <option value="" selected disabled>
                Select Teacher
              </option>
              {teacher &&
                teacher
                  .filter((t) => t.isDeleted === false)
                  .map((e) => {
                    return (
                      <option key={e.id} value={e.id}>
                        {e.name} {e.surName}
                      </option>
                    );
                  })}
            </select>
            {errorMessages.TeacherId ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.TeacherId}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("TeacherId") ? error : ""}
                </p>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Lesson</label>
            <select
              type="text"
              className="form-control"
              id="gender"
              onChange={handleInputChange}
              name="lessonId"
              value={selectLesson}
            >
              <option value="" selected disabled>
                Select Lesson
              </option>
              {lesson &&
                lesson.map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
            </select>
            {errorMessages.LessonId ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.LessonId}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("LessonId") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="gender">Class Time</label>
            <select
              type="text"
              className="form-control"
              id="gender"
              onChange={handleInputChange}
              name="classTimeId"
              value={selectClassTime}
            >
              <option value="" selected disabled>
                Select Class Time
              </option>
              {classTime &&
                classTime.map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.startTime} : {e.endTime}
                    </option>
                  );
                })}
            </select>
            {errorMessages.ClassTimeId ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.ClassTimeId}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("ClassTimeId") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="gender">Room</label>
            <select
              type="text"
              className="form-control"
              id="gender"
              onChange={handleInputChange}
              name="roomId"
              value={selectRoom}
            >
              <option value="" selected disabled>
                Select Room
              </option>
              {room &&
                room.map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.roomNumber}
                    </option>
                  );
                })}
            </select>
            {errorMessages.RoomId ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.RoomId}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("Room") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <button
            style={{ backgroundColor: "#002140" }}
            type="submit"
            className="btn btn-success mt-2"
          >
            Create Schedule
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;
