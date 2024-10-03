import bcrypt from "bcryptjs";
import { userDao } from "../database/indexDb.js";
import {genAccessToken, genRefreshToken } from "../config/generateToken.js"

class userController{
    static updateUser = async(req,res)=>{
        console.log(req.body)
        
        try {
            if(req.body.password){
                const hash = await bcrypt.hash(req.body.password,10)
                req.body.password = hash
            }
            const updated = await userDao.update(req.user.id, req.body)

            //auth token
            const newUserAuthToken = {
                id: updated._id,
                userName: updated.userName,
                email: updated.email
            }
            const accessToken = genAccessToken(newUserAuthToken)
            const refreshToken = genRefreshToken(newUserAuthToken)

            res.cookie("refreshToken", "", {httpOnly: true, secure: true, sameSite: 'Strict', path: "/api/auth/refresh", expires: new Date(0)})
            res.cookie("refreshToken", refreshToken, {httpOnly: true, secure: true, sameSite: 'Strict', path: "/api/auth/refresh"})

             //payload
            const user = {
                id: updated._id,
                userName: updated.userName,
                email: updated.email,
                profileImage: updated.profileImage
            }
            console.log(user)
            res.status(200).json({
                status: "success",
                message: "User updated successfully.",
                payload: user,
                accessToken: accessToken
            })

        } catch (error) {
            return res.status(500).json({message: error.message})
        }

        

    }

    static deleteUser = async(req,res)=>{
        
        try {
            
            const deleted = await userDao.delete(req.user.id)
            res.cookie("refreshToken", "", {httpOnly: true, secure: true, sameSite: 'Strict', path: "/api/auth/refresh", expires: new Date(0)})

            res.status(200).json({
                status: "success",
                message: "User has been deleted.",
            })

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

export {userController};
