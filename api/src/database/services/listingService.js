import listingModel from "../models/listingModel.js";

class listingService{
  
    create = async(newListing)=>{
        const created = await listingModel.create(newListing);
        return created;
    } 
    getUserListing = async(userId)=>{
        const userListing = await listingModel.find({userRef:userId})
        return userListing;
    }

    
}

export {listingService};