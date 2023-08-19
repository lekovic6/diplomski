"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const LinkSchema = new Schema({
    title: String,
    url: String,
    type: {
        key: String
    }
});
const AuthorSchema = new Schema({
    key: String,
    name: String,
    bio: String,
    birth_date: String,
    death_date: String,
    links: [LinkSchema],
    coverData64: String,
    coverContentType64: String,
});
exports.default = mongoose_1.default.model("Author", AuthorSchema, 'authors');
//# sourceMappingURL=author.js.map