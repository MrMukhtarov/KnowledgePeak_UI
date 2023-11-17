import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Index.css";
import $ from 'jquery'

const Index = () => {
  const [group, setGroup] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const user = JSON.parse(localStorage.getItem("user"));
  const [disable, setDisable] = useState(false);
  const [id, setId] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Contacts", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setGroup(res.data))
      .catch((e) => console.log(e));
  }, [user.token]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const See = (id) => {
    setDisable(true);
    setId(id);
    $(".feedback_modal").fadeIn("slow")
  };
  const Close = () => {
    $(".feedback_modal").fadeOut("slow")
  }

  useEffect(() => {
    if (disable) {
      axios
        .get(`https://localhost:7153/api/Contacts/GetById/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setMessage(res.data.message);
        });
    }
  }, [disable, id, user.token]);

  const filteredFaculty = group.filter((f) => f.fullName.includes(search));

  const sorted = filteredFaculty && filteredFaculty.sort((a,b) => b.id - a.id)

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sorted.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="facultyList_superadmin py-3">
      <div className="container">
        <h5>Feedback List</h5>
        <hr />
        <div className="">
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
                  <th scope="col">Id</th>
                  <th scope="col">Fullname</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date</th>
                  <th scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((g) => {
                    return (
                      <tr key={g.id}>
                        <th scope="row">{g.id}</th>
                        <td>{g.fullName}</td>
                        <td>{g.phone}</td>
                        <td>{g.email}</td>
                        <td>{g.createDate.substring(0, 10)}</td>
                        <td>
                          {g.message.length > 11 ? (
                            <button
                              onClick={() => See(g.id)}
                              className="btn btn-primary btn-sm"
                            >
                              See
                            </button>
                          ) : (
                            g.message
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
      <div className="feedback_modal" style={{ display: "none" }}>
        <div className="d-flex">
          <p className="w-100">{message && message}</p>
          <span onClick={Close} style={{color:'white'}} className="ms-3 x_Feedback">X</span>
        </div>
      </div>
    </section>
  );
};

export default Index;
