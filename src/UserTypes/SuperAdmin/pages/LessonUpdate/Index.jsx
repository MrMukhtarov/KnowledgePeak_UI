import React, { useEffect, useState } from 'react'
import './Index.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const[inpust,setInputs]=useState({})
  const[lesson,setLesson]=useState({})
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem('user'))

useEffect(() => {
  axios.get(`https://localhost:7153/api/Lessons/GetById/${id}`)
  .then(res => {
    setLesson(res.data)
    setInputs(res.data)
  })
  .catch(e => console.log(e))
},[id])

const handleInputChange = (e) => {
  const { name, value } = e.target;

  setInputs((prev) => ({
    ...prev,
    [name]: value,
  }));
};
console.log(inpust);
const handleSubmit = (e) => {
  e.preventDefault()
  var formData = new FormData();
  formData.append("name",inpust.name)
  formData.append("duration",inpust.duration)
  formData.append("description",inpust.description)

  axios.put(`https://localhost:7153/api/Lessons/Update/${id}`,formData,{
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  })
  .then(res => navigate('/superadmin/lesson'))
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
        <h5>Update Lesson</h5>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="w-50 m-auto mt-5">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Lesson Name"
            name="name"
            defaultValue={lesson.name}
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
        <div className="form-group mt-3">
          <label className="mb-1" htmlFor="short">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="short"
            placeholder="Enter Description"
            name="description"
            defaultValue={lesson.description}
            onChange={handleInputChange}
          />
            {errorMessages.Description ? (
              <div className="error-messages">
                <p style={{color:"red"}} className="error-message">{errorMessages.Description}</p>
              </div>
            ) : <div className="error-messages">
            <p style={{color:"red"}} className="error-message">{error.includes("Description") ? error : ""}</p>
          </div>}
        </div>

        <div className="form-group mt-3">
          <label className="mb-1" htmlFor="dur">
            Duration
          </label>
          <input
            type="text"
            className="form-control"
            id="dur"
            placeholder="Enter Duration"
            name="duration"
            defaultValue={lesson.duration}
            onChange={handleInputChange}
          />
            {errorMessages.Duration ? (
              <div className="error-messages">
                <p style={{color:"red"}} className="error-message">{errorMessages.Duration}</p>
              </div>
            ) : <div className="error-messages">
            <p style={{color:"red"}} className="error-message">{error.includes("Duration") ? error : ""}</p>
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