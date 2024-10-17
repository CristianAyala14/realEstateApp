import {Router} from "express";
import { listingController } from "../controllers/listingController.js";
import { validateAccessToken } from "../middlewares/validateAccessToken.js";

const router = Router()
router.post("/create",validateAccessToken, listingController.create)
router.get("/:id", validateAccessToken, listingController.getUserListings)

export {router as listingRouter};