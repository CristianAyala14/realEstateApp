import {Router} from "express";
import { authController } from "../controllers/authController.js";
//middleware zod
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { singUpSchema, singInSchema } from "../config/zod.js";
import { validateRefreshToken } from "../middlewares/validateRefreshToken.js";
import { validateAccessToken } from "../middlewares/validateAccessToken.js";

const router = Router()
router.post("/singup", schemaValidator(singUpSchema),authController.singUp )
router.post("/singin", schemaValidator(singInSchema),authController.singIn )
router.get("/logout", authController.logout)
router.get("/refresh", validateRefreshToken, authController.refreshToken)
router.get("/rutaprotegida", validateAccessToken , authController.rutaProtegida)
export {router as authRouter};