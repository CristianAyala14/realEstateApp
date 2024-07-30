import {Router} from "express";
import { authController } from "../controllers/authController.js";
//middleware zod
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { singUpSchema } from "../config/zod.js";

const router = Router()
router.post("/singup", schemaValidator(singUpSchema),authController.singUp )

export {router as authRouter};