import React, {useState } from "react";
import "./Index.css";
import axios from "axios";


const Index = () => {
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const [selectType, setSelectType] = useState("");
  const [type,setType] = useState(false);

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "type") {
      setSelectType(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userName", inputs.userName);
    formdata.append("password", inputs.password);

    axios
      .post(`https://localhost:7153/api/${selectType}/Login`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          var users = res.data;
          if (users && users.roles && users.roles[0] && users.roles[0] === "Teacher") {
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location.href = "/teacher";
          }
          if (users && users.roles && users.roles[0] && users.roles[0] === "Admin") {
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location.href = "/superadmin";
          }
          if (users && users.roles && users.roles[0] && users.roles[0] === "Tutor") {
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location.href = "/tutor";
          }
          if (users && users.roles && users.roles[0] && users.roles[0] === "Student") {
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location.href = "/student";
          }
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

  const Watch = () => {
   var eye = document.querySelector('.login_eye')
    if(type === false){
      setType(true)
      eye.className = "fa-solid fa-eye-slash col-lg-2 login_eye"
    }else{
      eye.className = "fa-solid fa-eye col-lg-2 login_eye"
      setType(false)
    }
  }
  return (
    <section id="login_form" className="py-5">
      <div className="contain">
        <div className="login_all d-flex flex-column justify-content-center text-center">
          <h2>Member Login</h2>
          <select
            name="type"
            id="type"
            type="text"
            className="form-control w-25 m-auto mb-4"
            value={selectType}
            onChange={handleInputChange}
          >
            <option value="" selected disabled>
              Select Type
            </option>
            <option value="TeacherAuth">Teacher</option>
            <option value="AdminAuth">Admin</option>
            <option value="StudentAuth">Student</option>
            <option value="TutorAuth">Tutor</option>
          </select>
          <form
            className="w-50 m-auto d-flex flex-column gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="username_login">
              <input
                name="userName"
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleInputChange}
              />
              {errorMessages.Username ? (
                <div className="error-messages">
                  <p style={{ color: "red" }} className="error-message">
                    {errorMessages.Username}
                  </p>
                </div>
              ) : (
                <div className="error-messages">
                  <p style={{ color: "red" }} className="error-message">
                    {error && error.includes("password") ? error : ""}
                  </p>
                </div>
              )}
            </div>
            <div className="d-flex flex-column align-items-center">
              
             <div className="d-flex password_div justify-content-between"> 
             <div className="col=lg-10">
             <input
                type={type === false ? "password" : "text"}
                placeholder="Password"
                id="pas"
                name="password"
                onChange={handleInputChange}
              />
             </div>
              <i onClick={Watch} style={{cursor:"pointer"}} className="fa-solid fa-eye col-lg-2 login_eye"></i>
             </div>
              {errorMessages.password ? (
                <div className="error-messages">
                  <p style={{ color: "red" }} className="error-message">
                    {errorMessages.password}
                  </p>
                </div>
              ) : (
                <div className="error-messages">
                  <p style={{ color: "red" }} className="error-message">
                    {error && error.includes("password") ? error : ""}
                  </p>
                </div>
              )}
            </div>
            <div>
              {
                <div className="error-messages">
                  <p style={{ color: "red" }} className="error-message">
                    {error && (error.includes("Not") || error.includes("reason") || error.includes("suspended")) ? error : ""}
                  </p>
                </div>
              }
              <button>LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Index;
