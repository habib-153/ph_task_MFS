"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorialRoutes = void 0;
const express_1 = __importDefault(require("express"));
const tutorial_controller_1 = require("./tutorial.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-tutorial', (0, auth_1.default)('admin', 'user'), tutorial_controller_1.TutorialController.createTutorial);
router.get('/', tutorial_controller_1.TutorialController.getAllTutorials);
router.get('/:id', tutorial_controller_1.TutorialController.getTutorial);
router.delete('/:id', (0, auth_1.default)('admin', 'user'), tutorial_controller_1.TutorialController.deleteTutorial);
exports.tutorialRoutes = router;
