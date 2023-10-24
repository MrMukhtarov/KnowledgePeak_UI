import React from "react";
import "./Index.css";

const Index = () => {
  return (
    <section id="contact-form" className="py-5">
      <div className="container">
        <h3>We’d love to hear from you</h3>
        <div>
          <form className="d-flex flex-column gap-2">
            <input type="text" placeholder="Full Name" />
            <input type="tel" placeholder="Phone Number" />
            <input type="email" placeholder="Email Address" />
            <input type="text" placeholder="Additional Information" />
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
