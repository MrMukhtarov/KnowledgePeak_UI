import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [tutor, setTutor] = useState([]);
  const [group, setGroup] = useState([]);
  const [selectTutor, setSelectTutor] = useState("");
  const [selectGroup, setSelectGroup] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/TutorAuth/GetAll", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setTutor(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Groups")
      .then((res) => setGroup(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "userName") {
      setSelectTutor(value);
    }

    if (name === "groupIds") {
        const selectedGroups = Array.from(options)
          .filter((option) => option.selected && option.value !== "")
          .map((option) => Number(option.value));
    
        setSelectGroup(selectedGroups);
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userName", selectTutor);
    selectGroup.forEach((groupIds) => {
        formdata.append("groupIds", groupIds);
      });

    axios
      .post(`https://localhost:7153/api/TutorAuth/AddGroup`, formdata, {
        headers: {
            Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/superadmin/tutor");
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
          <h5>Add Group For Tutor</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Tutor UserName</label>
            <select
              type="text"
              className="form-control"
              id="name"
              onChange={handleInputChange}
              name="userName"
              value={selectTutor}
            >
              <option value="" selected disabled>
                Select Tutor
              </option>
              {tutor
                .filter((f) => f.isDeleted === false)
                .map((e) => {
                  return (
                    <option key={e.id} value={e.userName}>
                      {e.userName}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* ------ */}
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="short">
              Speciality
            </label>
            <select
              type="text"
              className="form-control"
              id="short"
              onChange={handleInputChange}
              name="groupIds"
              value={selectGroup}
              multiple
            >
              <option value="" selected disabled>
                Select Group
              </option>
              {group
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
            Add Group
          </button>
        </form>
      
      </div>
    </section>
  );
};

export default Index;
