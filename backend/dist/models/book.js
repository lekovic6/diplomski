"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BookSchema = new Schema({
    openlibrary_work: String,
    isbn: String,
    title: String,
    authors: [
        {
            _id: mongoose_1.default.Schema.Types.ObjectId,
            name: String,
            key: String
        }
    ],
    description: String,
    genre: String,
    first_publish_year: Number,
    cover_id: Number,
    coverData64: String,
    coverContentType64: String,
    reviews: [
        {
            username: String,
            rating: Number,
            comment: String,
            pending: Boolean,
            accepted: Boolean,
            declined: Boolean,
        }
    ]
});
exports.default = mongoose_1.default.model("Book", BookSchema, 'books');
//# sourceMappingURL=book.js.map