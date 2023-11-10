import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const [student,setStudent] = useState([])
    const [teacher,setTeacher] = useState({})
    const [selectStudent,setSelectStudent] = useState("")
    const [selectLesson,setSelectLesson] = useState([])
    const [errorMessages, setErrorMessages] = useState({});
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        axios
          .get("https://localhost:7153/api/StudentAuth/Get",{
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${user.token}`,
  
            },
          })
          .then((res) => setStudent(res.data))
          .catch((e) => console.log(e));
      }, []);

      useEffect(() => {
        axios.get(`https://localhost:7153/api/TeacherAuth/GetByUserName?Usermame=${user.username}`)
        .then(res => {
            setTeacher(res.data)
        })
    },[])
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
  
      if (name === "studentId") {
        setSelectStudent(value);
      }

      if (name === "lessonId") {
        setSelectLesson(value);
      }

      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  console.log(inputs);
    const handleSubmit = (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("studentId", selectStudent);
      formdata.append("lessonId", selectLesson);
      formdata.append("point", inputs.point);
      formdata.append("review", inputs.review);
      
      axios
        .post(`https://localhost:7153/api/Grades/Create`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${user.token}`,

          },
        })
        .then(res => {
         navigate('/teacher/grade')
        })
        .catch((e) => {
            if (e.response && e.response.data && e.response.data.errors) {
              setErrorMessages(e.response.data.errors);
            } else {
                setError(e.response.data.message);
            }
          });
    }
  return (
    <section className="faculty_create py-4">
    <div className="container">
      <div className="d-flex align-items-center gap-5">
        <i
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="fa-solid fa-arrow-left"
        ></i>
        <h5>Add Grade</h5>
      </div>
      <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Student</label>
          <select
            type="text"
            className="form-control"
            id="name"
            onChange={handleInputChange}
            name="studentId"
            value={selectStudent}
          >
            <option value="" selected disabled>Select Student</option>
            {student.filter(f => f.course < 5).map(e => {
                return(
                    <option key={e.id} value={e.id}>{e.name}  {e.surName}</option>
                )
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
            name="lessonId"
            value={selectLesson}
          >
            <option value="" selected disabled>Select Lesson</option>
            {teacher.lessons && teacher.lessons.map(e => {
                return (
                    <option key={e.id} value={e.id}>{e.name}</option>
                )
            })}
            </select>
            {errorMessages.StudentId ? (
              <div className="error-messages">
                <p style={{color:"red"}} className="error-message">{errorMessages.StudentId}</p>
              </div>
            ) : <div className="error-messages">
            <p style={{color:"red"}} className="error-message">{error && error.includes("StudentId")  ? error : "" }</p>
          </div>}
        </div>
        <div className="form-group mt-2">
            <label htmlFor="name">Point</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Point"
              onChange={handleInputChange}
              name="point"
            />
            {errorMessages.Point ? (
              <div className="error-messages">
                <p style={{color:"red"}} className="error-message">{errorMessages.Point}</p>
              </div>
            ) : <div className="error-messages">
            <p style={{color:"red"}} className="error-message">{error && error.includes("Point")  ? error : "" }</p>
          </div>}
          </div>
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="short">
              Review
            </label>
            <input
              type="text"
              className="form-control"
              id="short"
              placeholder="Enter Review"
              onChange={handleInputChange}
              name="review"
            />
             {errorMessages.Review ? (
              <div className="error-messages">
                <p style={{color:"red"}} className="error-message">{errorMessages.Review}</p>
              </div>
            ) : <div className="error-messages">
            <p style={{color:"red"}} className="error-message">{error && error.includes("Review") ? error : ""}</p>
          </div>}
          </div>
        <button
          style={{ backgroundColor: "#002140" }}
          type="submit"
          className="btn btn-success mt-2"
        >
          Add Grade
        </button>
      </form>
    </div>
  </section>
  )
}

export default Index