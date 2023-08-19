"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guest_controller_1 = require("../controllers/guest.controller");
const guestRouter = express_1.default.Router();
guestRouter.route('/registerClient').post((req, res) => new guest_controller_1.GuestController().registerClient(req, res));
guestRouter.route('/uniqueUsername').post((req, res) => new guest_controller_1.GuestController().uniqueUsername(req, res));
guestRouter.route('/uniqueEmail').post((req, res) => new guest_controller_1.GuestController().uniqueEmail(req, res));
guestRouter.route('/loginUser').post((req, res) => new guest_controller_1.GuestController().loginUser(req, res));
guestRouter.route('/loginAdmin').post((req, res) => new guest_controller_1.GuestController().loginAdmin(req, res));
exports.default = guestRouter;
//# sourceMappingURL=guest.routes.js.map