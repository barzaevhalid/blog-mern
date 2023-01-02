import {Router} from "express";
import {create, getAll, getOne, remove, update} from "../controllers/PostController.js";
import checkAuth from "../utils/checkAuth.js";
import {postCreateValidation} from "../validations/validations.js";
const router = Router()

router.post("/posts", checkAuth, postCreateValidation, create);
router.get("/posts", getAll)
router.get("/posts/:id", getOne);
router.patch("/posts/:id", checkAuth, update)
router.delete("/posts/:id", checkAuth, remove)
export default router
