import { Button, Layout, Menu, Dropdown, Avatar, Space } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <Space style={{ cursor: "pointer" }}>
              <Avatar
                style={{ backgroundColor: "#1677ff" }}
                icon={<UserOutlined />}
              />
              <span style={{ marginLeft: 8 }}>Account</span>
            </Space>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#f5f5f5",
            borderRadius: 4,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;