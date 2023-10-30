import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [lesson, setLesson] = useState([]);
  const [selectFaculty,setSelectFaculty] = useState([])
  const [speciality, setSpeciality] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [selectLesson,setSelectLesson] = useState([])
  const [teacher, setTeacher] = useState({});
  const [selectSepciality,setSelectSpeciality] = useState([])
  const [inputs, setInputs] = useState({
    name: " ",
    surname: " ",
    description: " ",
    age: " ", 
    salary: " ",
    userName: " ",
    email: " ",
    gender : teacher.gender,
    status : teacher.status,
    imageFile : teacher.imageUrl
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  
  useEffect(() => {
    axios.get("https://localhost:7153/api/Lessons").then((res) => {
      setLesson(res.data);
    });
  }, []);
  
  useEffect(() => {
    axios.get("https://localhost:7153/api/Specialities/Get").then((res) => {
      setSpeciality(res.data);
    });
  }, []);
  
  useEffect(() => {
    axios.get("https://localhost:7153/api/Facultys/GetAll").then((res) => {
      setFaculty(res.data);
    });
  }, []);
  
  useEffect(() => {
    axios
    .get(`https://localhost:7153/api/TeacherAuth/GetById/${id}`)
    .then((res) => {
      setTeacher(res.data);
      setInputs(res.data);
      // setSelectSpeciality(res.data.specialities && res.data.specialities.map(l => l.id))
      // setSelectFaculty(res.data.faculties && res.data.faculties.map(l => l.id))
      // setSelectLesson(res.data.lessons && res.data.lessons.map(l => l.id))
    });
  }, []);
  
  console.log(inputs);
  // console.log(teacher);
  const handleInputChange = (e) => {
    const { name, value, files, type, options } = e.target;
    
    if (name === "lessonIds") {
      const selectedlesson = Array.from(options)
        .filter((option) => option.selected && option.value !== "")
        .map((option) => Number(option.value));
  
      setSelectLesson(selectedlesson);
    }

    if (name === "specialityIds") {
      const selectedSpeciality = Array.from(options)
        .filter((option) => option.selected && option.value !== "")
        .map((option) => Number(option.value));
  
      setSelectSpeciality(selectedSpeciality);
    }

    if (name === "facultyIds") {
      const selectedFacultys = Array.from(options)
        .filter((option) => option.selected && option.value !== "")
        .map((option) => Number(option.value));
  
      setSelectFaculty(selectedFacultys);
    }

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "gender") {
      setSelectGender(value);
    }

    if (name === "status") {
      setSelectStatus(value);
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
    formdata.append("description", inputs.description);
    formdata.append("salary", inputs.salary);
    formdata.append("imageFile", inputs.imageFile);
    formdata.append("age", inputs.age);
    formdata.append("gender", inputs.gender);
    formdata.append("userName", inputs.userName);
    formdata.append("email", inputs.email);
    formdata.append("status", inputs.status);

    selectFaculty.forEach((faculyIds) => {
      formdata.append("facultyIds", faculyIds);
    });

    selectLesson.forEach((lessonIds) => {
      formdata.append("lessonIds", lessonIds);
    });

    selectSepciality.forEach((specialityIds) => {
      formdata.append("specialityIds", specialityIds);
    });
    axios
      .put(`https://localhost:7153/api/TeacherAuth/UpdateProfileAdmin?id=${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      // .then((res) => {
      //   if(res.status === 200){
      //     navigate("/superadmin/teacher")
      //   }
      // })
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
          <h5>Teacher Update</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
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
              defaultValue={teacher.name}
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
                  {error && error.includes("Name") ? error : ""}
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
              defaultValue={teacher.surname}
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
                  {error && error.includes("Surname") ? error : ""}
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
              defaultValue={teacher.age}
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
                  {error && error.includes("Age") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              className="form-control"
              id="desc"
              placeholder="Enter Description"
              onChange={handleInputChange}
              name="description"
              defaultValue={teacher.description}
            />
            {errorMessages.Description ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Description}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("Description") ? error : ""}
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
              defaultValue={teacher.salary}
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
                  {error && error.includes("Salary") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
            <img width={40} src={teacher.imageUrl} alt="" />
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
                  {error && error.includes("ImageFile") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
           Current Gender : {teacher.gender === 1 ? <span style={{color:"green"}}>Male</span> : <span style={{color:"green"}}>Female</span>}<br/>
            <label htmlFor="gender">Gender</label>
            <select
              type="text"
              className="form-control"
              id="gender"
              placeholder="Enter Gender"
              onChange={handleInputChange}
              name="gender"
              value={selectGender}
            >
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
                  {error && error.includes("gender") ? error : ""}
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
              defaultValue={teacher.userName}
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
                  {error && error.includes("UserName") ? error : ""}
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
              defaultValue={teacher.email}
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
                  {error && error.includes("Email") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            Current Status : {teacher.status === 2 ? <span style={{color:"green"}}>Work</span> :  <span style={{color:"green"}}>Out ofWork</span>}
            <select
              type="text"
              className="form-control"
              id="status"
              placeholder="Change Status"
              onChange={handleInputChange}
              name="status"
              value={selectStatus}
            >
              <option value="" selected disabled>
                Select Status
              </option>
              <option value="2">Work</option>
              <option value="5">Out Of Work</option>
            </select>
          </div>
          {/* ---- */}
          <div className="form-group">
            {teacher.lessons && teacher.lessons.length > 0
              ? teacher.lessons.map((ls) => {
                  return (
                    <span style={{ color: "green" }}>
                      Current Lesson : {ls.name ? ls.name : "No Current Lesson"}{" "}
                      <br />
                    </span>
                  );
                })
              : ""}
            <label htmlFor="lesson">Lesson</label>
            <select
              className="form-control"
              id="lesson"
              placeholder="Select Lesson"
              onChange={handleInputChange}
              name="lessonIds"
              multiple
              value={selectLesson}
            >
              <option value="" selected disabled>
                Select Lesson
              </option>
              {lesson
                .filter((e) => e.isDeleted === false)
                .map((l) => {
                  return (
                    <option key={l.id} value={l.id}>
                      {l.id} - {l.name}
                    </option>
                  );
                })}
            </select>
            {errorMessages.Password &&
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Password}
                </p>
              </div>
          }
          </div>
          {/* ---- */}
          <div className="form-group">
            {teacher.specialities && teacher.specialities.length > 0
              ? teacher.specialities.map((ls) => {
                  return (
                    <span style={{ color: "green" }}>
                      Current Speciality : {ls.name ? ls.name : "No Current Speciality"}{" "}
                      <br />
                    </span>
                  );
                })
              : ""}
            <label htmlFor="specialities">Speciality</label>
            <select
              className="form-control"
              id="specialities"
              placeholder="Select Lesson"
              onChange={handleInputChange}
              name="specialityIds"
              multiple
              value={selectSepciality}  
            >
              <option value="" selected disabled>
                Select Speciality
              </option>
              {speciality
                .filter((e) => e.isDeleted === false)
                .map((l) => {
                  return (
                    <option key={l.id} value={l.id}>
                      {l.id} - {l.name}
                    </option>
                  );
                })}
            </select>
            {errorMessages.Password &&
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Password}
                </p>
              </div>
            }
          </div>
          {/* ---- */}
          <div className="form-group">
            {teacher.faculties && teacher.faculties.length > 0
              ? teacher.faculties.map((ls) => {
                  return (
                    <span style={{ color: "green" }}>
                      Current Faculty : {ls.name ? ls.name : "No Current Faculty"}{" "}
                      <br />
                    </span>
                  );
                })
              : ""}
            <label htmlFor="faculties">Faculty</label>
            <select
              className="form-control"
              id="faculties"
              placeholder="Select Faculty"
              onChange={handleInputChange}
              name="facultyIds"
              multiple
              value={selectFaculty}
            >
              <option value="" selected disabled>
                Select Faculty
              </option>
              {faculty
                .filter((e) => e.isDeleted === false)
                .map((l) => {
                  return (
                    <option key={l.id} value={l.id}>
                      {l.id} - {l.name}
                    </option>
                  );
                })}
            </select>
            {errorMessages.Password &&
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Password}
                </p>
              </div>
             }
          </div>
          {/* ---- */}
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
  );
};

export default Index;
