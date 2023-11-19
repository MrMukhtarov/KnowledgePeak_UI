import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const [speciality, setSpeciality] = useState([]);
  const [selectSpeciality, setSelectSpeciality] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "specialityId") {
      setSelectSpeciality(value);
    }
    setErrorMessages((prev) => ({
      ...prev,
      [name]: null,
    }));
    setError("");
  };

  useEffect(() => {
    axios.get(`https://localhost:7153/api/Specialities/Get`).then((res) => {
      setSpeciality(res.data);
    });
  }, []);

  useEffect(() => {
    setErrorMessages({});
  }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", inputs.name);
    formdata.append("limit", inputs.limit);
    formdata.append("specialityId", selectSpeciality);

    axios
      .post("https://localhost:7153/api/Groups/Create", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => navigate("/superadmin/group"))
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
          <h5>Create Group</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
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
                  {error.includes("Name") ? error : ""}
                </p>
              </div>
            )}
          </div>
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="short">
              Limit
            </label>
            <input
              type="number"
              className="form-control"
              id="short"
              placeholder="Enter Limit"
              onChange={handleInputChange}
              name="limit"
            />
            {errorMessages.Limit ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Limit}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("Limit") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/*  */}
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="shasdrt">
              Speciality
            </label>
            <select
              type="number"
              className="form-control"
              id="shasdrt"
              placeholder="Enter Limit"
              onChange={handleInputChange}
              name="specialityId"
              value={selectSpeciality}
            >
              <option value="" selected disabled>
                Select Speciality
              </option>
              {speciality &&
                speciality
                  .filter((c) => c.isDeleted === false)
                  .map((s) => {
                    return (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    );
                  })}
            </select>
            {errorMessages.SpecialityId ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.SpecialityId}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("ShortName") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/*  */}
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
