import React, { useEffect } from "react";
import "./Index.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <section id="information">
      <div className="container">
        <h3>My Knowledge Peak Information</h3>
        <div data-aos="fade-left">
        <div style={{overflow:"hidden"}} className="information-all d-flex flex-column flex-lg-row justify-content-between align-items-center gap-4 gap-lg-2">
          <div className="information-box col-lg-3">
          <i className="fa-solid fa-envelope"></i>
            <h4>Checking Message</h4>
            <p>
              Claritas est etiam processus dynamicus, qui sequitur mutationem
              consuetudium lectorum. Mirum est notare quam.
            </p>
          </div>

          <div className="information-box col-lg-3">
          <i className="fa-solid fa-user"></i>
            <h4>Update My Information</h4>
            <p>
              Claritas est etiam processus dynamicus, qui sequitur mutationem
              consuetudium lectorum. Mirum est notare quam.
            </p>
          </div>

          <div className="information-box col-lg-3">
          <i className="fa-solid fa-user-group"></i>
            <h4>Join with Alumni Forum</h4>
            <p>
              Claritas est etiam processus dynamicus, qui sequitur mutationem
              consuetudium lectorum. Mirum est notare quam.
            </p>
          </div>

          <div className="information-box col-lg-3">
          <i className="fa-solid fa-magnifying-glass"></i>
            <h4>Search Alumni Directory</h4>
            <p>
              Claritas est etiam processus dynamicus, qui sequitur mutationem
              consuetudium lectorum. Mirum est notare quam.
            </p>
          </div>
        </div>
        </div>
      
      </div>
    </section>
  );
};

export default Index;
