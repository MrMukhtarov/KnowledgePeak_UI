import React, { useState } from "react";
import {
  SettingOutlined,
  HomeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import {AiOutlineClockCircle} from 'react-icons/ai'
import {FaChalkboardTeacher} from 'react-icons/fa'
import {GiTeacher} from 'react-icons/gi'
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { PiStudentBold } from 'react-icons/pi';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdMeetingRoom } from 'react-icons/md';

const { Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1",<HomeOutlined />),
  getItem("Setting", "2", <SettingOutlined />),
  getItem("Faculty", "3", <BookOutlined />),
  getItem("Speciality", "4", <BookOutlined />),
  getItem("Lesson", "5", <BookOutlined />),
  getItem("Teacher", "6", <FaChalkboardTeacher />),
  getItem("Class Time", "7", <AiOutlineClockCircle />),
  getItem("Tutor", "8", <GiTeacher />),
  getItem("Student", "9", <PiStudentBold />),
  getItem("Group", "10", <FaPeopleGroup />),
  getItem("Room", "11", <MdMeetingRoom />),
];

const Index = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const OpenPage = (item) => {
    if(item === "1"){
     navigate("/superadmin");
    }
    else if(item === "2"){
      navigate("/superadmin/setting");
    }
    else if(item === "3"){
      navigate("/superadmin/faculty");
    }
    else if(item === "4"){
      navigate("/superadmin/speciality");
    }
    else if(item === "5"){
      navigate("/superadmin/lesson");
    }
    else if(item === "6"){
      navigate("/superadmin/teacher");
    }
    else if(item === "7"){
      navigate("/superadmin/classtime");
    }
    else if(item === "8"){
      navigate("/superadmin/tutor");
    }
    else if(item === "9"){
      navigate("/superadmin/student");
    }
    else if(item === "10"){
      navigate("/superadmin/group");
    }
    else if(item === "11"){
      navigate("/superadmin/room");
    }
  }
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
 
 <Layout style={{width:"0"}}>
       <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{height:"100vh"}}
        className="superadmin-sidebar"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={(e) => OpenPage(e.key)}
        />
      </Sider>
 </Layout>
  );
};

export default Index;
