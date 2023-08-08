import * as express from 'express'
import User from '../models/user';
import Book from '../models/book';
import Category from '../models/category';

export class BookController {

    getAllBooks(req:express.Request, res:express.Response){
        Book.find({}, (err, books)=>{
            if(err) console.log(err);
            else res.json(books);
        });
    }

    getAllCategories(req:express.Request, res:express.Response){
        Category.find({}, (err, categories)=>{
            if(err) console.log(err);
            else res.json(categories);
        });
    }

    getRandomBooks(req:express.Request, res:express.Response){
        let numberOfBooks = req.body.numberOfBooks;

        Book.aggregate([{ $sample: { size: numberOfBooks }}], (err, books)=>{
            if(err) console.log(err);
            else res.json(books);
        });

    }

    getAllBooksFromGenre(req:express.Request, res:express.Response){
        let genre = req.body.genre;

        Book.find({'genre':genre}, (err, books)=>{
            if(err) console.log(err);
            else res.json(books);
        });
    }

    searchBooks(req:express.Request, res:express.Response){
        let searchParam = req.body.searchParam;

        //PREPRAVI DA NADJE ONE CIJI TITLE SADRZI SEARCHPARAM

        Book.find( {'title':  searchParam  }, (err, books)=>{
            if(err) console.log(err);
            else res.json(books);
        });
    }


}

