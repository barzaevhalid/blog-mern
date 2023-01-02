import {Router} from "express";
import authRoute from "./auth.route.js";
import postRoute from "./post.route.js";

const router = Router()
router.use(authRoute)
router.use(postRoute)


export default  router
