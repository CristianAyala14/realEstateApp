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

    static getUserListings = async(req,res)=>{

        const userId = req.user.id;
        console.log(userId)
        
        try {
            const userListings = await listingDao.getUserListing(userId)
            res.status(200).json({
                status: "success",
                userListings: userListings
            })
        } catch (error) {
            res.status(500).json({"Internal server error."})
        }
    }
}

export {listingController};
