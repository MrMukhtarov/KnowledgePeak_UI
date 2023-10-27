import React, { useEffect, useState } from "react";
import "./Index.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Facultys/GetAll")
      .then((res) => setFaculty(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty = faculty.filter((f) => f.name.includes(search));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="facultyList_superadmin py-3">
      <div className="container">
        <h5>Faculty List</h5>
        <hr />
        <div className="search_div text-end">
          <NavLink className="btn btn-success me-2" to={"/superadmin/faculty/create"}>
            Create
          </NavLink>
          <label htmlFor="search">Search</label>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            id="search"
          />
        </div>
        <div className="facultyList_superadmin_all">
          <div className="facultyList_superadmin_table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Short Name</th>
                  <th scope="col">Created TIme</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((f) => (
                  <tr key={f.id}>
                    <th scope="row">{f.id}</th>
                    <td>{f.name}</td>
                    <td>{f.shortName}</td>
                    <td>{f.createTime.substring(0, 10)}</td>
                    <td>{f.isDeleted === false ? "Active" : "DeActive"}</td>
                    <td className="facultyList_superadmin_action d-flex gap-3">
                      <button onClick={() => navigate(`/superadmin/faculty/update/${f.id}`)} className="one me-1">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button className="two me-1">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button className="three">
                        <i className="fa-solid fa-trash-arrow-up"></i>
                      </button>
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