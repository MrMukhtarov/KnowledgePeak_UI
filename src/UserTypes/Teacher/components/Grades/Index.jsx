import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Index.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [teacher, setTeacher] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const nav = useNavigate();
  const [review, setReview] = useState("");
  const [visible, setVisible] = useState(false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty =
    teacher.grades &&
    teacher.grades.filter(
      (f) => f.student.name && f.student.name.includes(search)
    );
  const filtersStudent =
    filteredFaculty && filteredFaculty.sort((a, b) => b.id - a.id);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    filtersStudent && filtersStudent.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/TeacherAuth/GetByUserName?Usermame=${user.username}`
      )
      .then((res) => {
        setTeacher(res.data);
      });
  }, [user.username]);

  const See = (a) => {
    setReview(a);
    setVisible(true);
  };
  const Close = () => {
    setVisible(false);
  };

  return (
    <section className="teacher_grades_list py-3">
      <div className="container">
        <h1 className="teacher_grade_list_title">Grade List</h1>
        <div className="teacher_grades_list_all">
          <div className="teacher_grades_list_top">
            <div className="search_div text-end">
              <NavLink
                title="Add Grade"
                className="btn btn-primary me-4"
                to={"/teacher/grade/create"}
              >
                <AiOutlinePlus />
              </NavLink>
              <label htmlFor="search">Search</label>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                id="search"
              />
            </div>
          </div>
          <div className="teacher_grades_list_center">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Point</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Grade Date</th>
                  <th scope="col">Review</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((g) => {
                    return (
                      <tr>
                        <th scope="row">{g.id}</th>
                        <td>{g.point}</td>
                        <td
                          className="teacher_stu_name"
                          onClick={() =>
                            nav(`/teacher/grade/${g.student.userName}`)
                          }
                        >
                          {g.student.name}
                        </td>
                        <td>{g.student.surName}</td>
                        <td>
                          {g.gradeDate.substring(0, 10)} -{" "}
                          {g.gradeDate.substring(11, 19)}
                        </td>
                        <td>
                          {g.review.length > 10 ? <button className="btn btn-sm btn-primary" onClick={() => See(g.review)}>See</button> : g.review}
                        </td>
                        <td>
                          <NavLink
                            title="Edit"
                            className="btn bg-primary"
                            to={`/teacher/grade/update/${g.id}`}
                          >
                            <AiFillEdit
                              style={{ color: "white", marginBottom: "0" }}
                            />
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
      <div
        className={`teacher_grades_reviev ${
          visible ? "d-block" : "d-none"
        }`}
      >
        <div className="teacher_grades_reviev-all d-flex justify-content-between">
        <p className="mb-0">{review}</p>
        <span
          onClick={Close}
          style={{ color: "white" }}
          className="ms-3 x_Feedback"
          >
          X
        </span>
          </div>
      </div>
    </section>
  );
};

export default Index;
