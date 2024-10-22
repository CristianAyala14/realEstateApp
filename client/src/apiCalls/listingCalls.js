import { axiosWithAuth } from "./axiosConfig";


//auth reqs
export async function createListingReq(newListing){
    try {
        const response = await axiosWithAuth.post("/listings/create", newListing)
        return {status: response.status, data: response.data.message, newListing: response.data.newListingId};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        //error no coneccion
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}

export async function getUserListingReq(){
    try {
        const response = await axiosWithAuth.get(`/listings/userlisting`)
        return {status: response.status, userListings: response.data.userListings};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        //error no coneccion
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}


