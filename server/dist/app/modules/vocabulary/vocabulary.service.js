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
exports.vocabularyService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const vocabulary_model_1 = require("./vocabulary.model");
const lesson_model_1 = require("../lesson/lesson.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createVocabulary = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const user = yield user_model_1.User.isUserExistsByEmail(payload.adminEmail);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        const lesson = yield lesson_model_1.Lesson.findById(payload.lesson);
        if (!lesson) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Lesson not found');
        }
        yield lesson_model_1.Lesson.findByIdAndUpdate(lesson._id, { $inc: { vocabularyCount: 1 } }, { session });
        const vocabulary = yield vocabulary_model_1.Vocabulary.create([payload], { session });
        yield session.commitTransaction();
        return vocabulary[0];
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getALlVocabulary = () => __awaiter(void 0, void 0, void 0, function* () {
    const vocabulary = vocabulary_model_1.Vocabulary.find();
    return vocabulary;
});
const getVocabularyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabulary = vocabulary_model_1.Vocabulary.findById(id);
    return vocabulary;
});
const updateVocabulary = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabulary = vocabulary_model_1.Vocabulary.findByIdAndUpdate(id, payload, { new: true });
    return vocabulary;
});
const deleteVocabulary = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const vocabulary = yield vocabulary_model_1.Vocabulary.findById(id);
        if (!vocabulary) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Vocabulary not found');
        }
        yield lesson_model_1.Lesson.findByIdAndUpdate(vocabulary.lesson, { $inc: { vocabularyCount: -1 } }, { session });
        const deletedVocabulary = yield vocabulary_model_1.Vocabulary.findByIdAndDelete(id).session(session);
        yield session.commitTransaction();
        return deletedVocabulary;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.vocabularyService = {
    createVocabulary,
    getALlVocabulary,
    getVocabularyById,
    updateVocabulary,
    deleteVocabulary
};
