import { listingDao } from "../database/indexDb.js";

class listingController {

    static create = async (req, res) => {
        const newListing = req.body;
        try {
            const created = await listingDao.create(newListing);
            if(!created){
                return res.status(404).json("Couldn't create the listing.")
            }
            return res.status(201).json({
                status: "success",
                message: "Listing created successfully.",
                newListingId: created._id
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static getListing = async (req, res) => {
        const id = req.params.id;

        try {
            const founded = await listingDao.getListing(id);
            if(!founded){
                return res.status(404).json("Couldn't get the listing.")
            }
            console.log(founded)
            const listing = {
                imageUrls: founded.imageUrls,
                name: founded.name,
                description: founded.description,
                address:founded.address,
                type:founded.type,
                bedrooms: founded.bedrooms,
                bathrooms:founded.bathrooms,
                regularPrice:founded.regularPrice,
                discountPrice:founded.discountPrice,
                offer:founded.offer,
                parking:founded.parking,
                furnished:founded.furnished,
                userRef: founded.userRef
            }
            return res.status(200).json({
                status: "success",
                listing: listing
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


    static getUserListings = async (req, res) => {
        const userId = req.user.id;

        // Validación del userId antes de continuar
        if (!userId) {
            return res.status(404).json("Couldn't get listings.");
        }

        try {
            const userListings = await listingDao.getUserListing(userId);
            
            if (!userListings || userListings.length === 0) {
                return res.status(404).json("No listings found.");
            }

            return res.status(200).json({
                status: "success",
                userListings: userListings
            });
        } catch (error) {
            return res.status(500).json("Internal server error.");
        }
    }

    static deleteUserListing = async (req, res) => {
        const userId = req.user.id;
        const listingId = req.params.id;

        try {
            const listing = await listingDao.getListing(listingId);

            if (!listing) {
                return res.status(404).json("Couldn't get listing.");
            }

            // Comparar userId con listing.userRef
            if (userId !== listing.userRef.toString()) {
                return res.status(403).json("You can only delete your own listings.");
            }

            const deleted = await listingDao.deleteListing(listingId);

            if (!deleted) {
                return res.status(404).json("Couldn't delete listing.");
            }

            return res.status(200).json({
                status: "success",
                message: "Listing deleted successfully."
            });
        } catch (error) {
            return res.status(500).json("Internal server error.");
        }
    }

    static editUserListing = async (req, res) => {
        const userId = req.user.id;
        const listingId = req.params.id;
        const updateData = req.body;

        try {
            const listing = await listingDao.getListing(listingId);

            if (!listing) {
                return res.status(404).json("Couldn't get listing.");
            }

            // Comparar userId con listing.userRef
            if (userId !== listing.userRef.toString()) {
                return res.status(403).json("You can only edit your own listings.");
            }

            const updated = await listingDao.updateListing(listing._id, updateData);

            if (!updated) {
                return res.status(404).json("Couldn't edit your listing.");
            }

            return res.status(200).json({
                status: "success",
                message: "Listing edited successfully.",
                updatedListingId: updated._id
            });
        } catch (error) {
            return res.status(500).json("Internal server error.");
        }
    }
}

export { listingController };