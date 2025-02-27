"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vocabulary = exports.vocabularySchema = void 0;
const mongoose_1 = require("mongoose");
exports.vocabularySchema = new mongoose_1.Schema({
    word: {
        type: String,
        required: true,
    },
    pronunciation: {
        type: String,
        required: true,
    },
    whenToSay: {
        type: String,
        required: true,
    },
    lesson: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true,
    },
    adminEmail: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Vocabulary = (0, mongoose_1.model)('Vocabulary', exports.vocabularySchema);
