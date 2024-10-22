import {Router} from "express";
import { listingController } from "../controllers/listingController.js";
import { validateAccessToken } from "../middlewares/validateAccessToken.js";

const router = Router()
router.post("/create",validateAccessToken, listingController.create)
router.get("/userlisting", validateAccessToken, listingController.getUserListings)
router.get("/delete/:id", validateAccessToken, listingController.deleteUserListing)
router.post("/update/:id", validateAccessToken, listingController.editUserListing)
router.get("/get/:id", listingController.getListing) //we don't need to verify because a listing is public, everyone should see it, also in the main page.

export {router as listingRouter};