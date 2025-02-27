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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialService = void 0;
const tutorial_model_1 = require("./tutorial.model");
const addTutorial = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorial = yield tutorial_model_1.Tutorial.create(payload);
    return tutorial;
});
const getAllTutorials = () => __awaiter(void 0, void 0, void 0, function* () {
    const tutorials = yield tutorial_model_1.Tutorial.find();
    return tutorials;
});
const getTutorialById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorial = yield tutorial_model_1.Tutorial.findById(id);
    return tutorial;
});
const deleteTutorial = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorial = yield tutorial_model_1.Tutorial.findByIdAndDelete(id);
    return tutorial;
});
exports.TutorialService = {
    addTutorial,
    getAllTutorials,
    getTutorialById,
    deleteTutorial,
};
