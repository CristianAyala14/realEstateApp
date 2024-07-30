import userModel from "../models/userModel.js";

class authService{
    getBy = async(email)=>{
        const founded = await userModel.findOne({email});
        return founded;
    }

    create = async(user)=>{
        const created = await userModel.create(user);
        return created;
    } 
}

export {authService};
