"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vocabulary_controller_1 = require("./vocabulary.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-vocabulary', (0, auth_1.default)('admin', 'user'), vocabulary_controller_1.vocabularyController.createVocabulary);
router.get('/', vocabulary_controller_1.vocabularyController.getAllVocabulary);
router.get('/:id', vocabulary_controller_1.vocabularyController.getVocabularyById);
router.patch('/:id', (0, auth_1.default)('admin', 'user'), vocabulary_controller_1.vocabularyController.updateVocabulary);
router.delete('/:id', (0, auth_1.default)('admin', 'user'), vocabulary_controller_1.vocabularyController.deleteVocabulary);
exports.vocabularyRoutes = router;
