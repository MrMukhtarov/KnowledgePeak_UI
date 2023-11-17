import React from "react";
import SideBar from "../../components/Sidebar/Index";
import FeedBack from '../../components/FeedBackList/Index'

const Index = () => {
  return (
    <div className="d-flex">
      <div className="col-lg-2">
        <SideBar />
      </div>
      <div className="col-lg-10 superadmin_home">
        <FeedBack />
      </div>
    </div>
  );
};

export default Index;
