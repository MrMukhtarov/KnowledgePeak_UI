import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Index.css";

const Index = () => {
  const [setting, setSetting] = useState([]);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    axios
      .get("https://localhost:7153/api/Settings")
      .then((res) => setSetting(res.data))
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

    await axios
      .put(`https://localhost:7153/api/Settings/Update/${id}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <section className="setting py-3">
      <div className="container">
        <h5>Setting</h5>
        <hr />
        {setting.map((set) => (
          <div key={set.id} className="setting_all">
            <form
              onSubmit={(e) => handleSubmit(e, set.id)}
              className="d-flex flex-column"
            >
              <div className="form_content_all d-flex flex-column gap-5">
                <div className="d-flex flex-wrap gap-2 justify-content-center form-top">
                <div className="d-flex flex-column col-lg-5">
                   <label htmlFor="email">
                      Email <span>*</span>
                    </label>
                   <input
                      type="email"
                      id="email"
                      defaultValue={set.email}
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
