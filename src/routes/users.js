import { Router } from "express";
import passport from "passport";
import { registerUser } from "../controllers/users.js";

//Error handling
import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { generateUserErrorInfo } from "../services/errors/info.js";

const routerUser = Router();

routerUser.post('/', (req, res, next) => {
    const { first_name, last_name, email, age } = req.body
    try {
        if (!last_name || !first_name || !email) {
            CustomError.createError({
                name: "User creation error",
                cause: generateUserErrorInfo({ first_name, last_name, email }),
                message: "One or more properties were incomplete or not valid.",
                code: EErrors.INVALID_USER_ERROR
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}, passport.authenticate('register'), registerUser);

export default routerUser;