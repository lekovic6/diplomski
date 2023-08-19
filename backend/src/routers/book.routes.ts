import express from 'express'
import { BookController } from '../controllers/book.controller';

const bookRouter = express.Router();

bookRouter.route('/getAllBooks').post(
    (req, res) => new BookController().getAllBooks(req, res)
)

bookRouter.route('/getBookById').post(
    (req, res) => new BookController().getBookById(req, res)
)

bookRouter.route('/getAllCategories').post(
    (req, res) => new BookController().getAllCategories(req, res)
)

bookRouter.route('/getCategoryShowName').post(
    (req, res) => new BookController().getCategoryShowName(req, res)
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

bookRouter.route('/searchBooksFromGenre').post(
    (req, res) => new BookController().searchBooksFromGenre(req, res)
)

bookRouter.route('/getTotalBooksCount').post(
    (req, res) => new BookController().getTotalBooksCount(req, res)
)

bookRouter.route('/getTotalBooksCountFromGenre').post(
    (req, res) => new BookController().getTotalBooksCountFromGenre(req, res)
)

bookRouter.route('/getAllBooksByAuthorsId').post(
    (req, res) => new BookController().getAllBooksByAuthorsId(req, res)
)

bookRouter.route('/updateBook').post(
    (req, res) => new BookController().updateBook(req, res)
)

bookRouter.route('/insertBook').post(
    (req, res) => new BookController().insertBook(req, res)
)

bookRouter.route('/deleteBook').post(
    (req, res) => new BookController().deleteBook(req, res)
)

bookRouter.route('/insertReview').post(
    (req, res) => new BookController().insertReview(req, res)
)

bookRouter.route('/updateReview').post(
    (req, res) => new BookController().updateReview(req, res)
)

bookRouter.route('/deleteReview').post(
    (req, res) => new BookController().deleteReview(req, res)
)

bookRouter.route('/getBooksWithPendingReviews').post(
    (req, res) => new BookController().getBooksWithPendingReviews(req, res)
)

bookRouter.route('/respondToReview').post(
    (req, res) => new BookController().respondToReview(req, res)
)


export default bookRouter;