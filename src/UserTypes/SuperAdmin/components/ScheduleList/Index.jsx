import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/ClassSchedules/Get", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setSchedule(res.data))
  }, [user.token]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty = schedule.filter((f) => f.group.name.includes(search));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="facultyList_superadmin py-3">
      <div className="container">
        <h5>Schedule List</h5>
        <hr />
        <div className="d-flex justify-content-end align-items-center">
          <div className="search_div text-end">
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
                {currentItems.map((f) => (
                  <tr key={f.id}>
                    <th scope="row">{f.id}</th>
                    <td>{f.scheduleDate.substring(0, 10)}</td>
                    <td>
                      {f.classTime.startTime} - {f.classTime.endTime}
                    </td>
                    <td>{f.group.name}</td>
                    <td>{f.room.roomNumber}</td>
                    <td>{f.lesson.name}</td>
                    <td>
                      {f.teacher.name} {f.teacher.surname}
                    </td>
                    <td>
                      {f.tutor.name} {f.tutor.surname}
                    </td>
                    <td>
                      {f.status === 8 ? (
                        <span style={{ color: "orange", fontWeight:"bolder" }}>Pending</span>
                      ) : f.status === 10 ? (
                        <span style={{ color: "green", fontWeight:"bolder" }}>Finished</span>
                      ) : f.status === 11 ? (
                        <span style={{ color: "red", fontWeight:"bolder" }}>Canceled</span>
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
