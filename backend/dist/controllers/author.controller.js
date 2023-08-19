"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorController = void 0;
const author_1 = __importDefault(require("../models/author"));
const book_1 = __importDefault(require("../models/book"));
class AuthorController {
    getAuthorById(req, res) {
        let authorId = req.body.authorId;
        const mongoose = require('mongoose');
        let objectId = mongoose.Types.ObjectId(authorId);
        //console.log('Received body:', req.body);
        if (!authorId) {
            return res.status(400).json({ message: "authorId is required" });
        }
        author_1.default.findOne({ '_id': objectId }, (err, author) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error fetching author" });
            }
            //console.log('Author:', author);
            if (author == null) {
                return res.status(404).json({ message: "Author not found" });
            }
            res.json(author);
        });
    }
    searchAuthorByName(req, res) {
        let searchParam = req.body.searchParam;
        let currentPage = req.body.currentPage;
        let itemsPerPage = req.body.itemsPerPage;
        author_1.default.find({ 'name': new RegExp(searchParam, 'i') })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .exec((err, authors) => {
            if (err) {
                console.log(err);
                res.status(500).send('Server error');
            }
            else {
                res.json(authors);
            }
        });
    }
    getTotalAuthorCount(req, res) {
        let searchParam = req.body.searchParam;
        author_1.default.countDocuments({ 'name': new RegExp(searchParam, 'i') }, (err, count) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error getting total books count');
            }
            else {
                res.json(count);
            }
        });
    }
    updateAuthor(req, res) {
        let author = req.body.author;
        let ObjectId = require('mongodb').ObjectId;
        let idAuthor = new ObjectId(author._id);
        author_1.default.collection.updateOne({ '_id': idAuthor }, {
            $set: {
                'key': author.key,
                'name': author.name,
                'bio': author.bio,
                'birth_date': author.birth_date,
                'death_date': author.death_date,
                'links': author.links,
                'coverData64': author.coverData64,
                'coverContentType64': author.coverContentType64
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error updating.' });
            }
            else {
                // update all the names in book.authors
                book_1.default.collection.updateMany({ "authors._id": idAuthor }, {
                    $set: {
                        "authors.$.key": author.key,
                        "authors.$.name": author.name,
                    }
                }, (err, bookUpdateResult) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ 'message': 'Error updating books.' });
                    }
                    else {
                        res.status(200).json({ 'message': 'updated' });
                        //console.log(bookUpdateResult);
                    }
                });
                //console.log(result);
            }
        });
    }
    insertAuthor(req, res) {
        let author = req.body.author;
        console.log(author);
        console.log(author.links);
        console.log(author.links[0].type);
        let newAuthor = new author_1.default({
            key: author.key,
            name: author.name,
            bio: author.bio,
            birth_date: author.birth_date,
            death_date: author.death_date,
            links: author.links,
            coverData64: author.coverData64,
            coverContentType64: author.coverContentType64
        });
        newAuthor.save().then(auth => {
            res.status(200).json({ 'message': 'inserted' });
        }).catch(err => {
            res.status(400).json({ 'message': 'error' });
        });
    }
    deleteAuthor(req, res) {
        let ObjectId = require('mongodb').ObjectId;
        let authorObjectId = new ObjectId(req.body.authorId);
        author_1.default.collection.deleteOne({ '_id': authorObjectId }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'An error occurred while trying to delete the author.' });
            }
            else {
                console.log(result);
                res.json({ message: 'deleted' });
            }
        });
    }
}
exports.AuthorController = AuthorController;
//# sourceMappingURL=author.controller.js.map