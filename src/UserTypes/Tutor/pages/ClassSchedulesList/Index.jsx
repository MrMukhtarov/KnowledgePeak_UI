import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Index.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const nav = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState("");

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty =
    schedules &&
    schedules.filter((f) => f.group.name && f.group.name.includes(search));

  filteredFaculty && filteredFaculty.sort((a, b) => b.id - a.id);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filteredFaculty && filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/TutorAuth/GetSingle?userName=${user.username}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setSchedules(res.data.classSchedules);
      });
  }, [user.token,user.username]);

  const Remove = (id) => {
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
              <h5 className="teacher_grade_list_title mb-0">Class Schedules</h5>
            </div>
            <div className="search_div text-end mb-0">
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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Group</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Lesson</th>
                  <th scope="col">Room</th>
                  <th scope="col">Date</th>
                  <th scope="col">Day</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((s) => {
                    return (
                      <tr key={s.id}>
                        <th scope="row">{s.id}</th>
                        <th
                          className="tutor_group_id"
                          style={{ cursor: "pointer" }}
                          onClick={() => nav(`/tutor/group/${s.group.id}`)}
                        >
                          {s.group.name}
                        </th>
                        <td>{s.teacher.name}</td>
                        <td>{s.lesson.name}</td>
                        <td>{s.room.roomNumber}</td>
                        <td>{s.scheduleDate.substring(0, 10)}</td>
                        <td>{s.day}</td>
                        <td>
                          {s.classTime.startTime} : {s.classTime.endTime}
                        </td>
                        <td>
                          {s.status === 11 ? (
                            <div className="cancel">
                              <span>Canceled</span>
                            </div>
                          ) : s.status === 10 ? (
                            <div className="finished">
                              <span>Finished</span>
                            </div>
                          ) : s.status === 8 ? (
                            <div className="pending">
                              <span>Pending</span>
                            </div>
                          ) : ""}
                        </td>
                        <td>
                          <NavLink
                            to={`/tutor/group/classscheduleupdate/${s.id}`}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </NavLink>
                          <NavLink
                            className="ms-3"
                            onClick={() => Remove(s.id)}
                          >
                            <i
                              style={{ color: "red" }}
                              className="fa-solid fa-trash"
                            ></i>
                          </NavLink>
                          {s.isDeleted === false ? (
                            <NavLink
                              className="ms-3"
                              onClick={() => SoftDelete(s.id)}
                            >
                              <i
                                style={{ color: "grey" }}
                                className="fa-solid fa-trash"
                              ></i>
                            </NavLink>
                          ) : (
                            <NavLink
                              className="ms-3"
                              onClick={() => RevertSoftDelete(s.id)}
                            >
                              <i
                                style={{ color: "green" }}
                                className="fa-solid fa-rotate-left"
                              ></i>
                            </NavLink>
                          )}
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
