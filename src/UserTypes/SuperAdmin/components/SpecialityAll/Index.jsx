import React, { useEffect, useState } from "react";
import "./Index.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [speciality, setSpeciality] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [error, setError] = useState("");
  const itemsPerPage = 5;
  const [faculty, setFaculty] = useState([]);
  const [lesson, setLesson] = useState([]);
  const [addFaculty, setAddFaculyu] = useState({});
  const [selectLessons, setSelectLessons] = useState([]);
  const [selectSpeciality, setSelectSpeciality] = useState("")

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Specialities/Get")
      .then((res) => setSpeciality(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Facultys/GetAll")
      .then((res) => setFaculty(res.data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Lessons")
      .then((res) => setLesson(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty = speciality.filter((f) => f.name.includes(search));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);

  const Delete = (id) => {
    axios
      .delete(`https://localhost:7153/api/Specialities/Delete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
      });
  };

  const SoftDelete = (id) => {
    axios
      .patch(`https://localhost:7153/api/Specialities/SoftDelete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
      });
  };

  const RevertSoftDelete = (id) => {
    axios
      .patch(`https://localhost:7153/api/Specialities/RevertSoftDelete/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
      });
  };

  const AddFaculty = (e) => {
    const { name, value } = e.target;

    if (name === "facultyId") {
      setAddFaculyu((prevState) => ({
        ...prevState,
        facultyId: parseInt(value, 10),
      }));
    } else if (name === "id") {
      setAddFaculyu((prevState) => ({ ...prevState, id: parseInt(value, 10) }));
    }
  };

  const AddFacultySubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("facultyId", addFaculty.facultyId);
    formData.append("id", addFaculty.id);

    axios
      .post(
        `https://localhost:7153/api/Specialities/AddFaculty/${addFaculty.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
      });
  };

 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "id") {
    setSelectSpeciality(parseInt(value, 10));
  }
  if (name === "lessonIds") {
    const selectedLessonIds = Array.from(e.target.selectedOptions).map(
      (option) => Number(option.value)
    );
    setSelectLessons(selectedLessonIds);
  }
};

const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("id", selectSpeciality);
  
    selectLessons.forEach((lessonId) => {
      formData.append("lessonIds", lessonId);
    });
  
    axios.post(`https://localhost:7153/api/Specialities/AddLesson/${selectSpeciality}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(res => console.log(res.data))
    .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
      });
  };
  

  return (
    <section className="facultyList_superadmin py-3">
      <div className="container">
        <h5>Speciality List</h5>
        <hr />
        <div className="d-flex  justify-content-between align-items-center">
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
          <div className="search_div text-end">
            <NavLink
              className="btn btn-success me-2"
              to={"/superadmin/speciality/create"}
            >
              Create
            </NavLink>
            <label htmlFor="search">Search</label>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              id="search"
            />
          </div>
        </div>
        <div className="facultyList_superadmin_all">
          <div className="facultyList_superadmin_table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Short Name</th>
                  <th scope="col">Faculty</th>
                  <th scope="col">Created TIme</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((s) => {
                  return (
                    <tr key={s.id}>
                      <th scope="row">{s.id}</th>
                      <td>{s.name}</td>
                      <td>{s.shortName}</td>
                      <td>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate("/superadmin/faculty")}
                        >
                          {s.facultyId}
                        </span>
                      </td>
                      <td>{s.createTime.substring(0, 10)}</td>
                      <td>{s.isDeleted === false ? "Active" : "DeActive"}</td>
                      <td className="facultyList_superadmin_action d-flex gap-3">
                        <button
                          onClick={() =>
                            navigate(`/superadmin/speciality/update/${s.id}`)
                          }
                          className="one me-1"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          onClick={() => Delete(s.id)}
                          className="two me-1"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        {s.isDeleted === false ? (
                          <button
                            onClick={() => SoftDelete(s.id)}
                            className="three"
                          >
                            <i className="fa-solid fa-trash-arrow-up"></i>
                          </button>
                        ) : (
                          <button
                            onClick={() => RevertSoftDelete(s.id)}
                            className="four"
                          >
                            <i className="fa-solid fa-eraser"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="facultyList_superadmin_pagination text-end">
            <button
              className="me-2"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastItem >= filteredFaculty.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>


      <div className="d-flex mt-2">
        <div className="col-lg-6 d-flex flex-column justify-content-center gap-3">
          <h5 className="text-center">Add Faculty</h5>
          <form onSubmit={(e) => AddFacultySubmit(e)}>
            <div className="sepciality_add_faculty d-flex flex-column w-100 justify-content-center aliign-items-center text-center">
              <div>
                <select
                  value={addFaculty.facultyId}
                  onChange={AddFaculty}
                  name="facultyId" 
                  id=""
                  className="w-50 faculyu-opt"
                >
                  <option value="" selected disabled>
                    Select Faculty
                  </option>
                  {faculty.filter(f => f.isDeleted === false).map((f) => {
                    return (
                      <option key={f.id} value={f.id}>
                        {f.name}
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
              <div>
                <select
                  value={addFaculty.id}
                  onChange={AddFaculty}
                  name="id" 
                  id=""
                  className="w-50 mt-2"
                >
                  <option value="" selected disabled>
                    Select Speciality
                  </option>
                  {speciality.filter(f => f.isDeleted === false).map((s) => {
                    return (
                      <option key={s.id} value={s.id}>
                        {s.name}
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

              <div>
                <button className="btn btn-success btn-sm m-auto mt-2">
                  Add Faculty
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ////// */}
        {/* ////// */}

        <div className="col-lg-6 d-flex flex-column justify-content-center gap-3">
          <h5 className="text-center">Add Lesson</h5>
          <form onSubmit={e => handleSubmit(e)}>
            <div className="sepciality_add_faculty d-flex flex-column w-100 justify-content-center aliign-items-center text-center">
              <div>
                <select
                  name="lessonIds"
                  id=""
                  className="w-50 faculyu-opt"
                  multiple={true}
                  value={selectLessons}
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    Select Lessons
                  </option>
                  {lesson.filter(l => l.isDeleted === false).map((f) => {
                    return (
                      <option key={f.id} value={f.id}>
                        {f.name}
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
              <div>
                <select
                  name="id"
                  id=""
                  className="w-50 mt-2"
                  value={selectSpeciality}
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    Select Speciality
                  </option>
                  {speciality.filter(s => s.isDeleted === false).map((s) => {
                    return (
                      <option key={s.id} value={s.id}>
                        {s.name}
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

              <div>
                <button className="btn btn-success btn-sm m-auto mt-2">
                  Add Lessons
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Index;
