import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Index.css";
import $ from "jquery";

const Index = () => {
  const navigate = useNavigate();
  const [group, setGroup] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [error, setError] = useState("");
  const itemsPerPage = 5;
  const user = JSON.parse(localStorage.getItem("user"));
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Groups")
      .then((res) => setGroup(res.data))
      .catch((e) => console.log(e));
  }, []);

  const updateModalData = (groupId) => {
    axios
      .get(`https://localhost:7153/api/Groups/Get/${groupId}`)
      .then((res) => {
        setModalData(res.data.students);
      })
      .catch((e) => console.log(e));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const openModal = (id) => {
    updateModalData(id);
    const down = $(".stu_modal");
    down.fadeIn("slow");
  };

  const closeModal = () => {
    const down = $(".stu_modal");
    down.fadeOut("slow");
  };

  const filteredFaculty = group.filter((f) => f.name.includes(search));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);

  const Delete = (id) => {
    axios
      .delete(`https://localhost:7153/api/Facultys/Delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
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
  };

  const SoftDelete = (id) => {
    axios
      .patch(
        `https://localhost:7153/api/Facultys/SoftDelete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
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
  };

  const RevertSoftDelete = (id) => {
    axios
      .patch(
        `https://localhost:7153/api/Facultys/RevertSoftDelete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
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
  };
  return (
    <section className="facultyList_superadmin py-3">
      <div className="container">
        <h5>Group List</h5>
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
              to={"/superadmin/faculty/create"}
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
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Limit</th>
                  <th scope="col">Status</th>
                  <th scope="col">Students</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((g) => {
                    return (
                      <tr key={g.id}>
                        <th scope="row">{g.id}</th>
                        <td>{g.name}</td>
                        <td>{g.limit}</td>
                        <td>
                          {g.isDeleted === false ? (
                            <span style={{ color: "green" }}>Active</span>
                          ) : (
                            <span style={{ color: "red" }}>DeActive</span>
                          )}
                        </td>
                        <td>
                          <button
                            disabled={!g.students || g.students.length === 0}
                            onClick={() => openModal(g.id)}
                            className="student_modal_click"
                            style={{ cursor: "pointer" }}
                          >
                            See Student
                          </button>
                        </td>
                        <td className="facultyList_superadmin_action d-flex gap-3">
                          <button
                            onClick={() =>
                              navigate(`/superadmin/faculty/update/id`)
                            }
                            className="one me-1"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() => Delete(g.id)}
                            className="two me-1"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          {g.isDeleted === false ? (
                            <button
                              onClick={() => SoftDelete(g.id)}
                              className="three"
                            >
                              <i className="fa-solid fa-trash-arrow-up"></i>
                            </button>
                          ) : (
                            <button
                              onClick={() => RevertSoftDelete(g.id)}
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

      <div className="stu_modal">
        <div className="text-end">
          <i onClick={closeModal} className="fa-solid fa-x"></i>
        </div>
        <div className="stu_molad_all">
          <ul>
            {modalData &&
              modalData.map((g) => {
                return (
                  <li key={g.id}>
                    {g.name} {g.surName}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Index;
