"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const mongoose_1 = require("mongoose");
const lessonSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    vocabularyCount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Lesson = (0, mongoose_1.model)('Lesson', lessonSchema);
