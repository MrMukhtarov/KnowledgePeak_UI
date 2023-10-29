import React, { useState } from 'react'
import './Index.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {

    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        name : "",
        shortName : ""
    });
    const [errorMessages, setErrorMessages] = useState({});
    const [error, setError] = useState("");
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("name", inputs.name);
      formdata.append("shortName", inputs.shortName);
  
      axios
        .post("https://localhost:7153/api/Specialities/Create", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res.data))
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
        <h5>Create Sepciality</h5>
      </div>
      <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Speciality Name"
            onChange={handleInputChange}
            name="name"
          />
          {errorMessages.Name ? (
            <div className="error-messages">
              <p style={{color:"red"}} className="error-message">{errorMessages.Name}</p>
            </div>
          ) : <div className="error-messages">
          <p style={{color:"red"}} className="error-message">{error}</p>
        </div>}
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
            onChange={handleInputChange}
            name="shortName"
          />
           {errorMessages.ShortName ? (
            <div className="error-messages">
              <p style={{color:"red"}} className="error-message">{errorMessages.ShortName}</p>
            </div>
          ) : <div className="error-messages">
          <p style={{color:"red"}} className="error-message">{error.includes("ShortName") ? error : ""}</p>
        </div>}
        </div>
        <button
          style={{ backgroundColor: "#002140" }}
          type="submit"
          className="btn btn-success mt-2"
        >
          Create
        </button>
      </form>
    </div>
  </section>
  )
}

export default Index