import { Router } from "express";
import passport from "passport";
import { passwordRecovery, registerUser, resetPassword, deleteUser, getUsers } from "../controllers/users.js";

const routerUser = Router();

routerUser.get('/', passport.authenticate('jwt', { session: false }), getUsers);
routerUser.post('/', passport.authenticate('register'), registerUser);
routerUser.post('/password-recovery', passwordRecovery);
routerUser.post('/reset-password/:token', resetPassword);

//Added for testing purposes
routerUser.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

export default routerUser;