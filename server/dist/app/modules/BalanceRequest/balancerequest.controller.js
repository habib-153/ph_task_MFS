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
exports.balanceRequestController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const balancerequest_service_1 = require("./balancerequest.service");
const cerateBalanceRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield balancerequest_service_1.balanceRequestService.createBalanceRequest(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Balance Request  successful',
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const getAllBalanceRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield balancerequest_service_1.balanceRequestService.getBalanceRequest();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'All Balance Requests fetched successfully',
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const deleteBalanceRequestById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield balancerequest_service_1.balanceRequestService.deleteBalanceRequest(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Balance Request Deleted successfully',
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const updateBalanceRequestById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield balancerequest_service_1.balanceRequestService.updateBalanceRequest(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Balance Request updated successfully',
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const getBalanceRequestById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield balancerequest_service_1.balanceRequestService.getBalanceRequestById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'Balance Request fetched successfully',
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
exports.balanceRequestController = {
    cerateBalanceRequest,
    getAllBalanceRequests,
    deleteBalanceRequestById,
    updateBalanceRequestById,
    getBalanceRequestById,
};
