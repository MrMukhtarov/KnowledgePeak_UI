import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Index = () => {

    const navigate = useNavigate();
    const [teacher,setTeacher] = useState([])
    const [sepciality,setSpeciality] = useState([])
    const [selectTeacher,setSelectTeacher] = useState("")
    const [selectSepciality,setSelectSpeciality] = useState([])

    useEffect(() => {
        axios
          .get("https://localhost:7153/api/TeacherAuth/GetAll")
          .then((res) => setTeacher(res.data))
          .catch((e) => console.log(e));
      }, []);

      useEffect(() => {
        axios
          .get("https://localhost:7153/api/Specialities/Get")
          .then((res) => setSpeciality(res.data))
          .catch((e) => console.log(e));
      }, []);
    
    const handleInputChange = (e) => {
        const { name, value, options } = e.target;
  
      if (name === "userName") {
        setSelectTeacher(value);
      }

      if (name === "specialityIds") {
        const selectedSpeciality = Array.from(options)
          .filter((option) => option.selected && option.value !== "")
          .map((option) => Number(option.value));
    
        setSelectSpeciality(selectedSpeciality);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("userName", selectTeacher);
      console.log(selectTeacher);

      selectSepciality.forEach((teacherSpecialities) => {
        formdata.append("teacherSpecialities", teacherSpecialities);
      });
  
      axios
        .post(`https://localhost:7153/api/TeacherAuth/AddSpeciality?userName=${selectTeacher}`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
    }

  return (
    <section className="faculty_create py-4">
    <div className="container">
      <div className="d-flex align-items-center gap-5">
        <i
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="fa-solid fa-arrow-left"
        ></i>
        <h5>Add Speciality For Teacher</h5>
      </div>
      <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Teacher UserName</label>
          <select
            type="text"
            className="form-control"
            id="name"
            onChange={handleInputChange}
            name="userName"
            value={selectTeacher}
          >
            <option value="" selected disabled>Select Teacher</option>
            {teacher.filter(f => f.isDeleted === false).map(e => {
                return(
                    <option key={e.id} value={e.userName}>{e.userName}</option>
                )
            })}
            </select>
        </div>
        {/* ------ */}
        <div className="form-group mt-3">
          <label className="mb-1" htmlFor="short">
            Speciality
          </label>
          <select
            type="text"
            className="form-control"
            id="short"
            onChange={handleInputChange}
            name="teacherSpecialities"
            multiple
            value={selectSepciality}
          >
            <option selected disabled>Select Speciality</option>
            {sepciality.filter(f => f.isDeleted === false).map(e => {
                return (
                    <option key={e.id} value={e.id}>{e.name}</option>
                )
            })}
            </select>
        </div>
        <button
          style={{ backgroundColor: "#002140" }}
          type="submit"
          className="btn btn-success mt-2"
        >
          Add Speciality
        </button>
      </form>
    </div>
  </section>
  )
}

export default Index