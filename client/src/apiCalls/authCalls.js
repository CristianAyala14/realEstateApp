import { axiosCall, axiosWithAuth } from "./axiosConfig";


//auth reqs
export async function singUpReq(user){
    try {
        const response = await axiosCall.post("/auth/singup", user)
        return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
    } catch (error) {
        console.log(error)
        //si viene error de servidor (axios hace que salte por este catch tanto si es error de servidor como si es de no coneccion)
        //entonces hay que entender que objeto viene para desestructurarlo y enviarlo al front end prolijamente.
        //eror servidor?
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        //error no coneccion
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}

export async function singInReq(user){
    try {
        const response = await axiosCall.post("/auth/singin", user)
        return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}
export async function logOutReq(){
    try {
        const response = await axiosCall.get("/auth/logout")
        return {status: response.status, data: response.data.message, user: response.data.payload};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}

export async function refreshTokenReq(){
    try {
        const response = await axiosCall.get("/auth/refresh")
        return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}


export async function updateUserReq(id, updateUser){
    try {
        const response = await axiosWithAuth.post(`/user/update/${id}`, updateUser)
        return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}
