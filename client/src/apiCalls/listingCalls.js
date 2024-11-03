import { axiosWithAuth , axiosCall} from "./axiosConfig";


//auth reqs
export async function createListingReq(newListing){
    try {
        const response = await axiosWithAuth.post("/listings/create", newListing)
        return {status: response.status, data: response.data.message, newListingId: response.data.newListingId};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        //error no coneccion
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}

export async function getListingReq(id){
    try {
        const response = await axiosCall.get(`/listings/get/${id}`)
        return {status: response.status, listing: response.data.listing};
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

export async function deleteUserListingReq(id){
    try {
        const response = await axiosWithAuth.get(`/listings/delete/${id}`)
        return {status: response.status, message: response.data.message};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        //error no coneccion
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}

export async function updateUserListingReq(listingId,updateData){
    try {
        const response = await axiosWithAuth.post(`/listings/update/${listingId}`, updateData)
        console.log(response)
        return {status: response.status, message: response.data.message, updatedListingId: response.data.updatedListingId};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        //error no coneccion
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}


