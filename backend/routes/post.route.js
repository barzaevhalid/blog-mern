import {Router} from "express";
import {create, getAll, getLastTags, getOne, remove, update} from "../controllers/PostController.js";
import checkAuth from "../utils/checkAuth.js";
import {postCreateValidation} from "../validations/validations.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
const router = Router()

router.get("/tags", getLastTags)

router.get("/posts", getAll)
router.get("/posts/:id", getOne);
router.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, create);
router.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, update)
router.delete("/posts/:id", checkAuth, remove)
export default router
