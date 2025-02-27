"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const transaction_service_1 = require("./transaction.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const getMyTransactions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const transactions = yield transaction_service_1.TransactionServices.getMyTransactions(_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'My transactions',
        data: transactions,
    });
}));
const sendMoney = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverPhone, amount, pin } = req.body;
    const result = yield transaction_service_1.TransactionServices.sendMoney(senderId, receiverPhone, amount, pin);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Money sent successfully',
        data: result,
    });
}));
const cashOut = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, agentId, amount, pin } = req.body;
    const result = yield transaction_service_1.TransactionServices.cashOut(userId, agentId, amount, pin);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cash out successful',
        data: result,
    });
}));
const cashIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, agentId, amount, pin } = req.body;
    const result = yield transaction_service_1.TransactionServices.cashIn(userId, agentId, amount, pin);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cash in successful',
        data: result,
    });
}));
exports.TransactionControllers = {
    sendMoney,
    cashOut,
    cashIn,
    getMyTransactions,
};
