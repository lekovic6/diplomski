"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    // for all - client, agency and admin
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    role: String,
    profilePicture: {
        data: String,
        contentType: String
    },
    // ne znam dal cu ovo da imam iskr
    verifiedByAdmin: Boolean,
    declined: Boolean
});
exports.default = mongoose_1.default.model("User", UserSchema, 'users');
//# sourceMappingURL=user.js.map