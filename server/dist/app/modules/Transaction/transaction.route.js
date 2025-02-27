"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const transaction_controler_1 = require("./transaction.controler");
const router = express_1.default.Router();
router.post('/send-money', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.agent, user_constant_1.USER_ROLE.admin), transaction_controler_1.TransactionControllers.sendMoney);
router.post('/cash-out', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.agent, user_constant_1.USER_ROLE.admin), transaction_controler_1.TransactionControllers.cashOut);
router.post('/cash-in', (0, auth_1.default)(user_constant_1.USER_ROLE.agent, user_constant_1.USER_ROLE.admin), transaction_controler_1.TransactionControllers.cashIn);
router.get('/my-transactions', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.agent, user_constant_1.USER_ROLE.admin), transaction_controler_1.TransactionControllers.getMyTransactions);
exports.TransactionRoutes = router;
