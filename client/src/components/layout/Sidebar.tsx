import { Layout, Menu, Typography, Divider, Avatar } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { userPaths } from "../../routes/user.routes";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { FaUser } from "react-icons/fa";
import { TUser } from "../../types/userManagement.type";

const { Sider } = Layout;
const { Title } = Typography;

const userRole = {
  ADMIN: "admin",
  USER: "user",
  AGENT: "agent",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }
console.log(user)
  let sidebarItems: ItemType<MenuItemType>[] = [];

  switch ((user as TUser)?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN).filter(
        (item) => item !== undefined
      );
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.USER).filter(
        (item) => item !== undefined
      );
      break;
    case userRole.AGENT:
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        height: "100vh",
        position: "sticky",
        top: "0",
        left: "0",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      {/* App Logo/Name */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        <Title level={3} style={{ color: "white", margin: 0 }}>
          JPL
        </Title>
        <div style={{ fontSize: "12px", color: "#9ca3af" }}>
          Money Transfer Service
        </div>
      </div>

      {/* User Profile Section */}
      <div
        style={{
          padding: "0 16px",
          marginBottom: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          size={64}
          icon={<FaUser />}
          style={{
            backgroundColor: "#1677ff",
            marginBottom: "8px",
          }}
        />
        <Typography.Text style={{ color: "white", fontWeight: "500" }}>
          {(user as TUser)?.name?.firstName + " " + (user as TUser)?.name?.lastName ||
            "User"}
        </Typography.Text>
        <Typography.Text
          style={{
            color: "#9ca3af",
            fontSize: "12px",
            textTransform: "capitalize",
          }}
        >
          {(user as TUser)?.role || "Guest"}
        </Typography.Text>
      </div>

      <Divider
        style={{ margin: "0 16px 16px", borderColor: "rgba(255,255,255,0.1)" }}
      />

      {/* Navigation Menu */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        items={sidebarItems}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar;