import { authDao } from "../database/indexDb.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../config/generateToken.js"

class authController{
    static singUp = async(req,res)=>{
        const {username, email, password} = req.body;
        const founded = await authDao.getBy(email);
        if(founded){
            return res.status(400).json({message: "The information is already registered."})
        }
        try {
            const hash = await bcrypt.hash(password,10)
            const user = {
                username,
                email,
                password: hash
            }
            const created = await authDao.create(user)
            const newUser = {
                id: created._id,
                username: created.username,
                email: created.email
            }

            const token = generateToken(newUser)
            res.cookie("authToken", token)

            res.status(200).json({
            status: "success",
            message: "User registered successfully.",
            payload: newUser
            })
        } catch (error) {
            return res.status(500).json({message: error.message})
        }

    }
}

export {authController};
