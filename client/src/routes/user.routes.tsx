import CashOut from '../pages/user/CashOut';
import SendMoney from '../pages/user/SendMoney';
import StudentDashboard from '../pages/user/UserDashboard';
import TransactionsHistory from '../pages/user/TransactionHistory';

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "send-money",
    element: <SendMoney />,
  },
  {
    path: "cash-out",
    element: <CashOut />,
  },
  {
    path: "transactions",
    element: <TransactionsHistory />,
  }
];
