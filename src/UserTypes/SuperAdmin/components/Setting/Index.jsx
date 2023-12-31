import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Index.css";

const Index = () => {
  const [setting, setSetting] = useState([]);
  const [inputs, setInputs] = useState({});
  console.log(inputs);
  const [error, setError] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Settings")
      .then((res) => {
        setSetting(res.data);
        if (res.data.length > 0) {
          setInputs(res.data[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const file = files ? files[0] : null;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
      [`${name}File`]: file,
    }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("email", inputs.email);
    formdata.append("phone", inputs.phone);
    formdata.append("location", inputs.location);

    if (inputs.headerLogoFile) {
      formdata.append("HeaderLogoFile", inputs.headerLogoFile);
    }
    if (inputs.footerLogoFile) {
      formdata.append("FooterLogoFile", inputs.footerLogoFile);
    }
    const newErrors = validateInputs(inputs);
    setError(newErrors);

    if (Object.keys(error).length === 0) {
      await axios
        .put(`https://localhost:7153/api/Settings/Update/${id}`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => setError(res.data.response))
        .catch((e) => console.log(e));
    } else {
      console.log("error", error);
    }
  };
  const validateInputs = (values) => {
    const newErrors = {};

    if (!values.address) {
      newErrors.address = "Address is required";
    }
    if (!values.phone) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\d{10}$/.test(values.phone)) {
      newErrors.phone = "Invalid phone number.";
    }

    if (!values.email) {
      newErrors.email = "E-mail is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Invalid email address.";
    }

    setError(newErrors);
    return newErrors;
  };
  return (
    <section className="setting py-3">
      <div className="container">
        <h5>Setting</h5>
        <hr />
        {setting.length > 0 &&
          setting.map((set) => (
            <div key={set.id} className="setting_all">
              <form
                onSubmit={(e) => handleSubmit(e, set.id)}
                className="d-flex flex-column"
              >
                <div className="form_content_all d-flex flex-column gap-5">
                  <div className="d-flex flex-wrap gap-2 justify-content-center form-top">
                    <div className="d-flex flex-column col-lg-5">
                      <label htmlFor="mail">
                        Email <span>*</span>
                      </label>
                      <input
                        type="email"
                        id="mail"
                        defaultValue={set?.email}
                        onChange={handleInputChange}
                        name="email"
                      />
                    </div>

                    <div className="d-flex flex-column col-lg-5">
                      <label htmlFor="phone">
                        Phone <span>*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        defaultValue={set.phone}
                        onChange={handleInputChange}
                        name="phone"
                      />
                    </div>

                    <div className="d-flex flex-column col-lg-5">
                      <label htmlFor="loc">
                        Location <span>*</span>
                      </label>
                      <input
                        type="text"
                        id="loc"
                        name="location"
                        defaultValue={set.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center gap-2 setting_form-bottom">
                    <div className="d-flex flex-column col-lg-5">
                      <img
                        className="img-fluid w-25"
                        src={set.headerLogo.replace(/\\/g, "/")}
                        alt=""
                      />
                      <span className="setting_img_span">Header Logo</span>
                      <input
                        onChange={handleInputChange}
                        type="file"
                        name="headerLogo"
                        id=""
                      />
                    </div>
                    <div className="d-flex flex-column col-lg-5">
                      <img
                        className="img-fluid w-25"
                        src={set.footerLogo.replace(/\\/g, "/")}
                        alt=""
                      />
                      <span className="setting_img_span">Footer Logo</span>
                      <input
                        onChange={handleInputChange}
                        type="file"
                        name="footerLogo"
                        id=""
                      />
                    </div>
                  </div>
                </div>
                <button type="submit">
                  <i className="fa-solid fa-check"></i> Update
                </button>
              </form>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Index;
