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
exports.AdminServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const approveAgent = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield user_model_1.User.findById(agentId);
    if (!agent) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Agent not found');
    }
    agent.isApproved = true;
    yield agent.save();
    return agent;
});
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    user.status = 'blocked';
    yield user.save();
    return user;
});
const addMoneyToAgent = (agentId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield user_model_1.User.findById(agentId);
    if (!agent) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Agent not found');
    }
    agent.balance += amount;
    yield agent.save();
    return agent;
});
const getTotalMoneyInSystem = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    const totalMoney = users.reduce((acc, user) => acc + user.balance, 0);
    return totalMoney;
});
exports.AdminServices = {
    approveAgent,
    blockUser,
    addMoneyToAgent,
    getTotalMoneyInSystem,
};
