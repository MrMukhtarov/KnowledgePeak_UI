import React, { useEffect } from "react";
import "./Index.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Index = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <section id="AboutDesc" className="py-5">
      <div className="container">
        <p style={{overflow:"hidden"}} className="mb-5" data-aos="fade-left">
          Duihs autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Nam liber tempor cum soluta nobis eleifend option congue nihil
          imperdiet doming id quod mazim placerat facer possim assum. Typi non
          habent claritatem insitam; est usus legentis in iis qui facit eorum
          claritatem. Investigationes demonstraverunt lectores legere me lius
          quod ii legunt saepius.
        </p>
        <p style={{overflow:"hidden"}} data-aos="fade-right">
          Investigationes demonstraverunt lectores. Duis autem vel eum iriure
          dolor in hendrerit in vulputate velit esse molestie consequat, vel
          illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
          iusto odio dignissim qui blandit praesent luptatum zzril delenit augue
          duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta
          nobis eleifend option congue nihil imperdiet doming id quod mazim
          placerat facer possim assum. Typi non habent claritatem insitam; est
          usus legentis in iis qui facit eorum claritatem. Investigationes
          demonstraverunt lectores legere me lius quod ii legunt saepius.
        </p>
      </div>
    </section>
  );
};

export default Index;
