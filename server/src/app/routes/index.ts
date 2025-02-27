import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TransactionRoutes } from "../modules/Transaction/transaction.route";
import BalanceRequestRoutes from "../modules/BalanceRequest/balancerequest.route";
import { AdminRoutes } from "../modules/Admin/admin.route";

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/transactions',
    route: TransactionRoutes,
  },
  {
    path: '/balance-requests',
    route: BalanceRequestRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
