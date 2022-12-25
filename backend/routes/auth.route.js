import {Router} from "express";
import UserModel from '../models/User.js'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import {validationResult} from "express-validator";
import {registerValidation} from "../validations/auth.js"

const router = Router()


router.post("/auth/register", registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    const {password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await  bcrypt.hash(password, salt)

    const document  = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    })

    const user = await document.save();
    res.json(user)
} )


export default router
