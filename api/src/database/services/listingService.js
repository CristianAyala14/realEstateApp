import listingModel from "../models/listingModel.js";

class listingService{
  
    create = async(newListing)=>{
        const created = await listingModel.create(newListing);
        return created;
    } 

    
}

export {listingService};