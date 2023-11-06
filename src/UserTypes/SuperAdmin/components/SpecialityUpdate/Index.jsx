import React, { useEffect, useState } from 'react'
import './Index.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const[inpust,setInputs]=useState({})
  const[faculty,setFaculty]=useState([])
  const[lesson,setLesson]=useState([])
  const[speciality,setSpeciality]=useState({})
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const [selectLessons, setSelectLessons] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'))
  const [selectFaculty,setSelectFaculty]= useState("")
  
useEffect(() => {
  axios.get(`https://localhost:7153/api/Specialities/GetById/${id}`)
  .then(res => {
    setSpeciality(res.data)
    setInputs(res.data)
    setSelectFaculty(res.data.facultyId && res.data.facultyId)
    setSelectLessons(res.data.lessonSpecialities && res.data.lessonSpecialities.map(l => l.lesson.id))
  })
  .catch(e => console.log(e))
},[id])

  
useEffect(() => {
  axios.get(`https://localhost:7153/api/Facultys/GetAll`)
  .then(res => {
    setFaculty(res.data)
  })
  .catch(e => console.log(e))
},[id])

useEffect(() => {
  axios.get(`https://localhost:7153/api/Lessons`)
  .then(res => {
    setLesson(res.data)
  })
  .catch(e => console.log(e))
},[id])

const handleInputChange = (e) => {
  const { name, value } = e.target;

  setInputs((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (name === "facultyId") {
   setSelectFaculty(value)
  }
  if (name === "lessonIds") {
    const selectedLessonIds = Array.from(e.target.selectedOptions).map(
      (option) => Number(option.value)
    );
    setSelectLessons(selectedLessonIds);
  }
};
console.log(inpust);
const handleSubmit = (e) => {
  e.preventDefault()
  var formData = new FormData();
  formData.append("name",inpust.name)
  formData.append("shortName",inpust.shortName)
  formData.append("facultyId",selectFaculty ? selectFaculty : "")
  
    selectLessons.forEach((lessonId) => {
      formData.append("lessonIds", lessonId);
    });

  axios.put(`https://localhost:7153/api/Specialities/Update/${id}`,formData,{
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  })
  .then(res => navigate('/superadmin/speciality'))
  .catch((e) => {
    if (e.response && e.response.data && e.response.data.errors) {
      setErrorMessages(e.response.data.errors);
    } else {
        setError(e.response.data.message);
    }
  });
}
  return (
    <section className="faculty_update py-4">
    <div className="container">
      <div className="d-flex align-items-center gap-5">
        <i
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="fa-solid fa-arrow-left"
        ></i>
        <h5>Update Speciality</h5>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="w-50 m-auto mt-5">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Speciality Name"
            name="name"
            defaultValue={speciality.name}
            onChange={handleInputChange}
          />
           {errorMessages.Name ? (
              <div className="error-messages">
                <p style={{color:"red"}} className="error-message">{errorMessages.Name}</p>
              </div>
            ) : <div className="error-messages">
            <p style={{color:"red"}} className="error-message">{error.includes("name")  ? error : "" }</p>
          </div>}
        </div>
        {/* {}======= */}
        <div className="form-group mt-3">
          <label className="mb-1" htmlFor="short">
            Short Name
          </label>
          <input
            type="text"
            className="form-control"
            id="short"
            placeholder="Enter Short Name"
            name="shortName"
            defaultValue={speciality.shortName}
            onChange={handleInputChange}
          />
            {errorMessages.ShortName ? (
              <div className="error-messages">
                <p style={{color:"red"}} className="error-message">{errorMessages.ShortName}</p>
              </div>
            ) : <div className="error-messages">
            <p style={{color:"red"}} className="error-message">{error.includes("ShortName") ? error : ""}</p>
          </div>}
        </div>
        {/* //////// */}
        <div className="form-group">
          <span style={{color:'green'}}>Current Faculty : {speciality.facultyId ? speciality.facultyId : "No current faculty"}</span><br />
          <label htmlFor="facllty">Faculty</label>
          <select
            className="form-control"
            id="facllty"
            name="facultyId"
            value={selectFaculty}
            onChange={handleInputChange}
          >
            <option value="" selected>Select Faculty</option>
            {faculty.filter(s => s.isDeleted === false).map(f => {
              return(
                <option key={f.id} value={f.id}>{f.id} - {f.name}</option>
              )
            })}
            </select>
           {errorMessages.Name ? (
              <div className="error-messages">
                <p style={{color:"red"}} className="error-message">{errorMessages.FacultyId}</p>
              </div>
            ) : <div className="error-messages">
            <p style={{color:"red"}} className="error-message">{error.includes("FaculyId")  ? error : "" }</p>
          </div>}
        </div>
        {/* /////////////// */}
        <div className="form-group">
         {speciality.lessonSpecialities && speciality.lessonSpecialities.length > 0 ? 
            speciality.lessonSpecialities.filter(l => l.isDeleted === false).map(ls => {
              return(
                <span style={{color:'green'}}>Current Lesson : {ls.lesson.name ? ls.lesson.name : "No Current Lesson"} <br /></span>
              )
            })
         : ""}
          <label htmlFor="lesson">Lessons</label>
          <select
            className="form-control"
            id="lesson"
            name="lessonIds"
            multiple={true}
            value={selectLessons}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Lesson</option>
            {lesson.map(l => {
              return (
                <option key={l.id} value={l.id}>{l.id} - {l.name}</option>
              )
            })}
            </select>
           {errorMessages.Name ? (
              <div className="error-messages">
                <p style={{color:"red"}} className="error-message">{errorMessages.Lesson}</p>
              </div>
            ) : <div className="error-messages">
            <p style={{color:"red"}} className="error-message">{error.includes("Lesson")  ? error : "" }</p>
          </div>}
        </div>
        <button
          style={{ backgroundColor: "#002140" }}
          type="submit"
          className="btn btn-success mt-2"
        >
          Update
        </button>
      </form>
    </div>
  </section>
  )
}

export default Index



