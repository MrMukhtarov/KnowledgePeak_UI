import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const Index = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessages, setErrorMessages] = useState("");
  const [error, setError] = useState("");
  const itemsPerPage = 5;
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Rooms",{
        headers: {
            Authorization: `Bearer ${user.token}`,
          },
      })
      .then((res) => setRoom(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty = room.filter((f) => f.roomNumber.includes(search));

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
          .delete(`https://localhost:7153/api/Rooms/Delete/${id}`, {
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
      confirmButtonText: "Yes, Soft Delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://localhost:7153/api/Rooms/SoftDelete/${id}`,
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
      confirmButtonText: "Yes, Revert Soft Delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://localhost:7153/api/Rooms/RevertSoftDelete/${id}`,
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
      }
    });
  };
  return (
    <section className="facultyList_superadmin py-3">
      <div className="container">
        <h5>Room List</h5>
        <hr />
        <div className="d-flex  justify-content-between align-items-center">
            <div className="error-messages">
              <p style={{ color: "red" }} className="error-message">
                {error && error}
              </p>
            </div>
          <div className="search_div text-end">
            <NavLink
              className="btn btn-success me-2"
              to={"/superadmin/room/create"}
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
                  <th scope="col">Room Number</th>
                  <th scope="col">Capacity</th>
                  <th scope="col">Faculty</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((f) => (
                  <tr key={f.id}>
                    <th scope="row">{f.id}</th>
                    <td>{f.roomNumber}</td>
                    <td>{f.capacity}</td>
                    <td>{f.faculty && f.faculty.name}</td>
                    <td>{f.isDeleted === false ? <span style={{color:"green"}}>Active</span> : 
                    <span style={{color:"red"}}>DeActive</span>}</td>
                    <td className="facultyList_superadmin_action d-flex gap-3">
                      <button
                        onClick={() =>
                          navigate(`/superadmin/room/update/${f.id}`)
                        }
                        className="one me-1"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button onClick={() => Delete(f.id)} className="two me-1">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      {f.isDeleted === false ? (
                        <button
                          onClick={() => SoftDelete(f.id)}
                          className="three"
                        >
                          <i className="fa-solid fa-trash-arrow-up"></i>
                        </button>
                      ) : (
                        <button
                          onClick={() => RevertSoftDelete(f.id)}
                          className="four"
                        >
                          <i className="fa-solid fa-eraser"></i>
                        </button>
                      )}
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
