import AdminDashboard from '../pages/admin/AdminDashboard';
import UserData from '../pages/admin/userManagement/userData';


export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Create Admin',
        path: 'create-admin',
        element: <AdminDashboard />,
      },
      {
        name: 'Create User',
        path: 'create-user',
        element: <AdminDashboard />,
      },
      {
        name: 'Users',
        path: 'user-data',
        element: <UserData />,
      },
    ],
  },
];