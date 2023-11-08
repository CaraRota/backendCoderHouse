import { Router } from "express";
import passport from "passport";
import { currentJWTUser, githubSessions, login, logout, register, registerGithub } from "../controllers/sessions.js";
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
routerSession.get('/githubSessions', passport.authenticate('github'), githubSessions);
routerSession.get('/logout', logout);

export default routerSession;
