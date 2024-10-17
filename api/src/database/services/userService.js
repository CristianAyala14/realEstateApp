import userModel from "../models/userModel.js";

class userService{
    getBy = async(email)=>{
        const founded = await userModel.findOne({email});
        return founded;
    }

    create = async(user)=>{
        const created = await userModel.create(user);
        return created;
    } 

    update = async(id, updateUser)=>{
        const updated = await userModel.findByIdAndUpdate(id, {
            $set:{
                userName: updateUser.userName,
                email: updateUser.email,
                password: updateUser.password,
                profileImage: updateUser.profileImage
            }
        }, {new:true})

        return updated;

    }

    delete = async(id)=>{
        const deleted = await userModel.findByIdAndDelete(id)
        return deleted;
    }

   
}

export {userService};
