import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const Index = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [error, setError] = useState("");
  const itemsPerPage = 5;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/StudentAuth/Get", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setStudent(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty = student.filter((f) => f.name.includes(search));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);

  const Delete = (userName) => {
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
          .delete(
            `https://localhost:7153/api/StudentAuth/Delete?userName=${userName}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
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
        <h5>Student List</h5>
        <hr />
        <div className="d-flex  justify-content-between align-items-center">
          {errorMessages ? (
            <div className="error-messages">
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "bold",
                  margin: "0",
                }}
                className="error-message"
              >
                {errorMessages.message}
              </p>
            </div>
          ) : (
            <div className="error-messages">
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "bold",
                  margin: "0",
                }}
                className="error-message"
              >
                {error}
              </p>
            </div>
          )}
          <div className="search_div text-end">
            <NavLink
              className="btn btn-primary me-2"
              to={"/superadmin/student/register"}
            >
              Register Student
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
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Course</th>
                  <th scope="col">Avarage</th>
                  <th scope="col">Age</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Role</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Group</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((f) => (
                  <tr key={f.id}>
                    <th scope="row">
                      <img
                        className="img-fluid tutor_img_admin"
                        style={{ width: "70px" }}
                        src={f.imageUrl}
                        alt=""
                      />
                    </th>
                    <td>{f.name}</td>
                    <td>{f.surName}</td>
                    <td>{f.userName}</td>
                    <td>{f.course}</td>
                    <td>{f.avarage}</td>
                    <td>{f.age}</td>
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
                    <td>{f.group && f.group.name}</td>
                    <td>
                      {f.isDeleted === true ? (
                        <span style={{ color: "red" }}>Kicked Out</span>
                      ) : (
                        <span style={{ color: "green" }}>Student</span>
                      )}
                    </td>
                    <td className="facultyList_superadmin_action d-flex gap-3">
                      <button
                        title="update"
                        onClick={() =>
                          navigate(`/superadmin/student/update/${f.userName}`)
                        }
                        className="one me-1"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        title="remove"
                        onClick={() => Delete(f.userName)}
                        className="two me-1"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        title="Add Role"
                        onClick={() =>
                          navigate(`/superadmin/student/addrole/${f.userName}`)
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
                              `/superadmin/student/removerole/${f.userName}`
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
                              `/superadmin/student/removerole/${f.userName}`
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
