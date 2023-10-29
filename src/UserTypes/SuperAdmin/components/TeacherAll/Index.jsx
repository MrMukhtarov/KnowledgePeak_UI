import React, { useEffect, useState } from "react";
import "./Index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [error, setError] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/TeacherAuth/GetAll")
      .then((res) => setTeacher(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty = teacher.filter((f) => f.name.includes(search));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);

  const Delete = (id) => {
    axios
      .delete(`https://localhost:7153/api/TeacherAuth/Delete?userName=${id}`)
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
  return (
    <section className="facultyList_superadmin py-3">
      <div className="container">
        <h5>Teacher List</h5>
        <hr />
        <div className="d-flex  justify-content-between align-items-center">
          {errorMessages ? (
            <div className="error-messages">
              <p style={{ color: "red" ,  fontSize:"12px", fontWeight:"bold",margin:"0"}} className="error-message">
                {errorMessages.message}
              </p>
            </div>
          ) : (
            <div className="error-messages">
              <p style={{ color: "red" , fontSize:"12px", fontWeight:"bold",margin:"0"}} className="error-message">
                {error}
              </p>
            </div>
          )}
          <div className="search_div text-end">
            <NavLink
              className="btn btn-success me-2"
              to={"/superadmin/teacher/addlesson"}
            >
              Add Lesson
            </NavLink>
            <NavLink
              className="btn btn-success me-2"
              to={"/superadmin/teacher/addspeciality"}
            >
              Add Speciality
            </NavLink>
            <NavLink
              className="btn btn-success me-2"
              to={"/superadmin/teacher/addfaculty"}
            >
              Add Faculty
            </NavLink>
            <NavLink
              className="btn btn-primary me-2"
              to={"/superadmin/teacher/register"}
            >
              Register Teacher
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
          <div
            className="facultyList_superadmin_table"
            style={{ overflowX: "scroll" }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Role</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Lessons</th>
                  <th scope="col">Speciality</th>
                  <th scope="col">Faculty</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((f) => (
                  <tr key={f.id}>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "12px",
                      }}
                      scope="row"
                    >
                      <span title={f.id}>{f.id}</span>
                    </th>
                    <th scope="row">
                      <img
                        className="img-fluid"
                        style={{ width: "70px" }}
                        src={f.imageUrl}
                        alt=""
                      />
                    </th>
                    <td>{f.name}</td>
                    <td>{f.surname}</td>
                    <td>{f.userName}</td>
                    <td>{f.email}</td>
                    <td>{f.gender === 1 ? "Male" : "Female"}</td>
                    <td>{f.roles}</td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {f.startDate.substring(0, 10)}
                    </td>
                    <td
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {f.endDate ? f.endDate.substring(0, 10) : "-"}
                    </td>
                    <td>
                      <select name="" id="">
                        {f.lessons.map((l) => {
                          return (
                            <option value="">
                              {l.id} - {l.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td>
                      <select name="" id="">
                        {f.specialities.map((l) => {
                          return (
                            <option value="">
                              {l.id} - {l.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td>
                      <select name="" id="">
                        {f.faculties.map((l) => {
                          return (
                            <option value="">
                              {l.id} - {l.name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td>
                      <span>
                        {f.isDeleted === false ? "Active" : "DeActive"}
                      </span>
                    </td>
                    <td className="facultyList_superadmin_action d-flex gap-3">
                      <button
                      title="update"
                        onClick={() =>
                          navigate(`/superadmin/teacher/update/${f.id}`)
                        }
                        className="one me-1"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button title="remove" onClick={() => Delete(f.userName)} className="two me-1">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                      title="Add Role"
                        onClick={() =>
                          navigate(`/superadmin/teacher/addrole/${f.userName}`)
                        }
                        className="three me-1"
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                      {f.roles.length === 0 ? (
                        <button
                        title="Remove Role"
                          disabled
                          style={{ opacity: "0.6" }}
                          onClick={() =>
                            navigate(
                              `/superadmin/teacher/removerole/${f.userName}`
                            )
                          }
                          className="four me-1"
                        >
                          <i class="fa-solid fa-minus"></i>
                        </button>
                      ) : (
                        <button
                        title="Remove Role"
                          onClick={() =>
                            navigate(
                              `/superadmin/teacher/removerole/${f.userName}`
                            )
                          }
                          className="four me-1"
                        >
                          <i class="fa-solid fa-minus"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="facultyList_superadmin_pagination text-end mt-3">
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
