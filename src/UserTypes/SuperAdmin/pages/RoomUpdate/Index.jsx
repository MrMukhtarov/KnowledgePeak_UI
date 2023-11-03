import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const [faculty, setFaculty] = useState([]);
  const [selectFaculty, setSelectFaculty] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "facultyId") {
      setSelectFaculty(value);
    }
  };

  useEffect(() => {
    axios
      .get(`https://localhost:7153/api/Rooms/GetById/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setSelectFaculty(res.data.faculty && res.data.faculty.id);
        setInputs(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:7153/api/Facultys/GetAll`).then((res) => {
      setFaculty(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("roomNumber", inputs.roomNumber);
    formdata.append("capacity", inputs.capacity);
    formdata.append("facultyId", selectFaculty);

    axios
      .put(
        `https://localhost:7153/api/Rooms/Update/${id}
      `,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => navigate("/superadmin/room"))
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
          <h5>Update Room</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="error-messages">
            <p style={{ color: "red" }} className="error-message">
              {error.includes("exist") ? error : ""}
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="name">Room Number</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Room Number"
              onChange={handleInputChange}
              name="roomNumber"
              value={inputs.roomNumber}
            />
            {errorMessages.RoomNumber ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.RoomNumber}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("RoomNumber") ? error : ""}
                </p>
              </div>
            )}
          </div>
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="short">
              Capacity
            </label>
            <input
              type="number"
              className="form-control"
              id="short"
              placeholder="Enter Capacity"
              onChange={handleInputChange}
              name="capacity"
              value={inputs.capacity}
            />
            {errorMessages.Capacity ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Capacity}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error.includes("Capacity") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/*  */}
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="shasdrt">
              Faculty
            </label>
            <select
              type="number"
              className="form-control"
              id="shasdrt"
              placeholder="Enter Limit"
              onChange={handleInputChange}
              name="facultyId"
              value={selectFaculty}
            >
              <option value="" selected disabled>
                Select Faculty
              </option>
              {faculty &&
                faculty
                  .filter((c) => c.isDeleted === false)
                  .map((s) => {
                    return (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    );
                  })}
            </select>
            {errorMessages.ShortName ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.ShortName}
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
