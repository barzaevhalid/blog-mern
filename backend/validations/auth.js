import { body } from "express-validator"



export const registerValidation = [
    body("email", "Некорректный email").isEmail(),
    body("password", "Пароль слишком короткий ").isLength({min: 3}),
    body("fullName", "Имя слишком короткое").isLength({min: 3}),
    body("avatarUrl", "Не является url ссылкой").optional().isURL(),
]
