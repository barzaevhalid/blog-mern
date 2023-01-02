import { body } from "express-validator"



export const loginValidation = [
    body("email", "Некорректный email").isEmail(),
    body("password", "Пароль слишком короткий").isLength({min: 3}),
];
export const registerValidation = [
    body("email", "Некорректный email").isEmail(),
    body("password", "Пароль слишком короткий ").isLength({min: 3}),
    body("fullName", "Имя слишком короткое").isLength({min: 3}),
    body("avatarUrl", "Не является url ссылкой").optional().isURL(),
];

export const postCreateValidation = [
    body("title", "Введите заголовок статьи").isLength({min: 3}).isString(),
    body("text", "Введите текст статьи").isLength({min: 5}).isString(),
    body("tags", "Неверный формат тэгов").optional().isArray(),
    body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
