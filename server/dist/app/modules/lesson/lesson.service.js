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
exports.lessonService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const vocabulary_model_1 = require("../vocabulary/vocabulary.model");
const lesson_model_1 = require("./lesson.model");
const addLesson = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_model_1.Lesson.create(payload);
    return lesson;
});
const getAllLessons = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['name'];
    const lessons = new QueryBuilder_1.default(lesson_model_1.Lesson.find(), query).search(searchableFields).filter().paginate().sort().fields();
    const result = yield lessons.modelQuery;
    const meta = yield lessons.countTotal();
    return { result, meta };
});
const updateLesson = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_model_1.Lesson.findByIdAndUpdate(id, payload, { new: true });
    return lesson;
});
const getSingleLesson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_model_1.Lesson.findById(id);
    return lesson;
});
const deleteLesson = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deleteVocabularies = yield vocabulary_model_1.Vocabulary.deleteMany({ lesson: id }).session(session);
        const deletedLesson = yield lesson_model_1.Lesson.findByIdAndDelete(id).session(session);
        yield session.commitTransaction();
        return {
            lesson: deletedLesson,
            deletedVocabulariesCount: deleteVocabularies.deletedCount
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.lessonService = {
    addLesson,
    getAllLessons,
    updateLesson,
    getSingleLesson,
    deleteLesson
};
