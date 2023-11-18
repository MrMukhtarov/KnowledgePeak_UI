import React, { useState } from "react";
import { SettingOutlined, HomeOutlined, BookOutlined } from "@ant-design/icons";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdMeetingRoom } from "react-icons/md";
import "./Index.css";
import { NavLink } from "react-router-dom";
import { MdFeedback } from "react-icons/md";
import { GrSchedule } from "react-icons/gr";

const { Sider } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem("Dashboard", "/superadmin", <HomeOutlined />),
  getItem("Setting", "/superadmin/setting", <SettingOutlined />),
  getItem("Faculty", "/superadmin/faculty", <BookOutlined />),
  getItem("Speciality", "/superadmin/speciality", <BookOutlined />),
  getItem("Lesson", "/superadmin/lesson", <BookOutlined />),
  getItem("Teacher", "/superadmin/teacher", <FaChalkboardTeacher />),
  getItem("Class Time", "/superadmin/classtime", <AiOutlineClockCircle />),
  getItem("Tutor", "/superadmin/tutor", <GiTeacher />),
  getItem("Student", "/superadmin/student", <PiStudentBold />),
  getItem("Group", "/superadmin/group", <FaPeopleGroup />),
  getItem("Room", "/superadmin/room", <MdMeetingRoom />),
  getItem("FeedBack", "/superadmin/feedback", <MdFeedback />),
  getItem("Schedule", "/superadmin/schedule", <GrSchedule style={{backgroundColor:"white"}}/>),
];

const Index = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (key) => {
    navigate(key);
    setCollapsed(true);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ width: "0" }}>
      <Sider
        style={{ height: "100vh" }}
        className="superadmin-sidebar"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[window.location.pathname]}
          mode="inline"
          className="ant-menu-item.active"
        >
          {items.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => handleMenuClick(item.key)}
            >
              <NavLink to={item.key}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Index;
