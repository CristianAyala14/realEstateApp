import { authDao } from "../database/indexDb.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../config/generateToken.js"

class authController{
    static singUp = async(req,res)=>{
        const {username, email, password} = req.body;
        
        try {
            const founded = await authDao.getBy(email);
            if(founded){
                return res.status(400).json({message: "The user is already registered."})
            }
            const hash = await bcrypt.hash(password,10)
            const newUser = {
                username,
                email,
                password: hash
            }
            const created = await authDao.create(newUser)

            const user = {
                id: created._id,
                username: created.username,
                email: created.email
            }

            const token = generateToken(user)
            res.cookie("authToken", token, {httpOnly: true, secure: true, sameSite: 'Strict'})

            res.status(200).json({
            status: "success",
            message: "User registered successfully.",
            payload: user
            })
        } catch (error) {
            return res.status(500).json({message: error.message})
        }

    }
    static singIn = async(req,res)=>{
        const {email, password} = req.body;
        
        try {
            const validUser = await authDao.getBy(email)
            if(!validUser){
            return res.status(400).json({message: "The email is not registered."})
            }
            const validPassword = await bcrypt.compare(password, validUser.password)
            if(!validPassword){
                return res.status(400).json({message: "Invalid password."})
            }

            const user = {
                id: validUser._id,
                username: validUser.username,
                email: validUser.email
            }
            const token = generateToken(user)
            res.cookie("authToken", token, {httpOnly: true, secure: true, sameSite: 'Strict'})
            res.status(200).json({
                status: "success",
                message: "Logged in succesfully.",
                payload: user
            })

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

export {authController};
