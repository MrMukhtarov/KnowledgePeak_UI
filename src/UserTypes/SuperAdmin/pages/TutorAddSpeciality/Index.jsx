import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [tutor, setTutor] = useState([]);
  const [sepciality, setSpeciality] = useState([]);
  const [selectTutor, setSelectTutor] = useState("");
  const [selectSepciality, setSelectSpeciality] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState("");
  const [disable,setDisable] = useState(false);

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
    if(disable){
      axios.get(`https://localhost:7153/api/TutorAuth/GetSingle?userName=${selectTutor}`,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(res => {
        setSelectSpeciality(res.data.speciality && res.data.speciality.id)
      })
    }
  },[disable,selectTutor,user.token])
  

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Specialities/Get")
      .then((res) => setSpeciality(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "userName") {
      setSelectTutor(value);
      setDisable(true)
    }

    if (name === "specialityId") {
      setSelectSpeciality(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("userName", selectTutor);
    formdata.append("specialityId", selectSepciality);

    axios
      .post(`https://localhost:7153/api/TutorAuth/AddSpeciality`, formdata, {
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
          <h5>Add Speciality For Tutor</h5>
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
              name="specialityId"
              value={selectSepciality}
            >
              <option value="" selected>
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
            Add Speciality
          </button>
        </form>
      
      </div>
    </section>
  );
};

export default Index;
