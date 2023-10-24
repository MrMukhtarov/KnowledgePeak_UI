import React from "react";
import "./Index.css";

const Index = () => {
  return (
    <section id="login_form" className="py-5">
      <div className="contain">
        <div className="login_all d-flex flex-column justify-content-center text-center">
          <h2>Member Login</h2>
          <form className="w-50 m-auto d-flex flex-column gap-2">
           <div className="d-flex flex-column align-items-center">
              <input className="w-75" type="text" placeholder="Username or E-mail" id="username" />
            </div>
            <div className="d-flex flex-column align-items-center">
              <input type="password" placeholder="Password" className="w-75" id="pas" />
            </div>
            <div>
              <button>LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Index;
