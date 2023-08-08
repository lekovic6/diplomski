"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/getAllAgencies').post((req, res) => new user_controller_1.UserController().getAllAgencies(req, res));
userRouter.route('/getAgencyByUsername').post((req, res) => new user_controller_1.UserController().getAgencyByUsername(req, res));
userRouter.route('/getClientByUsername').post((req, res) => new user_controller_1.UserController().getClientByUsername(req, res));
userRouter.route('/updateClientDetails').post((req, res) => new user_controller_1.UserController().updateClientDetails(req, res));
userRouter.route('/updateAgencyDetails').post((req, res) => new user_controller_1.UserController().updateAgencyDetails(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserController().changePassword(req, res));
userRouter.route('/getAllUsers').post((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/deleteUser').post((req, res) => new user_controller_1.UserController().deleteUser(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map