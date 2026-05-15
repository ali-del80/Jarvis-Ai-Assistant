import express from 'express'
import userController from '../controllers/user.controller.js';
const authRouter = express.Router();

authRouter.route('/register').post(userController.signUpController);

export default authRouter