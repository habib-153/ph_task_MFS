"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutorial = void 0;
const mongoose_1 = require("mongoose");
const tutorialSchema = new mongoose_1.Schema({
    link: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
exports.Tutorial = (0, mongoose_1.model)('Tutorial', tutorialSchema);
