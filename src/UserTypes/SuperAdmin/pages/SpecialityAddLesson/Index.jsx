import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [speciality, setSpeciality] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [selectSpeciality, setSelectSpeciality] = useState("");
  const [selectLesson, setSelectLesson] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState("");
  const [dsaible,setDisable] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Specialities/Get", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setSpeciality(res.data)
      });
  }, [user.token]);


  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Lessons")
      .then((res) => setLesson(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if(dsaible){
    axios.get(`https://localhost:7153/api/Specialities/GetById/${selectSpeciality}`)
    .then(res => {
      setSelectLesson(res.data.lessonSpecialities && res.data.lessonSpecialities.map(l => l.lesson.id))
    })
    }
  },[dsaible,selectSpeciality])

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "id") {
        setSelectSpeciality(value);
        setDisable(true)
    }

    if (name === "lessonIds") {
        const selectedLessons = Array.from(options)
          .filter((option) => option.selected && option.value !== "")
          .map((option) => Number(option.value));
    
        setSelectLesson(selectedLessons);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("id", selectSpeciality);
    selectLesson.forEach((lessonIds) => {
        formdata.append("lessonIds", lessonIds);
      });

    axios
      .post(`https://localhost:7153/api/Specialities/AddLesson/${selectSpeciality}`, formdata, {
        headers: {
            Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/superadmin/speciality");
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setError(e.response.data.errors);
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
          <h5>Add Lesson For Speciality</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Speciality</label>
            <select
              type="text"
              className="form-control"
              id="name"
              onChange={handleInputChange}
              name="id"
              value={selectSpeciality}
            >
              <option value="" selected disabled>
                Select Speciality
              </option>
              {speciality
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
              value={selectLesson}
              multiple
            >
              <option value="" selected>
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
            {error ? <div className="error-messages text-center">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("Tutor") ? error : ""}
                </p>
              </div> : ""}
          </div>
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
