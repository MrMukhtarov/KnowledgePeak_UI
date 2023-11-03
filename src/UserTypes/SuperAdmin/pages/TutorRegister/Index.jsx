import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [inputs, setInputs] = useState({
    name: " ",
    surname: " ",
    description: " ",
    age: " ",
    salary: " ",
    userName: " ",
    email: " ",
    password: " ",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "gender") {
      setInputs((prevState) => ({
        ...prevState,
        gender: parseInt(value, 10),
      }));
    }
    if (type === "file" && files != null && files.length > 0) {
      const selectedFile = files[0];

      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: selectedFile,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", inputs.name);
    formdata.append("surname", inputs.surname);
    formdata.append("age", inputs.age);
    formdata.append("salary", inputs.salary);
    formdata.append("imageFile", inputs.imageFile);
    formdata.append("gender", inputs.gender);
    formdata.append("userName", inputs.userName);
    formdata.append("email", inputs.email);
    formdata.append("password", inputs.password);

    axios
      .post("https://localhost:7153/api/TutorAuth/Create", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => navigate('/superadmin/tutor'))
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
          <h5>Tutor Register</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="error-messages text-center  ">
            <p style={{ color: "red" }} className="error-message">
              {error.includes("Exist") ? error : ""}
            </p>
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              onChange={handleInputChange}
              name="name"
            />
            {errorMessages.Name ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Name}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("name") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="short">
              Surname
            </label>
            <input
              type="text"
              className="form-control"
              id="short"
              placeholder="Enter Surname"
              onChange={handleInputChange}
              name="surname"
            />
            {errorMessages.Surname ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Surname}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("Surname") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="ahe">Age</label>
            <input
              type="text"
              className="form-control"
              id="ahe"
              placeholder="Enter Age"
              onChange={handleInputChange}
              name="age"
            />
            {errorMessages.Age ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Age}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("Age") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              className="form-control"
              id="salary"
              placeholder="Enter Salary"
              onChange={handleInputChange}
              name="salary"
            />
            {errorMessages.Salary ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Salary}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("Salary") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="img">Image</label>
            <input
              type="file"
              className="form-control"
              id="img"
              placeholder="Enter Image"
              onChange={handleInputChange}
              name="imageFile"
            />
            {errorMessages.ImageFile ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.ImageFile}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("ImageFile") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              type="text"
              className="form-control"
              id="gender"
              placeholder="Enter Gender"
              onChange={handleInputChange}
              name="gender"
            >
              <option value="" selected disabled>
                Select Gender
              </option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
            {errorMessages.Gender ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Gender}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("Gender") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="usr">Username</label>
            <input
              type="text"
              className="form-control"
              id="usr"
              placeholder="Enter Username"
              onChange={handleInputChange}
              name="userName"
            />
            {errorMessages.UserName ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.UserName}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("UserName") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="eml">Email</label>
            <input
              type="text"
              className="form-control"
              id="eml"
              placeholder="Enter Email"
              onChange={handleInputChange}
              name="email"
            />
            {errorMessages.Email ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Email}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("Email") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="pas">Password</label>
            <input
              type="text"
              className="form-control"
              id="pas"
              placeholder="Enter Password"
              onChange={handleInputChange}
              name="password"
            />
            {errorMessages.Password ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Password}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("Password") ? error : ""}
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
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;
