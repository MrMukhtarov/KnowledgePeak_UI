import React, { useState } from "react";
import {PiExamBold} from 'react-icons/pi'
import {CgProfile} from 'react-icons/cg'
import {
  SettingOutlined,
  HomeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
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
  getItem("Grade", "2",<PiExamBold />),
  getItem("Profile", "3",<CgProfile />),
  // getItem("Faculty", "sub1", <UserOutlined />, [
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5"),
  // ]),
];

const Index = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const OpenPage = (item) => {
    if(item === "1"){
     navigate("/teacher");
    }
    else if(item === "2"){
     navigate("/teacher/grade");
    }
    else if(item === "3"){
      navigate("/teacher/profile");
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
