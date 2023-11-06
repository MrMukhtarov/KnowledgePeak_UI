import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [group, setGroup] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [selectGroup, setSelectGroup] = useState([]);
  const [tutor, setTutor] = useState({});
  const [selectSepciality, setSelectSpeciality] = useState("");
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if(selectSepciality){
      axios.get("https://localhost:7153/api/Groups")
      .then((res) => {
        console.log("ADsdasd " + selectSepciality);
        const data = res.data
        setGroup(data && data.filter(f => f.speciality && f.speciality.id == selectSepciality));
      });
     }
  }, [selectSepciality]);

  console.log(group);

  useEffect(() => {
    axios.get("https://localhost:7153/api/Specialities/Get").then((res) => {
      setSpeciality(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/TutorAuth/GetSingle?userName=${username}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setTutor(res.data);
        setInputs(res.data);
        setSelectStatus(res.data.status);
        setSelectGroup(res.data.groups && res.data.groups.map(g => g.id))
        setSelectSpeciality(res.data.speciality && res.data.speciality.id ? res.data.speciality.id : " ");
      });
  }, [user.token,username]);

  const handleInputChange = (e) => {
    const { name, value, files, type, options } = e.target;

    if (name === "groupIds") {
      const selectedGroup = Array.from(options)
        .filter((option) => option.selected && option.value !== "")
        .map((option) => Number(option.value));

      setSelectGroup(selectedGroup);
    }

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "gender") {
      setSelectGender(value);
    }

    if (name === "specialityId") {
      setSelectSpeciality(value);
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
    formdata.append("salary", inputs.salary);
    formdata.append("imageFile", inputs.imageFile);
    formdata.append("age", inputs.age);
    formdata.append("gender", inputs.gender);
    formdata.append("email", inputs.email);
    formdata.append("status", inputs.status);
    formdata.append("specialityId", selectSepciality);

    selectGroup.forEach((groupIds) => {
      formdata.append("groupIds", groupIds);
    });
    axios
      .put(
        `https://localhost:7153/api/TutorAuth/UpdateProfileFromAdmin?userName=${username}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          navigate("/superadmin/tutor");
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
  return (
    <section className="faculty_create py-4">
      <div className="container">
        <div className="d-flex align-items-center gap-5">
          <i
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
            className="fa-solid fa-arrow-left"
          ></i>
          <h5>Tutor Update</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("Exist") ? error : ""}
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
              defaultValue={tutor.name}
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
              defaultValue={tutor.surname}
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
              defaultValue={tutor.age}
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
            <label htmlFor="salary">Salary</label>
            <input
              type="text"
              className="form-control"
              id="salary"
              placeholder="Enter Salary"
              onChange={handleInputChange}
              name="salary"
              defaultValue={tutor.salary}
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
          <img width={40} src={tutor.imageUrl} alt="" />
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
            Current Gender :{" "}
            {tutor.gender === 1 ? (
              <span style={{ color: "green" }}>Male</span>
            ) : (
              <span style={{ color: "green" }}>Female</span>
            )}
            <br />
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
            <label htmlFor="eml">Email</label>
            <input
              type="text"
              className="form-control"
              id="eml"
              placeholder="Enter Email"
              onChange={handleInputChange}
              name="email"
              defaultValue={tutor.email}
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
            Current Status :{" "}
            {tutor.status === 2 ? (
              <span style={{ color: "green" }}>Work</span>
            ) : (
              <span style={{ color: "green" }}>Out ofWork</span>
            )}
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
            {tutor.groups && tutor.groups.length > 0
              ? tutor.groups.map((ls) => {
                  return (
                    <span style={{ color: "green" }}>
                      Current Groups : {ls.name ? ls.name : "No Current Groups"}{" "}
                      <br />
                    </span>
                  );
                })
              : ""}
            <label htmlFor="group">Group</label>
            <select
              className="form-control"
              id="group"
              placeholder="Select Lesson"
              onChange={handleInputChange}
              name="groupIds"
              multiple
              value={selectGroup}
            >
              <option value="" selected disabled>
                Select Group
              </option>
              {group
                .filter((e) => e.isDeleted === false)
                .map((l) => {
                  return (
                    <option key={l.id} value={l.id}>
                      {l.id} - {l.name}
                    </option>
                  );
                })}
            </select>
            {errorMessages.Password && (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Password}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          <div className="form-group">
            <span style={{ color: "green" }}>
              Current Speciality :{" "}
              {tutor.speciality
                ? tutor.speciality.name
                : "No Current Speciality"}
              <br />
            </span>
            <label htmlFor="specialities">Speciality</label>
            <select
              className="form-control"
              id="specialities"
              onChange={handleInputChange}
              name="specialityId"
              value={selectSepciality}
            >
              <option value="" selected>
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
            {errorMessages.Password && (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Password}
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
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;
