import {Router} from "express";
import authRoute from "./auth.route.js";

const router = Router()
router.use(authRoute)


export default  router
