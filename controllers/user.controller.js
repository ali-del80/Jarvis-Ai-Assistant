import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { generateToken } from './userToken.controller.js';

const signUpController = async (req,res)=>{
    try {
        const {name , userName , password} = req.body;
        const isUser = await User.findOne({userName: userName.toLowerCase()})
        if(isUser){
            return res.status(400).json({success: false, message:"User Already Exist!"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name , userName , password:hashedPassword})
        const token = generateToken(user._id);
        res.cookie('token',token,{
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
        })
        return res.status(201).json({success: true,message: "Successflly User Register",token,user})
    } catch (error) {
        console.log(error.message)
        return res.statue(500).json({success: false , message: `Internal Server Error ${error}`})
    }
}

export default {
    signUpController
}
