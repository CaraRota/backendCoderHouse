import { Router } from "express";
import passport from "passport";
import { currentJWTUser, githubSession, login, logout, register, registerGithub } from "../controllers/session.js";
import { passportError, authorization } from "../utils/messageErrors.js";
import 'dotenv/config'

//Error handling
import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { generateUserErrorInfo } from "../services/errors/info.js";

const routerSession = Router();

routerSession.post('/register', (req, res, next) => {
    const { first_name, last_name, email } = req.body;
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
}, passport.authenticate('register'), register);
routerSession.post('/login', passport.authenticate('login'), login);
routerSession.get('/current', passportError('jwt'), authorization(['user']), currentJWTUser);
routerSession.get('/github', passport.authenticate('github', { scope: ['user:email'] }), registerGithub);
routerSession.get('/githubSession', passport.authenticate('github'), githubSession);
routerSession.get('/logout', passport.authenticate('jwt', { session: false }), logout);

export default routerSession;
