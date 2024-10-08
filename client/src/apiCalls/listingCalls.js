import { axiosWithAuth } from "./axiosConfig";


//auth reqs
export async function createListingReq(newListing){
    try {
        const response = await axiosWithAuth.post("/listing/create", newListing)
        return {status: response.status, data: response.data.message};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        //error no coneccion
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}


