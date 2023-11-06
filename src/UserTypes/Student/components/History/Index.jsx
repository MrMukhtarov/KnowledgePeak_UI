import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";


const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const nav = useNavigate();
  const [student, setStudent] = useState({});

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredFaculty =
    student.studentHistory &&
    student.studentHistory.filter((f) => f.grade.lesson && f.grade.lesson.name.includes(search));

    const sorted = filteredFaculty && filteredFaculty.sort((a,b) => b.id - a.id)

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
  sorted && sorted.slice(indexOfFirstItem, indexOfLastItem);
    

  useEffect(() => {
    axios
      .get(
        `https://localhost:7153/api/StudentAuth/GetByUserName?userName=${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setStudent(res.data);
      });
  }, []);

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
              <h5 className="teacher_grade_list_title mb-0">Grade History</h5>
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
          <div className="teacher_grades_list_center">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Grade Time</th>
                  <th scope="col">Lesson</th>
                  <th scope="col">Point</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Review</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((e) => {
                    return (
                      <tr>
                        <td>{e.grade && e.grade.gradeDate.substring(0,10)}</td>
                        <td>{e.grade.lesson.name}</td>
                        <td>{e.grade.point}</td>
                        <td>{e.grade.teacher.name}</td>
                        <td>{e.grade.review}</td>
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
