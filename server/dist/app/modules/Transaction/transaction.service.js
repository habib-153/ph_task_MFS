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
exports.TransactionServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const transaction_model_1 = require("./transaction.model");
const config_1 = __importDefault(require("../../config"));
const sendMoney = (senderId, receiverPhone, amount, pin) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = yield user_model_1.User.findById(senderId);
    const receiver = yield user_model_1.User.findOne({ phoneNumber: receiverPhone });
    const admin = yield user_model_1.User.findOne({
        role: 'admin',
        phoneNumber: config_1.default.ADMIN_PHONE,
    });
    if (!sender) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Sender not found');
    }
    if (!receiver) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Receiver not found');
    }
    if (!admin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    if (!(yield user_model_1.User.isPasswordMatched(pin.toString(), sender.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'PIN do not matched');
    if (amount < 50) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Minimum amount to send is 50 taka');
    }
    const fee = amount > 100 ? 5 : 0;
    const totalAmount = amount + fee;
    if (sender.balance < totalAmount) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient balance');
    }
    sender.balance -= totalAmount;
    receiver.balance += amount;
    admin.balance += 5; // Admin earns 5 taka for every transaction
    yield sender.save();
    yield receiver.save();
    yield admin.save();
    const transaction = yield transaction_model_1.Transaction.create({
        senderId: sender._id,
        receiverId: receiver._id,
        amount,
        type: 'sendMoney',
        fee,
        transactionId: `TXN-${Date.now()}`,
    });
    return transaction;
});
const cashOut = (userId, agentId, amount, pin) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    const agent = yield user_model_1.User.findById(agentId);
    const admin = yield user_model_1.User.findOne({
        role: 'admin',
        phoneNumber: config_1.default.ADMIN_PHONE,
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!agent) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Agent not found');
    }
    if (!admin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    if (!(yield user_model_1.User.isPasswordMatched(pin, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'PIN do not matched');
    const fee = amount * 0.015;
    const totalAmount = amount + fee;
    if (user.balance < totalAmount) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient balance');
    }
    user.balance -= totalAmount;
    agent.balance -= amount; // Deduct the amount from the agent's balance
    agent.income = (agent.income || 0) + amount * 0.01; // Agent earns 1% of the transaction amount
    admin.income = (admin.income || 0) + amount * 0.005; // Admin earns 0.50% of the transaction amount
    admin.balance += 5; // Admin earns 5 taka for every transaction
    yield user.save();
    yield agent.save();
    yield admin.save();
    const transaction = yield transaction_model_1.Transaction.create({
        senderId: user._id,
        receiverId: agent._id,
        amount,
        type: 'cashOut',
        fee,
        transactionId: `TXN-${Date.now()}`,
    });
    return transaction;
});
const cashIn = (userId, agentId, amount, pin) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    const agent = yield user_model_1.User.findById(agentId);
    const admin = yield user_model_1.User.findOne({
        role: 'admin',
        phoneNumber: config_1.default.ADMIN_PHONE,
    });
    if (!user || !agent) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User or Agent not found');
    }
    if (!admin) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Admin not found');
    }
    if (!(yield user_model_1.User.isPasswordMatched(pin, agent === null || agent === void 0 ? void 0 : agent.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'PIN do not matched');
    user.balance += amount;
    agent.balance -= amount; // Deduct the amount from the agent's balance
    admin.balance += 5; // Admin earns 5 taka for every transaction
    yield user.save();
    yield agent.save();
    yield admin.save();
    const transaction = yield transaction_model_1.Transaction.create({
        senderId: agent._id,
        receiverId: user._id,
        amount,
        type: 'cashIn',
        fee: 0,
        transactionId: `TXN-${Date.now()}`,
    });
    return transaction;
});
const getMyTransactions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.Transaction.find({ $or: [{ senderId: userId }, { receiverId: userId }] }).sort({ createdAt: -1 });
    return transactions;
});
exports.TransactionServices = {
    sendMoney,
    cashOut,
    cashIn,
    getMyTransactions,
};
