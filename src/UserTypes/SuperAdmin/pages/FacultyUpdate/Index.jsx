import React, { useEffect, useState } from 'react'
import './Index.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const[inpust,setInputs]=useState({})
  const[faculty,setFaculty]=useState({})

useEffect(() => {
  axios.get(`https://localhost:7153/api/Facultys/GetById/${id}`)
  .then(res => {
    setFaculty(res.data)
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

const handleSubmit = (e) => {
  e.preventDefault()
  var formData = new FormData();
  formData.append("name",inpust.name)
  formData.append("shortName",inpust.shortName)

  axios.put(`https://localhost:7153/api/Facultys/Update/${id}`,formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then(res => console.log(res.data))
  .catch(e => console.log(e))
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
        <h5>Update Faculty</h5>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="w-50 m-auto mt-5">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Faculty Name"
            name="name"
            defaultValue={faculty.name}
            onChange={handleInputChange}
          />
        </div>
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
            defaultValue={faculty.shortName}
            onChange={handleInputChange}
          />
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