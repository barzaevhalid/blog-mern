import {Router} from "express";

import {registerValidation, loginValidation} from "../validations/validations.js"
import checkAuth from "../utils/checkAuth.js";
import {register, login, getMe} from "../controllers/UserController.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

const router = Router()


router.post("/auth/register",  registerValidation, handleValidationErrors, register);
router.post("/auth/login",loginValidation, handleValidationErrors, login);
router.get("/auth/me", checkAuth, getMe);


export default router
