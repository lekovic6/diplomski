import * as express from 'express'
import Author from '../models/author';
import Book from '../models/book';

import { Types } from 'mongoose';

export class AuthorController {

    getAuthorById(req:express.Request, res:express.Response){
        let authorId = req.body.authorId;
        const mongoose = require('mongoose');
        let objectId = mongoose.Types.ObjectId(authorId);

        //console.log('Received body:', req.body);

        if (!authorId) {
            return res.status(400).json({ message: "authorId is required" });
        }

        Author.findOne({ '_id': objectId }, (err, author) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error fetching author" });
            }
    
            //console.log('Author:', author);

            if (author == null) {
                return res.status(404).json({ message: "Author not found" });
            }
    
            res.json(author);
        })
    }


    searchAuthorByName(req:express.Request, res:express.Response){
        let searchParam = req.body.searchParam;
        let currentPage = req.body.currentPage;
        let itemsPerPage = req.body.itemsPerPage;

        Author.find( { 'name': new RegExp(searchParam, 'i') })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .exec((err, authors)=>{
                if(err) {
                    console.log(err);
                    res.status(500).send('Server error');
                }
                else {
                    res.json(authors);
                }
            });
    }

    getTotalAuthorCount(req:express.Request, res:express.Response){
        let searchParam = req.body.searchParam;

        Author.countDocuments({'name': new RegExp(searchParam, 'i')}, (err, count) => {
            if(err) {
                console.log(err);
                res.status(500).send('Error getting total books count');
            } else {
                res.json(count);
            }
        });
    }



    updateAuthor(req:express.Request, res:express.Response){
        let author = req.body.author;
        let ObjectId = require('mongodb').ObjectId; 
        let idAuthor = new ObjectId(author._id);
        
        Author.collection.updateOne({ '_id': idAuthor },{
            $set: {
                'key': author.key,
                'name': author.name,
                'bio':author.bio,
                'birth_date':author.birth_date,
                'death_date': author.death_date,
                'links': author.links,
                'coverData64': author.coverData64,
                'coverContentType64': author.coverContentType64
            }
        }, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ 'message': 'Error updating.' });
            } else {

                // update all the names in book.authors
                Book.collection.updateMany(
                    { "authors._id": idAuthor },
                    {
                        $set: {
                            "authors.$.key": author.key,
                            "authors.$.name": author.name,
                        }
                    },
                    (err, bookUpdateResult) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ 'message': 'Error updating books.' });
                        } else {
                            res.status(200).json({ 'message': 'updated' });
                            //console.log(bookUpdateResult);
                        }
                    }
                );

              //console.log(result);
            }
          }
        );
    }

    insertAuthor(req:express.Request, res:express.Response){
        let author = req.body.author;

        console.log(author);
        console.log(author.links);
        console.log(author.links[0].type);
          
        let newAuthor = new Author({
            key:author.key,
            name:author.name,
            bio:author.bio,
            birth_date:author.birth_date,
            death_date:author.death_date,

            links: author.links,

            coverData64: author.coverData64,
            coverContentType64: author.coverContentType64
        })

        newAuthor.save().then(auth=>{
            res.status(200).json({'message':'inserted'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'});
        });
        
    }

    deleteAuthor(req:express.Request, res:express.Response){
        let ObjectId = require('mongodb').ObjectId; 
        let authorObjectId = new ObjectId(req.body.authorId);

        Author.collection.deleteOne({ '_id': authorObjectId }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'An error occurred while trying to delete the author.' });
            } else {
                console.log(result);
                res.json({ message: 'deleted' });
            }
        });

    }



}

