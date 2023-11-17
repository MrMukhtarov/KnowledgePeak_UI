import React, { useEffect, useState } from "react";
import "./Index.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Index = () => {
  const [inputs, setInputs] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMessages((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  useEffect(() => {
    setErrorMessages({});
  }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullName", inputs.fullName);
    formdata.append("phone", inputs.phone);
    formdata.append("email", inputs.email);
    formdata.append("message", inputs.message);

    axios
      .post(`https://localhost:7153/api/Contacts/Create`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          inputs.fullName = ""
          inputs.phone = ""
          inputs.email = ""
          inputs.message = ""
          document.querySelector('.fullname').value = ""
          document.querySelector('.phonenumber').value = ""
          document.querySelector('.emailAdress').value = ""
          document.querySelector('.additionalInfo').value = ""
         toast.success("Message Sent!")
        }
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.errors) {
          setErrorMessages(e.response.data.errors);
        } else {
          setError(e.response.data.message);
        }
        toast.error("Message dont sent!")
      });
  };

  return (
    <section id="contact-form" className="py-5">
      <div className="container">
      <Toaster position="top-right" reverseOrder={false} />
        <h3>We’d love to hear from you</h3>
        <div>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("null") ? error : ""}
                </p>
              </div>
            <input
              onChange={handleInputChange}
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="fullname"
            />
            {errorMessages.FullName ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.FullName}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("Name") ? error : ""}
                </p>
              </div>
            )}
            <input
              onChange={handleInputChange}
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="phonenumber"
            />
            {errorMessages.Phone ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Phone}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("Phone") ? error : ""}
                </p>
              </div>
            )}
            <input
              onChange={handleInputChange}
              name="email"
              type="email"
              placeholder="Email Address"
              className="emailAdress"
            />
            {errorMessages.Email ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Email}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("Email") ? error : ""}
                </p>
              </div>
            )}
            <input
              onChange={handleInputChange}
              name="message"
              type="text"
              placeholder="Additional Information"
              className="additionalInfo"
            />
            {errorMessages.Message ? (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {errorMessages.Message}
                </p>
              </div>
            ) : (
              <div className="error-messages">
                <p style={{ color: "red" }} className="error-message">
                  {error && error.includes("Message") ? error : ""}
                </p>
              </div>
            )}
            <div className="mt-2">
              <button>Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Index;
