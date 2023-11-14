import React, { useState } from "react";
import { AiOutlineHistory } from 'react-icons/ai';
import {CgProfile} from 'react-icons/cg'
import {
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
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
  getItem("Home","/student",<HomeOutlined />),
  getItem("History", "/student/history",<AiOutlineHistory />),
  getItem("Profile", "/student/profile",<CgProfile />),
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
