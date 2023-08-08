"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_1 = __importDefault(require("../models/book"));
const category_1 = __importDefault(require("../models/category"));
class BookController {
    getAllBooks(req, res) {
        book_1.default.find({}, (err, books) => {
            if (err)
                console.log(err);
            else
                res.json(books);
        });
    }
    getAllCategories(req, res) {
        category_1.default.find({}, (err, categories) => {
            if (err)
                console.log(err);
            else
                res.json(categories);
        });
    }
    getRandomBooks(req, res) {
        let numberOfBooks = req.body.numberOfBooks;
        book_1.default.aggregate([{ $sample: { size: numberOfBooks } }], (err, books) => {
            if (err)
                console.log(err);
            else
                res.json(books);
        });
    }
    getAllBooksFromGenre(req, res) {
        let genre = req.body.genre;
        book_1.default.find({ 'genre': genre }, (err, books) => {
            if (err)
                console.log(err);
            else
                res.json(books);
        });
    }
    searchBooks(req, res) {
        let searchParam = req.body.searchParam;
        //PREPRAVI DA NADJE ONE CIJI TITLE SADRZI SEARCHPARAM
        book_1.default.find({ 'title': searchParam }, (err, books) => {
            if (err)
                console.log(err);
            else
                res.json(books);
        });
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map