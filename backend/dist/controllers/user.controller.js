"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    getAllAgencies(req, res) {
        user_1.default.find({ 'role': 'agency' }, (err, agencies) => {
            if (err)
                console.log(err);
            else
                res.json(agencies);
        });
    }
    getAgencyByUsername(req, res) {
        let username = req.body.username;
        //console.log('username je', username );
        //console.log('usao sam u baaaaaaaaaaaacked');
        user_1.default.findOne({ 'username': username }, (err, agency) => {
            if (err)
                console.log(err);
            else {
                //console.log('Retrieved agency:', agency);
                res.json(agency);
            }
        });
    }
    getUserByUsername(req, res) {
        let username = req.body.username;
        user_1.default.findOne({ 'username': username }, (err, user) => {
            if (err)
                console.log(err);
            else {
                //console.log('Retrieved user:', user);
                res.json(user);
            }
        });
    }
    updateClientDetails(req, res) {
        let clientUsername = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phoneNumber = req.body.phoneNumber;
        let profilePictureData = req.body.profilePictureData;
        let profilePictureContentType = req.body.profilePictureContentType;
        user_1.default.collection.updateOne({ 'username': clientUsername }, {
            $set: {
                'firstname': firstname,
                'lastname': lastname,
                'phoneNumber': phoneNumber,
                'profilePicture.data': profilePictureData,
                'profilePicture.contentType': profilePictureContentType
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error updating client.' });
            }
            else {
                res.status(200).json({ 'message': 'update made' });
            }
        });
    }
    updateAgencyDetails(req, res) {
        let username = req.body.username;
        let agencyName = req.body.agencyName;
        let agencyAdress = req.body.agencyAdress;
        let tid = req.body.tid;
        let description = req.body.description;
        let profilePictureData = req.body.profilePictureData;
        let profilePictureContentType = req.body.profilePictureContentType;
        user_1.default.collection.updateOne({ 'username': username }, {
            $set: {
                'agencyName': agencyName,
                'agencyAdress': agencyAdress,
                'tid': tid,
                'description': description,
                'profilePicture.data': profilePictureData,
                'profilePicture.contentType': profilePictureContentType
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error updating client.' });
            }
            else {
                res.status(200).json({ 'message': 'update made' });
            }
        });
    }
    changePassword(req, res) {
        let username = req.body.username;
        let newPassword = req.body.newPassword;
        user_1.default.collection.updateOne({ 'username': username }, {
            $set: {
                'password': newPassword,
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error in changing password.' });
            }
            else {
                res.status(200).json({ 'message': 'password changed' });
            }
        });
    }
    getAllUsers(req, res) {
        user_1.default.find({}, (err, users) => {
            if (err)
                console.log(err);
            else
                res.json(users);
        });
    }
    deleteUser(req, res) {
        let username = req.body.username;
        user_1.default.collection.deleteOne({ 'username': username }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'An error occurred while trying to delete the place.' });
            }
            else {
                console.log(result);
                res.json({ message: 'deleted' });
            }
        });
    }
    addToFavouritesList(req, res) {
        let username = req.body.username;
        let bookId = req.body.bookId;
        //console.log(username);
        //console.log(bookId);
        user_1.default.collection.updateOne({ 'username': username }, {
            $addToSet: {
                'favouritesList': bookId,
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error in adding to favourites list.' });
            }
            else {
                res.status(200).json({ 'message': 'updated' });
            }
        });
    }
    removeFromFavouritesList(req, res) {
        let username = req.body.username;
        let bookId = req.body.bookId;
        user_1.default.collection.updateOne({ 'username': username }, {
            $pull: {
                'favouritesList': bookId
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error in removing from favourites list.' });
            }
            else {
                res.status(200).json({ 'message': 'updated' });
            }
        });
    }
    updateUserDetails(req, res) {
        let user = req.body.user;
        user_1.default.collection.updateOne({ 'username': user.username }, {
            $set: {
                'firstname': user.firstname,
                'lastname': user.lastname,
                'email': user.email,
                'profilePicture': user.profilePicture
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error in updating user details.' }); // Changed error message
            }
            else {
                res.status(200).json({ 'message': 'updated' });
            }
        });
    }
    searchUsers(req, res) {
        let searchParam = req.body.searchParam;
        let currentPage = req.body.currentPage;
        let itemsPerPage = req.body.itemsPerPage;
        user_1.default.find({ 'username': new RegExp(searchParam, 'i'), 'role': 'user' })
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
    getTotalUsersCount(req, res) {
        let searchParam = req.body.searchParam;
        user_1.default.countDocuments({ 'username': new RegExp(searchParam, 'i'), 'role': 'user' }, (err, count) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error getting total users count');
            }
            else {
                res.json(count);
            }
        });
    }
    setBlockFlag(req, res) {
        let user = req.body.user;
        let blockedFlag = req.body.blockedFlag;
        user_1.default.collection.updateOne({ 'username': user.username }, {
            $set: {
                'blocked': blockedFlag
            }
        }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'Error in updating user details.' }); // Changed error message
            }
            else {
                res.status(200).json({ 'message': 'updated' });
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map