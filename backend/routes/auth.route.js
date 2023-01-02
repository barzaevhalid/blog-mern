import {Router} from "express";

import {registerValidation, loginValidation} from "../validations/validations.js"
import checkAuth from "../utils/checkAuth.js";
import {register, login, getMe} from "../controllers/UserController.js";

const router = Router()


router.post("/auth/register", registerValidation, register);
router.post("/auth/login", loginValidation, login);
router.get("/auth/me", checkAuth, getMe);


export default router
