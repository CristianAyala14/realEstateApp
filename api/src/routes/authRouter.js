import {Router} from "express";
import { authController } from "../controllers/authController.js";
//middleware zod
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { singUpSchema, singInSchema } from "../config/zod.js";

const router = Router()
router.post("/singup", schemaValidator(singUpSchema),authController.singUp )
router.post("/singin", schemaValidator(singInSchema),authController.singIn )

export {router as authRouter};