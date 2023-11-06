import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();
    const [student,setStudent] = useState([])
    const [selectStudent,setSelectStudent] = useState([])
    const {id} = useParams();
    const [error, setError] = useState("");

      useEffect(() => {
        axios
          .get("https://localhost:7153/api/StudentAuth/Get",{
            headers : {
                Authorization: `Bearer ${user.token}`,
            }
          })
          .then((res) => setStudent(res.data))
          .catch((e) => console.log(e));
      }, [user.token]);

      useEffect(() => {
        axios.get(`https://localhost:7153/api/Groups/Get/${id}`)
        .then(res => {
          setSelectStudent(res.data.students && res.data.students.map(s => s.userName))
        })
      },[])

    
    const handleInputChange = (e) => {
        const { name, options } = e.target;
  
      if (name === "userName") {
        const selectedStudent = Array.from(options)
          .filter((option) => option.selected && option.value !== "")
          .map((option) => option.value);
    
        setSelectStudent(selectedStudent);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formdata = new FormData();

      selectStudent.forEach((userName) => {
        formdata.append("userName", userName);
      });
        
      axios.post(`https://localhost:7153/api/Groups/AddStudents/${id}`,formdata,{
        headers : {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
        }
      })
      .then(res => {
        if(res.status === 200){
            navigate('/tutor')
        }
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          error(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
      });
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
        <h5>Add Student In Group</h5>
      </div>
      <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
        {selectStudent ? <span style={{color:"green", fontWeight:"bold"}}>Current Students : {selectStudent}</span> : "No Students"}
        {/* ------ */}
        <div className="form-group mt-3">
          <label className="mb-1" htmlFor="short">
            Students
          </label>
          <select
            type="text"
            className="form-control"
            id="short"
            onChange={handleInputChange}
            name="userName"
            multiple={true}
            value={selectStudent}
          >
            <option value="" selected disabled>Select Students</option>
            {student.map(e => {
                return (
                    <option key={e.id} value={e.userName}>{e.name} {e.surName}</option>
                )
            })}
            </select>
        </div>
        <div className="error-messages">
            <p className="error-message" style={{ color: "red" }}>
              {error.includes("This") || error.includes("Full") ? error : ""}
            </p>
          </div>
        <button
          style={{ backgroundColor: "#002140" }}
          type="submit"
          className="btn btn-success mt-2"
        >
          Add Student
        </button>
      </form>
    </div>
  </section>
  )
}

export default Index