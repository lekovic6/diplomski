"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.route('/getAllBooks').post((req, res) => new book_controller_1.BookController().getAllBooks(req, res));
bookRouter.route('/getAllCategories').post((req, res) => new book_controller_1.BookController().getAllCategories(req, res));
bookRouter.route('/getRandomBooks').post((req, res) => new book_controller_1.BookController().getRandomBooks(req, res));
bookRouter.route('/getAllBooksFromGenre').post((req, res) => new book_controller_1.BookController().getAllBooksFromGenre(req, res));
bookRouter.route('/searchBooks').post((req, res) => new book_controller_1.BookController().searchBooks(req, res));
exports.default = bookRouter;
//# sourceMappingURL=book.routes.js.map