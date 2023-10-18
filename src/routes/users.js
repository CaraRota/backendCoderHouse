import { Router } from "express";
import passport from "passport";
import { registerUser } from "../controllers/users.js";

const routerUser = Router();

routerUser.post('/', passport.authenticate('register'), registerUser);

export default routerUser;