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
    getClientByUsername(req, res) {
        let clientUsername = req.body.username;
        user_1.default.findOne({ 'username': clientUsername }, (err, user) => {
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
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map