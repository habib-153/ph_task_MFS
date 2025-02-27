"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const balancerequest_controller_1 = require("./balancerequest.controller");
const BalanceRequestRoutes = (0, express_1.Router)();
BalanceRequestRoutes.post('/cerate-balanceRequest', (0, auth_1.default)(user_constant_1.USER_ROLE.agent), balancerequest_controller_1.balanceRequestController.cerateBalanceRequest);
BalanceRequestRoutes.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.agent, user_constant_1.USER_ROLE.admin), balancerequest_controller_1.balanceRequestController.getAllBalanceRequests);
BalanceRequestRoutes.get('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.agent, user_constant_1.USER_ROLE.admin), balancerequest_controller_1.balanceRequestController.getBalanceRequestById);
BalanceRequestRoutes.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), balancerequest_controller_1.balanceRequestController.updateBalanceRequestById);
BalanceRequestRoutes.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.agent), balancerequest_controller_1.balanceRequestController.deleteBalanceRequestById);
exports.default = BalanceRequestRoutes;
