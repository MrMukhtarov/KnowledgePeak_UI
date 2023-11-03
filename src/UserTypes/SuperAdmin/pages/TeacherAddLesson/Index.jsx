import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [selectTeacher, setSelectTeacher] = useState("");
  const [selectLesson, setSelectLesson] = useState([]);
  const [errorMessages, setErrorMessages] = useState("");
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/TeacherAuth/GetAll")
      .then((res) => setTeacher(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Lessons")
      .then((res) => setLesson(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "userName") {
      setSelectTeacher(value);
    }

    if (name === "lessonIds") {
      const selectedlesson = Array.from(options)
        .filter((option) => option.selected && option.value !== "")
        .map((option) => Number(option.value));

      setSelectLesson(selectedlesson);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userName", selectTeacher);

    selectLesson.forEach((lessonIds) => {
      formdata.append("lessonIds", lessonIds);
    });

    axios
      .post(
        `https://localhost:7153/api/TeacherAuth/AddLesson?userName=${selectTeacher}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        navigate("/superadmin/teacher");
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
          <h5>Add Lesson For Teacher</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Teacher UserName</label>
            <select
              type="text"
              className="form-control"
              id="name"
              onChange={handleInputChange}
              name="userName"
              value={selectTeacher}
            >
              <option value="" selected disabled>
                Select Teacher
              </option>
              {teacher
                .filter((f) => f.isDeleted === false)
                .map((e) => {
                  return (
                    <option key={e.id} value={e.userName}>
                      {e.userName}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* ------ */}
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="short">
              Lesson
            </label>
            <select
              type="text"
              className="form-control"
              id="short"
              onChange={handleInputChange}
              name="lessonIds"
              multiple
              value={selectLesson}
            >
              <option selected disabled>
                Select Lesson
              </option>
              {lesson
                .filter((f) => f.isDeleted === false)
                .map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {errorMessages ? (
            <div className="error-messages">
              <p style={{ color: "red" }} className="error-message">
                {errorMessages.message}
              </p>
            </div>
          ) : (
            <div className="error-messages">
              <p style={{ color: "red" }} className="error-message">
                {error}
              </p>
            </div>
          )}
          <button
            style={{ backgroundColor: "#002140" }}
            type="submit"
            className="btn btn-success mt-2"
          >
            Add Lesson
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;
