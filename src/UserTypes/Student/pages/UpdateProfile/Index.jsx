import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Index = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const [selectImage, setSelectImage] = useState("");
  const [inputs, setInputs] = useState({
  });
  
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
        setInputs(res.data);
        setSelectImage(res.data.imageUrl);
      });
  }, []);

  console.log(inputs);
  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (type === "file" && files != null && files.length > 0) {
      const selectedFile = files[0];

      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: selectedFile,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("imageFile", inputs.imageFile);

    axios
      .put(`https://localhost:7153/api/StudentAuth/UpdateProfile`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/student/profile");
        }
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
    <section className="faculty_create py-4">
      <div className="container">
        <div className="d-flex align-items-center gap-5">
          <i
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
            className="fa-solid fa-arrow-left"
          ></i>
          <h5>Edit Profile</h5>
        </div>
        <form className="w-50 m-auto mt-5" onSubmit={(e) => handleSubmit(e)}>
          {/* ---- */}
          <img width={40} src={student.imageUrl} alt="" />
          <div className="form-group">
            <label htmlFor="img">Image</label>
            <input
              type="file"
              className="form-control"
              id="img"
              placeholder="Enter Image"
              onChange={handleInputChange}
              name="imageFile"
              defaultValue={selectImage}
            />
            {errorMessages.ImageFile ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.ImageFile}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("ImageFile") ? error : ""}
                </p>
              </div>
            )}
          </div>
          {/* ---- */}
          {
            <div className="error-messages">
              <p style={{ color: "red" }} className="error-message">
                {error && error.includes("Exist") ? error : ""}
              </p>
            </div>
          }
          <button
            style={{ backgroundColor: "#002140" }}
            type="submit"
            className="btn btn-success mt-2"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default Index;
