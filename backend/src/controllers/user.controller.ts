import * as express from 'express'
import User from '../models/user';

export class UserController {

    getAllAgencies(req:express.Request, res:express.Response){
        User.find({'role':'agency'}, (err, agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        });
    }

    getAgencyByUsername(req:express.Request, res:express.Response){
        let username = req.body.username;
        //console.log('username je', username );
        //console.log('usao sam u baaaaaaaaaaaacked');

        User.findOne({'username':username}, (err, agency)=>{
            if(err) console.log(err);
            else {
                //console.log('Retrieved agency:', agency);
                res.json(agency);
            }
        })
    }

    getUserByUsername(req:express.Request, res:express.Response){
        let username = req.body.username

        User.findOne({'username':username}, (err, user)=>{
            if(err) console.log(err);
            else {
                //console.log('Retrieved user:', user);
                res.json(user);
            }
        })
    }

    updateClientDetails(req:express.Request, res:express.Response){
        let clientUsername = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phoneNumber = req.body.phoneNumber;
        let profilePictureData = req.body.profilePictureData;
        let profilePictureContentType = req.body.profilePictureContentType;

        User.collection.updateOne({ 'username': clientUsername },{
                $set: {
                    'firstname': firstname,
                    'lastname': lastname,
                    'phoneNumber':phoneNumber,
                    'profilePicture.data': profilePictureData,
                    'profilePicture.contentType': profilePictureContentType
                }
            }, (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).json({ 'message': 'Error updating client.' });
                } else {
                  res.status(200).json({ 'message': 'update made' });
                }
              }
        );
    }

    updateAgencyDetails(req:express.Request, res:express.Response){
        let username = req.body.username;
        let agencyName = req.body.agencyName;
        let agencyAdress = req.body.agencyAdress;
        let tid = req.body.tid;
        let description = req.body.description;
        let profilePictureData = req.body.profilePictureData;
        let profilePictureContentType = req.body.profilePictureContentType

        User.collection.updateOne({ 'username': username },{
            $set: {
                'agencyName': agencyName,
                'agencyAdress': agencyAdress,
                'tid':tid,
                'description':description,
                'profilePicture.data': profilePictureData,
                'profilePicture.contentType': profilePictureContentType
            }
        }, (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ 'message': 'Error updating client.' });
            } else {
              res.status(200).json({ 'message': 'update made' });
            }
          }
        );
    }

   

    changePassword(req:express.Request, res:express.Response){
        let username = req.body.username;
        let newPassword = req.body.newPassword;

        User.collection.updateOne({ 'username': username },
            {
                $set: {
                    'password': newPassword,
                }
            }, (err, result) => {
                if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error in changing password.' });
                } else {
                res.status(200).json({ 'message': 'password changed' });
                }
            }
        );
    }


    getAllUsers(req:express.Request, res:express.Response){
        User.find({}, (err, users)=>{
            if (err) console.log(err)
            else res.json(users)
        })
    }


    deleteUser(req:express.Request, res:express.Response){
        let username = req.body.username;

        User.collection.deleteOne({ 'username': username }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'An error occurred while trying to delete the place.' });
            } else {
                console.log(result);
                res.json({ message: 'deleted' });
            }
        });
    }

    addToFavouritesList(req:express.Request, res:express.Response){
        let username = req.body.username;
        let bookId = req.body.bookId;

        //console.log(username);
        //console.log(bookId);


        User.collection.updateOne({ 'username': username },
            {
                $addToSet: {
                    'favouritesList': bookId,
                }
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Error in adding to favourites list.' });
                } else {
                    res.status(200).json({ 'message': 'updated' });   
                }
            }
        );
    }

    removeFromFavouritesList(req:express.Request, res:express.Response){
        let username = req.body.username;
        let bookId = req.body.bookId;
    
        User.collection.updateOne({ 'username': username },
            {
                $pull: {
                    'favouritesList': bookId
                }
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Error in removing from favourites list.' });
                } else {
                    res.status(200).json({ 'message': 'updated' });   
                }
            }
        );
    }

    updateUserDetails(req: express.Request, res: express.Response) {
        let user = req.body.user;
    
        User.collection.updateOne({ 'username': user.username },
            {
                $set: {
                    'firstname': user.firstname,
                    'lastname': user.lastname, // Fixed this line
                    'email': user.email,
                    'profilePicture': user.profilePicture
                }
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Error in updating user details.' }); // Changed error message
                } else {
                    res.status(200).json({ 'message': 'updated' });   
                }
            }
        );
    }
    
    searchUsers(req: express.Request, res: express.Response) {
        let searchParam = req.body.searchParam;
        let currentPage= req.body.currentPage;
        let itemsPerPage= req.body.itemsPerPage;

        User.find({ 'username': new RegExp(searchParam, 'i'), 'role':'user' })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage)
            .exec((err, books) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Server error');
                }
                else {
                    res.json(books);
                }
            });
    }

    getTotalUsersCount(req: express.Request, res: express.Response) {
        let searchParam = req.body.searchParam;

        User.countDocuments({ 'username': new RegExp(searchParam, 'i'), 'role':'user' }, (err, count) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error getting total users count');
            } else {
                res.json(count);
            }
        });
    }

    setBlockFlag(req: express.Request, res: express.Response) {
        let user = req.body.user;
        let blockedFlag = req.body.blockedFlag

        User.collection.updateOne({ 'username': user.username },
            {
                $set: {
                    'blocked': blockedFlag 
                }
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ 'message': 'Error in updating user details.' }); // Changed error message
                } else {
                    res.status(200).json({ 'message': 'updated' });   
                }
            }
        );
    }

}

