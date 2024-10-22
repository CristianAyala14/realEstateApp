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
    getListing = async(id)=>{
        const listing = await listingModel.findById(id)
        return listing;
    }
    deleteListing = async(id)=>{
        const deleted = await listingModel.findByIdAndDelete(id);
        return deleted;
    }

    updateListing = async(id, updateData)=>{
        const updated = await listingModel.findByIdAndUpdate(id, updateData, {new:true})
        return updated;
    }

    
}

export {listingService};