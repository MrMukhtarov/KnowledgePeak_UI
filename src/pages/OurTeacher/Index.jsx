import React, { useEffect, useState } from "react";
import "./Index.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Index = () => {
  const [teacher, setTeacher] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [filteredTeacher, setFilteredTeacher] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    axios.get(`https://localhost:7153/api/TeacherAuth/GetAll`).then((res) => {
      setTeacher(res.data);
      setFilteredTeacher(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`https://localhost:7153/api/Facultys/GetAll`)
      .then((res) => setFaculty(res.data));
  }, []);

  const handleSearch = () => {
    const filtered = teacher.filter((t) => {
      const fullName = `${t.name}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });

    setFilteredTeacher(filtered);
  };

  const Filter = (id) => {
    setSelectedFaculty(id);
    if (id === 0) {
      setFilteredTeacher(teacher);
    } else {
      const filter = teacher.filter((t) => {
        return t.faculties.some((f) => f.id === id);
      });
      setFilteredTeacher(filter);
    }
  };

  return (
    <section className="out_teacher py-5">
      <div className="containers px-5">
        <div className="our_teacher_all">
          <div className="px-5 d-flex justify-content-end mb-3">
            <button className="button-30 btn-sm me-2" onClick={handleSearch}>
              Search
            </button>
            <input
              className="form-control w-25"
              type="text"
              placeholder="Search by Teacher Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="our_teacher_top">
            <ul>
              <li
                onClick={() => Filter(0)}
                className={selectedFaculty === 0 ? "selected_teacher" : ""}
              >
                All
              </li>
              {faculty &&
                faculty
                  .filter((f) => f.isDeleted === false)
                  .map((e) => (
                    <li
                      onClick={() => Filter(e.id)}
                      key={e.id}
                      className={
                        selectedFaculty === e.id ? "selected_teacher" : ""
                      }
                    >
                      {e.name}
                    </li>
                  ))}
            </ul>
          </div>
          <div className="our_teacher_bottom py-3 d-flex flex-wrap gap-3">
            {filteredTeacher &&
              filteredTeacher.map((t) => (
                <div
                  key={t.id}
                  className="our_teacher_bottom_box d-flex flex-column"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                >
                  <img src={t.imageUrl} alt="img" style={{cursor:"pointer"}} onClick={() => nav(`/ourteacher/detail/${t.userName}`)}/>
                  <NavLink to={`/ourteacher/detail/${t.userName}`} className="teacher_name mt-3">
                    {t.name} {t.surname}
                  </NavLink>
                  <div className="our_teacher_bottom_box_faculties d-flex gap-1 flex-wrap">
                    {t.faculties && t.faculties.length > 0 ? (
                      t.faculties.map((c) => (
                        <span key={c.id}>{c.name},</span>
                      ))
                    ) : (
                      <span>No Faculties</span>
                    )}
                  </div>
                  <hr />
                  <span className="teacher_eamil">{t.email}</span>
                  <p>{t.description && t.description.substring(0, 40)}...</p>
                  <button className="button-30" aria-roledescription="button" onClick={() => nav(`/ourteacher/detail/${t.userName}`)}>
                    VIEW TEACHER
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
