import { userService } from "./services/userService.js";
import { listingService } from "./services/listingService.js";
export const userDao = new userService();
export const listingDao = new listingService();