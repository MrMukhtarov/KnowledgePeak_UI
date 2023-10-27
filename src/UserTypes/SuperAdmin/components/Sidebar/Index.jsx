import React, { useState } from "react";
import {
  SettingOutlined,
  FileOutlined,
  HomeOutlined,
  TeamOutlined,
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
  getItem("Setting", "2", <SettingOutlined />),
  getItem("Faculty", "3", <BookOutlined />),
  // getItem("Faculty", "sub1", <UserOutlined />, [
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5"),
  // ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
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
