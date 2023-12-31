import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    startTime: "",
    endTime: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:7153/api/ClassTime/Get/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setInputs(res.data);
      });
  }, [id, user.token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessages((prev) => ({
      ...prev,
      [name]: null,
    }));
    setError("");
  };

  useEffect(() => {
    setErrorMessages({});
  }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("startTime", inputs.startTime);
    formdata.append("endTime", inputs.endTime);

    axios
      .put(`https://localhost:7153/api/ClassTime/Update/${id}`, formdata, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/superadmin/classtime");
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
          <h5>Update Class Time</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="error-messages">
            <p style={{ color: "red" }} className="error-message">
              {error.includes("Exist") ? error : ""}
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="name">Start Time</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Start Time"
              onChange={handleInputChange}
              name="startTime"
              value={inputs.startTime}
            />
            {errorMessages.StartTime ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.StartTime}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("StartTime") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/*  */}
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="short">
              Short Name
            </label>
            <input
              type="text"
              className="form-control"
              id="short"
              placeholder="Enter End Time"
              onChange={handleInputChange}
              name="endTime"
              value={inputs.endTime}
            />
            {errorMessages.EndTime ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.EndTime}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("EndTime") ? error : ""}
                </p>
              </div>
            )}
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
  );
};

export default Index;
