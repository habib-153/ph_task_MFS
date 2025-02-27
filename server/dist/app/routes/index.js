"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const transaction_route_1 = require("../modules/Transaction/transaction.route");
const balancerequest_route_1 = __importDefault(require("../modules/BalanceRequest/balancerequest.route"));
const admin_route_1 = require("../modules/Admin/admin.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/transactions',
        route: transaction_route_1.TransactionRoutes,
    },
    {
        path: '/balance-requests',
        route: balancerequest_route_1.default,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
