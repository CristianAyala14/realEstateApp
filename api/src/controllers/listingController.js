import { listingDao } from "../database/indexDb.js";


class listingController{
    

    static create = async(req,res)=>{
        const newListing = req.body;
        try {
            const created = await listingDao.create(newListing)
            
            res.status(201).json({
                status: "success",
                message: "Listin created successfully.",
                newListingId: created._id
            })

        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}

export {listingController};
