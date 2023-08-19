"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.route('/getAllBooks').post((req, res) => new book_controller_1.BookController().getAllBooks(req, res));
bookRouter.route('/getBookById').post((req, res) => new book_controller_1.BookController().getBookById(req, res));
bookRouter.route('/getAllCategories').post((req, res) => new book_controller_1.BookController().getAllCategories(req, res));
bookRouter.route('/getCategoryShowName').post((req, res) => new book_controller_1.BookController().getCategoryShowName(req, res));
bookRouter.route('/getRandomBooks').post((req, res) => new book_controller_1.BookController().getRandomBooks(req, res));
bookRouter.route('/getAllBooksFromGenre').post((req, res) => new book_controller_1.BookController().getAllBooksFromGenre(req, res));
bookRouter.route('/searchBooks').post((req, res) => new book_controller_1.BookController().searchBooks(req, res));
bookRouter.route('/searchBooksFromGenre').post((req, res) => new book_controller_1.BookController().searchBooksFromGenre(req, res));
bookRouter.route('/getTotalBooksCount').post((req, res) => new book_controller_1.BookController().getTotalBooksCount(req, res));
bookRouter.route('/getTotalBooksCountFromGenre').post((req, res) => new book_controller_1.BookController().getTotalBooksCountFromGenre(req, res));
bookRouter.route('/getAllBooksByAuthorsId').post((req, res) => new book_controller_1.BookController().getAllBooksByAuthorsId(req, res));
bookRouter.route('/updateBook').post((req, res) => new book_controller_1.BookController().updateBook(req, res));
bookRouter.route('/insertBook').post((req, res) => new book_controller_1.BookController().insertBook(req, res));
bookRouter.route('/deleteBook').post((req, res) => new book_controller_1.BookController().deleteBook(req, res));
bookRouter.route('/insertReview').post((req, res) => new book_controller_1.BookController().insertReview(req, res));
bookRouter.route('/updateReview').post((req, res) => new book_controller_1.BookController().updateReview(req, res));
bookRouter.route('/deleteReview').post((req, res) => new book_controller_1.BookController().deleteReview(req, res));
bookRouter.route('/getBooksWithPendingReviews').post((req, res) => new book_controller_1.BookController().getBooksWithPendingReviews(req, res));
bookRouter.route('/respondToReview').post((req, res) => new book_controller_1.BookController().respondToReview(req, res));
exports.default = bookRouter;
//# sourceMappingURL=book.routes.js.map