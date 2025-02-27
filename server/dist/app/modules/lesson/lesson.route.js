"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonRoutes = void 0;
const express_1 = __importDefault(require("express"));
const lesson_controller_1 = require("./lesson.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-lesson', (0, auth_1.default)('admin', 'user'), lesson_controller_1.LessonController.createLesson);
router.get('/', lesson_controller_1.LessonController.getAllLessons);
router.get('/:id', lesson_controller_1.LessonController.getSingleLesson);
router.patch('/:id', (0, auth_1.default)('admin', 'user'), lesson_controller_1.LessonController.updateLesson);
router.delete('/:id', (0, auth_1.default)('admin', 'user'), lesson_controller_1.LessonController.deleteLesson);
exports.lessonRoutes = router;
