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
    getBookById(req, res) {
        let bookId = req.body.bookId;
        book_1.default.findOne({ '_id': bookId }, (err, books) => {
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
    getCategoryShowName(req, res) {
        let categoryName = req.body.categoryName;
        category_1.default.findOne({ 'categoryName': categoryName }, (err, category) => {
            if (err)
                console.log(err);
            else
                res.json(category);
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
        let currentPage = req.body.currentPage;
        let itemsPerPage = req.body.itemsPerPage;
        book_1.default.find({ 'title': new RegExp(searchParam, 'i') })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .exec((err, books) => {
            if (err) {
                console.log(err);
                res.status(500).send('Server error');
            }
            else {
                res.json(books);
            }
        });
    }
    searchBooksFromGenre(req, res) {
        let searchParam = req.body.searchParam;
        let categoryName = req.body.categoryName;
        let currentPage = req.body.currentPage;
        let itemsPerPage = req.body.itemsPerPage;
        book_1.default.find({
            'title': new RegExp(searchParam, 'i'),
            'genre': categoryName
        })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .exec((err, books) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error searching books from genre');
            }
            else {
                res.json(books);
            }
        });
    }
    getTotalBooksCount(req, res) {
        let searchParam = req.body.searchParam;
        book_1.default.countDocuments({ 'title': new RegExp(searchParam, 'i') }, (err, count) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error getting total books count');
            }
            else {
                res.json(count);
            }
        });
    }
    getTotalBooksCountFromGenre(req, res) {
        let searchParam = req.body.searchParam;
        let categoryName = req.body.categoryName;
        book_1.default.countDocuments({
            'title': new RegExp(searchParam, 'i'),
            'genre': categoryName
        }, (err, count) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error getting total books count');
            }
            else {
                res.json(count);
            }
        });
    }
    getAllBooksByAuthorsId(req, res) {
        let authorId = req.body.authorId;
        const mongoose = require('mongoose');
        let authorObjectId = mongoose.Types.ObjectId(authorId);
        //console.log('Author ID:', authorId);
        //console.log('Author ObjectId:', authorObjectId);
        book_1.default.find({
            'authors._id': authorObjectId
        }, (err, books) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error retrieving books');
            }
            else {
                if (books == null) {
                    console.log(books);
                    return res.status(404).send('Zero books found for specific authors id!');
                }
                res.json(books);
            }
        });
    }
    updateBook(req, res) {
        let book = req.body.book;
        let ObjectId = require('mongodb').ObjectId;
        let idBook = new ObjectId(book._id);
        book_1.default.collection.updateOne({ '_id': idBook }, {
            $set: {
                'title': book.title,
                'authors': book.authors,
                'description': book.description,
                'genre': book.genre,
                'first_publish_year': book.first_publish_year,
                'cover_id': book.cover_id,
                'coverData64': book.coverData64,
                'coverContentType64': book.coverContentType64,
                'openlibrary_work': book.openlibrary_work,
                'isbn': book.isbn,
                'reviews': book.reviews,
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error updating.' });
            }
            else {
                res.status(200).json({ 'message': 'updated' });
                //console.log(result);
            }
        });
    }
    insertBook(req, res) {
        let book = req.body.book;
        let newBook = new book_1.default({
            title: book.title,
            authors: book.authors,
            description: book.description,
            genre: book.genre,
            first_publish_year: book.first_publish_year,
            cover_id: book.cover_id,
            coverData64: book.coverData64,
            coverContentType64: book.coverContentType64,
            openlibrary_work: book.openlibrary_work,
            isbn: book.isbn,
            reviews: book.reviews
        });
        newBook.save().then(book => {
            res.status(200).json({ 'message': 'inserted' });
        }).catch(err => {
            res.status(400).json({ 'message': 'error' });
        });
    }
    deleteBook(req, res) {
        let ObjectId = require('mongodb').ObjectId;
        let bookObjectId = new ObjectId(req.body.bookId);
        book_1.default.collection.deleteOne({ '_id': bookObjectId }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'An error occurred while trying to delete the book.' });
            }
            else {
                console.log(result);
                res.json({ message: 'deleted' });
            }
        });
    }
    insertReview(req, res) {
        let bookId = req.body.bookId;
        let review = req.body.review;
        let ObjectId = require('mongodb').ObjectId;
        let bookObjectId = new ObjectId(bookId);
        book_1.default.collection.updateOne({ '_id': bookObjectId }, {
            $push: {
                'reviews': review,
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error in adding the review.' });
            }
            else {
                res.status(200).json({ 'message': 'inserted' });
            }
        });
    }
    updateReview(req, res) {
        let bookId = req.body.bookId;
        let review = req.body.review;
        let ObjectId = require('mongodb').ObjectId;
        let bookObjectId = new ObjectId(bookId);
        console.log(review);
        book_1.default.collection.updateOne({ '_id': bookObjectId, 'reviews.username': review.username }, {
            $set: {
                'reviews.$.comment': review.comment,
                'reviews.$.rating': review.rating,
                'reviews.$.pending': true,
                'reviews.$.accepted': false,
                'reviews.$.declined': false,
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error in updating review.' });
            }
            else {
                res.status(200).json({ 'message': 'updated' });
            }
        });
    }
    deleteReview(req, res) {
        let bookId = req.body.bookId;
        let review = req.body.review;
        let ObjectId = require('mongodb').ObjectId;
        let bookObjectId = new ObjectId(bookId);
        book_1.default.collection.updateOne({ '_id': bookObjectId }, {
            $pull: {
                'reviews': { 'username': review.username }
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error in deleting review.' });
            }
            else {
                res.status(200).json({ 'message': 'deleted' });
            }
        });
    }
    getBooksWithPendingReviews(req, res) {
        book_1.default.find({ "reviews.pending": true }, (err, booksWithPendingReviews) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error fetching pending reviews.' });
            }
            else {
                res.status(200).json(booksWithPendingReviews);
            }
        });
    }
    respondToReview(req, res) {
        let bookId = req.body.bookId;
        let reviewUsername = req.body.reviewUsername;
        let respondFlag = req.body.respondFlag;
        let ObjectId = require('mongodb').ObjectId;
        let bookObjectId = new ObjectId(bookId);
        if (respondFlag) {
            // If respondFlag is true, set the accepted flag to true and others to false
            book_1.default.collection.updateOne({ '_id': bookObjectId, 'reviews.username': reviewUsername }, {
                "$set": {
                    "reviews.$.pending": false,
                    "reviews.$.accepted": true,
                    "reviews.$.declined": false
                }
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Error updating review response.' });
                }
                else {
                    res.status(200).json({ 'message': 'updated' });
                }
            });
        }
        else {
            // If respondFlag is false, remove the review from the reviews array
            book_1.default.collection.updateOne({ '_id': bookObjectId }, {
                "$pull": {
                    "reviews": { "username": reviewUsername }
                }
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Error deleting review.' });
                }
                else {
                    res.status(200).json({ 'message': 'deleted' });
                }
            });
        }
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map