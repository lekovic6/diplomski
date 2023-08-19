import * as express from 'express'
import User from '../models/user';

export class GuestController {

    registerClient(req:express.Request, res:express.Response){
        let newClient = new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            role:req.body.role,
            
            firstname:req.body.firstname,
            lastname:req.body.lastname,

            profilePicture:{
                data: req.body.base64Data,
                contentType: req.body.base64ContentType
            },

            favouritesList: req.body.favouritesList,
        })  

        newClient.save().then(user=>{
            res.status(200).json({'message':'user added'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'});
        });
    }

    uniqueUsername(req:express.Request, res:express.Response){
        let newUsername = req.body.username;
        User.collection.findOne({'username':newUsername}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    uniqueEmail(req:express.Request, res:express.Response){
        let newEmail = req.body.email;
        User.collection.findOne({'email':newEmail}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    loginUser(req:express.Request, res:express.Response){
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({'username':username, 'password':password, 'role':'user' }, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    loginAdmin(req:express.Request, res:express.Response){
        let username = req.body.username;
        let password = req.body.password;
        
        User.findOne({'username':username, 'password':password, 'role':'admin'}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }
    
    

}