import express from 'express'
import { GuestController } from '../controllers/guest.controller';

const guestRouter = express.Router();

guestRouter.route('/registerUser').post(
    (req, res) => new GuestController().registerUser(req, res)
)

guestRouter.route('/uniqueUsername').post(
    (req, res) => new GuestController().uniqueUsername(req, res)
)

guestRouter.route('/uniqueEmail').post(
    (req, res) => new GuestController().uniqueEmail(req, res)
)

guestRouter.route('/loginUser').post(
    (req, res) => new GuestController().loginUser(req, res)
)

guestRouter.route('/loginAdmin').post(
    (req, res) => new GuestController().loginAdmin(req, res)
)


export default guestRouter;