"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const balanceRequestSchema = new mongoose_1.Schema({
    agentId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 50 },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        required: true,
    },
    isBalanceRequest: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
const BalanceRequest = (0, mongoose_1.model)('BalanceRequest', balanceRequestSchema);
exports.default = BalanceRequest;
