"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_controller_1 = require("../controllers/author.controller");
const authorRouter = express_1.default.Router();
authorRouter.route('/getAuthorById').post((req, res) => new author_controller_1.AuthorController().getAuthorById(req, res));
authorRouter.route('/searchAuthorByName').post((req, res) => new author_controller_1.AuthorController().searchAuthorByName(req, res));
authorRouter.route('/getTotalAuthorCount').post((req, res) => new author_controller_1.AuthorController().getTotalAuthorCount(req, res));
authorRouter.route('/updateAuthor').post((req, res) => new author_controller_1.AuthorController().updateAuthor(req, res));
authorRouter.route('/insertAuthor').post((req, res) => new author_controller_1.AuthorController().insertAuthor(req, res));
authorRouter.route('/deleteAuthor').post((req, res) => new author_controller_1.AuthorController().deleteAuthor(req, res));
exports.default = authorRouter;
//# sourceMappingURL=author.routes.js.map