import React, { useEffect, useState } from "react";
import "./Index.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

const Index = () => {
  const [search, setSearch] = useState("");
  const nav = useNavigate();
  const[group,setGroup] = useState({})
  const {id} = useParams() 

  useEffect(() => {
    axios.get(`https://localhost:7153/api/Groups/Get/${id}`)
    .then(res => {
        setGroup(res.data)
    })
  },[])

  const filteredFaculty = group.students && group.students.filter((f) =>
  f.name && f.name.toLowerCase().includes(search.toLowerCase())
);



  return (
    <section className="tutor_group_detail py-3">
      <div className="container">
        <div className="d-flex align-items-center gap-4">
        <div style={{fontSize:"20px"}}><i
            onClick={() => nav(-1)}
            style={{ cursor: "pointer" }}
            className="fa-solid fa-arrow-left"
          ></i></div>
        <h5 className="teacher_grade_list_title mb-0">{group.name}</h5>
        </div>
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
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Age</th>
                  <th scope="col">Avarage</th>
                  <th scope="col">Course</th>
                  <th scope="col">Gender</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculty && filteredFaculty.map(s => {
                    return(
                        <tr>
                        <th scope="row"><img src={s.imageUrl} alt="" /></th>
                        <td>{s.name}</td>
                        <td>{s.surName}</td>
                        <td>{s.age}</td>
                        <td>{s.avarage}</td>
                        <td>{s.course}</td>
                        <td>{s.gender === 1 ? "Male" : "Female"}</td>
                      </tr>
                    )
                })}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
