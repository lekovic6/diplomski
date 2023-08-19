import express from 'express'
import { AuthorController } from '../controllers/author.controller';

const authorRouter = express.Router();

authorRouter.route('/getAuthorById').post(
    (req, res) => new AuthorController().getAuthorById(req, res)
)

authorRouter.route('/searchAuthorByName').post(
    (req, res) => new AuthorController().searchAuthorByName(req, res)
)

authorRouter.route('/getTotalAuthorCount').post(
    (req, res) => new AuthorController().getTotalAuthorCount(req, res)
)

authorRouter.route('/updateAuthor').post(
    (req, res) => new AuthorController().updateAuthor(req, res)
)

authorRouter.route('/insertAuthor').post(
    (req, res) => new AuthorController().insertAuthor(req, res)
)

authorRouter.route('/deleteAuthor').post(
    (req, res) => new AuthorController().deleteAuthor(req, res)
)

export default authorRouter;