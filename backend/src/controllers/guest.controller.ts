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


        })  

        newClient.save().then(user=>{
            res.status(200).json({'message':'user added'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'});
        });
    }

    registerAgency(req:express.Request, res:express.Response){
        let newAgency = new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            role:req.body.role,
            
            agencyName:req.body.agencyName,
            agencyAdress:req.body.agencyAdress,
            tid:req.body.tid,
            description:req.body.description,
            maxNumberOfWorkers:req.body.maxNumberOfWorkers,

            profilePicture:{
                data: req.body.base64Data,
                contentType: req.body.base64ContentType
            },

            verifiedByAdmin: false,
            declined:false
        })  

        newAgency.save().then(agency=>{
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

        User.findOne({'username':username, 'password':password, 'role':{$in: ['user']} }, (err, user)=>{
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