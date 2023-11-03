import React, { useEffect, useState } from "react";
import "./Index.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Index = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [speciality, setSpeciality] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [error, setError] = useState("");
  const itemsPerPage = 5;
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Specialities/Get")
      .then((res) => setSpeciality(res.data))
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
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
    axios
      .delete(`https://localhost:7153/api/Specialities/Delete/${id}`,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
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
    }
  });
  };

  const SoftDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
    axios
      .patch(`https://localhost:7153/api/Specialities/SoftDelete/${id}`,{},{
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json"
        },
      })
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
    }
  });
  };

  const RevertSoftDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
    axios
      .patch(`https://localhost:7153/api/Specialities/RevertSoftDelete/${id}`,{},{
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json"
        },
      })
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
              className="btn btn-primary me-2"
              to={"/superadmin/speciality/addlesson"}
            >
              Add Lesson
            </NavLink>
            <NavLink
              className="btn btn-primary me-2"
              to={"/superadmin/speciality/addfaculty"}
            >
              Add Faculty
            </NavLink>
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
                  <th scope="col">Lesson</th>
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
                      <td>
                        <select name="" id="">
                          {s.lesson &&
                            s.lesson.map((s) => {
                              return <option value="">{s.name}</option>;
                            })}
                        </select>
                      </td>
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
    </section>
  );
};

export default Index;
