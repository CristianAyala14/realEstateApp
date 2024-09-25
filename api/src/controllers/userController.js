import bcrypt from "bcryptjs";
import { userDao } from "../database/indexDb.js";

class userController{
    static updateUser = async(req,res)=>{
        
        console.log(req.body)
        
        try {
            if(req.body.password){
                const hash = await bcrypt.hash(req.body.password,10)
                req.body.password = hash
            }
            const updated = await userDao.update(req.user.id, req.body)
            console.log(updated)
            res.status(200).json({
                status: "success",
                message: "User updated successfully.",
            })
        } catch (error) {
            return res.status(500).json({message: error.message})
        }

        

    }
}

export {userController};
