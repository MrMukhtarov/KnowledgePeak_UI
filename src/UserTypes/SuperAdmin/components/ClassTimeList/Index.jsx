import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const nav = useNavigate();
  const [time, setTime] = useState([]);
  const [error, setError] = useState("");

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty =
    time && time.filter((f) => f.startTime && f.startTime.includes(search));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredFaculty && filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    axios
      .get(`https://localhost:7153/api/ClassTime`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setTime(res.data);
      });
  }, []);

  const Remove = (id) => {
    axios
      .delete(`https://localhost:7153/api/ClassSchedules/Delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setError(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
      });
  };

  const SoftDelete = (id) => {
    axios
      .patch(
        `https://localhost:7153/api/ClassSchedules/SoftDelete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setError(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
      });
  };

  const RevertSoftDelete = (id) => {
    axios
      .patch(
        `https://localhost:7153/api/ClassSchedules/RevertSoftDelete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
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
    <section className="teacher_grades_list py-3">
      <div className="container">
        <div className="teacher_grades_list_all">
          <div className="teacher_grades_list_top d-flex  justify-content-between align-items-center mb-5">
            <div className="d-flex align-items-center gap-4">
              <div style={{ fontSize: "20px" }}>
                <i
                  onClick={() => nav(-1)}
                  style={{ cursor: "pointer" }}
                  className="fa-solid fa-arrow-left"
                ></i>
              </div>
              <h5 className="teacher_grade_list_title mb-0">Class TIme</h5>
            </div>
            <div className="search_div text-end mb-0">
                <NavLink to="/superadmin/classtime/add" className="btn btn-primary me-3">Add Time</NavLink>
              <label htmlFor="search">Search</label>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                id="search"
              />
            </div>
          </div>
          <div className="error-messages text-center">
            <p style={{ color: "red" }} className="error-message">
              {error && error.includes("delete") ? error : ""}
            </p>
          </div>
          <div className="teacher_grades_list_center">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End TIme</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((e) => {
                    return (
                      <tr>
                        <th key={e.id} scope="row">{e.id}</th>
                        <td>{e.startTime}</td>
                        <td>{e.endTime}</td>
                        <td>
                          <NavLink to={`/tutor/group/classscheduleupdate/`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </NavLink>
                          <NavLink className="ms-3">
                            <i
                              style={{ color: "red" }}
                              className="fa-solid fa-trash"
                            ></i>
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="teacher_grades_list_bottom mt-4">
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
                disabled={
                  indexOfLastItem >= filteredFaculty && filteredFaculty.length
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
