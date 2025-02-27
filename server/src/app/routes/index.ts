import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TransactionRoutes } from "../modules/Transaction/transaction.route";

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
