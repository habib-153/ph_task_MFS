"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    senderId: {
        type: mongoose_1.Schema.Types.String,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: mongoose_1.Schema.Types.String,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['sendMoney', 'cashOut', 'cashIn'],
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
