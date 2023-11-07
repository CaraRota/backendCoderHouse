import { Router } from "express";
import passport from "passport";
import { currentJWTUser, githubSessions, login, logout, register, registerGithub } from "../controllers/sessions.js";
import { passportError, authorization } from "../utils/messageErrors.js";
import 'dotenv/config'

const routerSession = Router();

routerSession.post('/register', passport.authenticate('register'), register);
routerSession.post('/login', passport.authenticate('login'), login);
routerSession.get('/current', passportError('jwt'), authorization('user'), currentJWTUser);
routerSession.get('/github', passport.authenticate('github', { scope: ['user:email'] }), registerGithub);
routerSession.get('/githubSessions', passport.authenticate('github'), githubSessions);
routerSession.get('/logout', logout);

export default routerSession;
