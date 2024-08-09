import { authDao } from "../database/indexDb.js";
import bcrypt from "bcryptjs";
import {genAccessToken, genRefreshToken } from "../config/generateToken.js"

class authController{
    static singUp = async(req,res)=>{
        const {userName, email, password} = req.body;
        
        try {
            const founded = await authDao.getBy(email);
            if(founded){
                return res.status(400).json({message: "The user is already registered."})
            }
            const hash = await bcrypt.hash(password,10)
            const newUser = {
                userName,
                email,
                password: hash
            }
            const created = await authDao.create(newUser)
 
            const user = {
                id: created._id,
                userName: created.userName,
                email: created.email
            }

            const accessToken = genAccessToken(user)
            const refreshToken = genRefreshToken(user)
            

            res.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true, sameSite: 'Lax', path: "/auth/refresh"})

            res.status(200).json({
            status: "success",
            message: "User registered successfully.",
            payload: user,
            accessToken: accessToken
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error.message})
        }

    }
    static singIn = async(req,res)=>{
        const {email, password} = req.body;
        
        try {
            const validUser = await authDao.getBy(email)
            if(!validUser){
            return res.status(400).json({message: "Invalid email."})
            }
            const validPassword = await bcrypt.compare(password, validUser.password)
            if(!validPassword){
                return res.status(400).json({message: "Invalid password."})
            }

            const user = {
                id: validUser._id,
                userName: validUser.userName,
                email: validUser.email
            }

            const accessToken = genAccessToken(user)
            const refreshToken = genRefreshToken(user)

            res.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true, sameSite: 'Lax', path: "/auth/refresh"})


            res.status(200).json({
                status: "success",
                message: "Logged in succesfully.",
                payload: user,
                accessToken: accessToken
            })

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    static refreshToken = async(req,res)=>{
        const email = req.user.email

        try {
            const userFounded = await authDao.getBy(email)
            if(!userFounded) return res.status(401).json({message: "Invalid information. Cannot access."})

            const user = {
                id: userFounded._id,
                userName: userFounded.userName,
                email: userFounded.email
            }

            const newAccessToken = genAccessToken(user)

            res.status(200).json({
                status: "success",
                message: "New access token generated.",
                payload: user,
                accessToken: newAccessToken
            })

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }


}

export {authController};
