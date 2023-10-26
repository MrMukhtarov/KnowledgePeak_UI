import React from "react";
import "./Index.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

const Index = () => {

  const [setting,setSetting] = useState([]);
  useEffect(() => {
    axios.get("https://localhost:7153/api/Settings")
    .then(res => setSetting(res.data))
    .catch(err => console.log(err))
  },[])

  return (
    <section className="setting py-3">
      <div className="container">
        <h5>Setting</h5>
        <hr />
       {setting.map(set => {
        return(
          <div key={set.id} className="setting_all">
          <form action="" className="d-flex flex-column">
            <div className="form_content_all d-flex flex-column gap-5">
              <div className="d-flex flex-wrap gap-2 justify-content-center form-top">
                <div className="d-flex flex-column col-lg-5">
                  <label htmlFor="email">
                    Email <span>*</span>
                  </label>
                  <input type="email" id="email" defaultValue={set.email}/>
                </div>

                <div className="d-flex flex-column col-lg-5">
                  <label htmlFor="phone">
                    Phone <span>*</span>
                  </label>
                  <input type="tel" id="phone" defaultValue={set.phone}/>
                </div>

                <div className="d-flex flex-column col-lg-5">
                  <label htmlFor="loc">
                    Location <span>*</span>
                  </label>
                  <input type="text" id="loc" defaultValue={set.location}/>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-2 setting_form-bottom">
                <div className="d-flex flex-column col-lg-5">
                  <img
                    className="img-fluid w-25"
                    src={`${set.headerLogo.replace(/\\/g, "/")}`}
                    alt=""
                  />
                  <span className="setting_img_span">Header Logo</span>
                  <input type="file" name="" id="" />
                </div>
                <div className="d-flex flex-column col-lg-5">
                  <img
                    className="img-fluid w-25"
                    src={`${set.footerLogo.replace(/\\/g, "/")}`}
                    alt=""
                  />
                  <span className="setting_img_span">Footer Logo</span>
                  <input type="file" name="" id=""/>
                </div>
              </div>
            </div>
           <button><i class="fa-solid fa-check"></i> Update</button>
          </form>
        </div>
        )
       })}
      </div>
    </section>
  );
};

export default Index;
