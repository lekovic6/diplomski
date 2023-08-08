import express from 'express'
import { UserController } from '../controllers/user.controller';


const userRouter = express.Router();

userRouter.route('/getAllAgencies').post(
    (req, res) => new UserController().getAllAgencies(req, res)
)

userRouter.route('/getAgencyByUsername').post(
    (req, res) => new UserController().getAgencyByUsername(req, res)
)

userRouter.route('/getClientByUsername').post(
    (req, res) => new UserController().getClientByUsername(req, res)
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



export default userRouter;