import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Index.css";

const Index = () => {
  const [schedule, setSchedule] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const user = JSON.parse(localStorage.getItem("user"));
  const [current, setCurrent] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/ClassSchedules/Get", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setSchedule(res.data);
        setCurrent(res.data.slice(0, itemsPerPage));
      });
  }, [user.token]);

  const handlePageChange = (newPage) => {
    if (newPage < 1) {
      newPage = 1;
    }
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filtered = schedule.filter((f) => f.group.name.includes(search));
    const fil = filtered.sort((a, b) => b.id - a.id);
    setCurrent(fil.slice(indexOfFirstItem, indexOfLastItem));
  }, [search, currentPage, schedule, itemsPerPage]);

  const handleStatusFilter = (status) => {
    const filteredByStatus = schedule
      .filter((s) => s.status === status)
      .sort((a, b) => b.id - a.id);
    setCurrent(filteredByStatus.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  return (
    <section className="facultyList_superadmin py-3">
      <div className="container">
        <h5>Schedule List</h5>
        <hr />
        <div className="d-flex justify-content-end align-items-center mb-3">
          <div className="me-2">
            <button
              onClick={() => handleStatusFilter(8)}
              style={{ color: "white" }}
              className="btn btn-warning"
            >
              Pending
            </button>
          </div>
          <div className="me-2">
            <button
              onClick={() => handleStatusFilter(10)}
              style={{ color: "white" }}
              className="btn btn-success"
            >
              Finished
            </button>
          </div>
          <div className="me-2">
            <button
              onClick={() => handleStatusFilter(11)}
              style={{ color: "white" }}
              className="btn btn-danger"
            >
              Canceled
            </button>
          </div>
          <div className="me-2">
            <button
              onClick={() => setCurrent(schedule.slice(0, itemsPerPage))}
              style={{ color: "white" }}
              className="btn btn-secondary"
            >
              All
            </button>
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
        <div className="facultyList_superadmin_all">
          <div className="facultyList_superadmin_table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Start - End Time</th>
                  <th scope="col">Group</th>
                  <th scope="col">Room</th>
                  <th scope="col">Lesson</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Tutor</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {current.map((f) => (
                  <tr key={f.id}>
                    <th scope="row">{f.id}</th>
                    <td>{f.scheduleDate.substring(0, 10)}</td>
                    <td>
                      {f.classTime.startTime} - {f.classTime.endTime}
                    </td>
                    <td className="admin_shcedule_link"
                      style={{ fontWeight: "bolder" }}
                      onClick={() =>
                        nav(`/superadmin/schedule/group/${f.group.id}`)
                      }>{f.group.name}</td>
                    <td>{f.room.roomNumber}</td>
                    <td>{f.lesson.name}</td>
                    <td
                      className="admin_shcedule_link"
                      style={{ fontWeight: "bolder" }}
                      onClick={() =>
                        nav(`/superadmin/teacher/${f.teacher.userName}`)
                      }
                    >
                      {f.teacher.name} {f.teacher.surname}
                    </td>
                    <td
                      className="admin_shcedule_link"
                      style={{ fontWeight: "bolder" }}
                      onClick={() =>
                        nav(`/superadmin/tutor/${f.tutor.userName}`)
                      }
                    >
                      {f.tutor.name} {f.tutor.surname}
                    </td>
                    <td>
                      {f.status === 8 ? (
                        <span style={{ color: "orange", fontWeight: "bolder" }}>
                          Pending
                        </span>
                      ) : f.status === 10 ? (
                        <span style={{ color: "green", fontWeight: "bolder" }}>
                          Finished
                        </span>
                      ) : f.status === 11 ? (
                        <span style={{ color: "red", fontWeight: "bolder" }}>
                          Canceled
                        </span>
                      ) : null}
                    </td>
                  </tr>
                ))}
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
              disabled={current.length < itemsPerPage}
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
