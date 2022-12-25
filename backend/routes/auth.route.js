import {Router} from "express";

import {registerValidation} from "../validations/auth.js"
import checkAuth from "../utils/checkAuth.js";
import {register, login, getMe} from "../controllers/UserController.js";

const router = Router()


router.post("/auth/register", registerValidation, register);
router.post("/auth/login", login);
router.get("/auth/me", checkAuth, getMe);


export default router
