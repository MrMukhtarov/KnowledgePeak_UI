import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [sepciality, setSpeciality] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [selectFaculty, setSelectFaculty] = useState("");
  const [selectSepciality, setSelectSpeciality] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Facultys/GetAll", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setFaculty(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Specialities/Get",{
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
      })
      .then((res) => setSpeciality(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "facultyId") {
        setSelectFaculty(value);
    }

    if (name === "id") {
      setSelectSpeciality(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("facultyId", selectFaculty);
    formdata.append("id", selectSepciality);

    axios
      .post(`https://localhost:7153/api/Specialities/AddFaculty/${selectSepciality}`, formdata, {
        headers: {
            Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/superadmin/speciality");
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
          <h5>Add Faculty For Speciality</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Spciality</label>
            <select
              type="text"
              className="form-control"
              id="name"
              onChange={handleInputChange}
              name="id"
              value={selectSepciality}
            >
              <option value="" selected disabled>
                Select Speciality
              </option>
              {sepciality
                .filter((f) => f.isDeleted === false)
                .map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* ------ */}
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="short">
              Faculty
            </label>
            <select
              type="text"
              className="form-control"
              id="short"
              onChange={handleInputChange}
              name="facultyId"
              value={selectFaculty}
            >
              <option value="" selected disabled>
                Select Faculty
              </option>
              {faculty
                .filter((f) => f.isDeleted === false)
                .map((e) => {
                  return (
                    <option key={e.id} value={e.id}>
                      {e.id} {e.name}
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
            Add Faculty
          </button>
        </form>
      
      </div>
    </section>
  );
};

export default Index;
