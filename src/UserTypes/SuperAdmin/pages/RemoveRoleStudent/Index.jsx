import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const [selectRole, setSelectRole] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem('user'))

  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Roles",{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setRole(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "roleName") {
      setSelectRole(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userName", username);
    formdata.append("roleName", selectRole);

    axios
      .post(`https://localhost:7153/api/StudentAuth/RemoveRole`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(res => {
        if(res.status === 200){
            navigate('/superadmin/student')
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
          <h5>
            Remove to Role For :{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>{username}</span>
          </h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="short">
              Role
            </label>
            <select
              type="text"
              className="form-control"
              id="short"
              onChange={handleInputChange}
              name="roleName"
              value={selectRole}
            >
              <option value="" selected disabled>
                Select Role
              </option>
              {role.map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          {errorMessages ? (
            <div className="error-messages">
              <p style={{ color: "red" }} className="error-message">
                {errorMessages.message}
              </p>
            </div>
          ) : (
            <div className="error-messages">
              <p style={{ color: "red" }} className="error-message">
                {error}
              </p>
            </div>
          )}
          <button
            style={{ backgroundColor: "#002140" }}
            type="submit"
            className="btn btn-success mt-2"
          >
            Remove Role
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;
