import { axiosCall } from "./axiosConfig";

export async function singUpReq(user){
    try {
        const response = await axiosCall.post("/auth/singup", user)
        return {status: response.status, data: response.data.message, user: response.data.payload};
    } catch (error) {
        if (error.response) {
            return {status: error.response.status, data: error.response.data.message};
        } else {
            throw error;
        }  
    }
}