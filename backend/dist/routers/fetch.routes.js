"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetch_controller_1 = require("../controllers/fetch.controller");
const fetchRouter = express_1.default.Router();
fetchRouter.route('/getPopularSciFiBooks').post((req, res) => new fetch_controller_1.FetchController().getPopularSciFiBooks(req, res));
exports.default = fetchRouter;
//# sourceMappingURL=fetch.routes.js.map