import { Router } from "express";
import passport from "passport";
import { passwordRecovery, registerUser, resetPassword } from "../controllers/users.js";

const routerUser = Router();

routerUser.post('/', passport.authenticate('register'), registerUser);
routerUser.post('/password-recovery', passwordRecovery);
routerUser.post('/reset-password/:token', resetPassword);

export default routerUser;