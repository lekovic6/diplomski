import express from 'express'
import { BookController } from '../controllers/book.controller';

const bookRouter = express.Router();

bookRouter.route('/getAllBooks').post(
    (req, res) => new BookController().getAllBooks(req, res)
)

bookRouter.route('/getAllCategories').post(
    (req, res) => new BookController().getAllCategories(req, res)
)

bookRouter.route('/getRandomBooks').post(
    (req, res) => new BookController().getRandomBooks(req, res)
)

bookRouter.route('/getAllBooksFromGenre').post(
    (req, res) => new BookController().getAllBooksFromGenre(req, res)
)

bookRouter.route('/searchBooks').post(
    (req, res) => new BookController().searchBooks(req, res)
)
export default bookRouter;