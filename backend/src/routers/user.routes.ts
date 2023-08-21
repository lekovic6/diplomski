import express from 'express'
import { UserController } from '../controllers/user.controller';


const userRouter = express.Router();

userRouter.route('/getAllAgencies').post(
    (req, res) => new UserController().getAllAgencies(req, res)
)

userRouter.route('/getAgencyByUsername').post(
    (req, res) => new UserController().getAgencyByUsername(req, res)
)

userRouter.route('/getUserByUsername').post(
    (req, res) => new UserController().getUserByUsername(req, res)
)

userRouter.route('/updateClientDetails').post(
    (req, res) => new UserController().updateClientDetails(req, res)
)

userRouter.route('/updateAgencyDetails').post(
    (req, res) => new UserController().updateAgencyDetails(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/getAllUsers').post(
    (req, res) => new UserController().getAllUsers(req, res)
)

userRouter.route('/deleteUser').post(
    (req, res) => new UserController().deleteUser(req, res)
)




userRouter.route('/addToFavouritesList').post(
    (req, res) => new UserController().addToFavouritesList(req, res)
)

userRouter.route('/removeFromFavouritesList').post(
    (req, res) => new UserController().removeFromFavouritesList(req, res)
)

userRouter.route('/updateUserDetails').post(
    (req, res) => new UserController().updateUserDetails(req, res)
)

userRouter.route('/searchUsers').post(
    (req, res) => new UserController().searchUsers(req, res)
)

userRouter.route('/getTotalUsersCount').post(
    (req, res) => new UserController().getTotalUsersCount(req, res)
)

userRouter.route('/setBlockFlag').post(
    (req, res) => new UserController().setBlockFlag(req, res)
)


export default userRouter;