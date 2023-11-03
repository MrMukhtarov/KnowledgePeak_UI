import React from "react";
import SideBar from "../../components/Sidebar/Index";
import Group from '../../components/GroupList/Index'

const Index = () => {
  return (
    <div className="d-flex">
      <div className="col-lg-2">
        <SideBar />
      </div>
      <div className="col-lg-10 superadmin_home">
        <Group />
      </div>
    </div>
  );
};

export default Index;
