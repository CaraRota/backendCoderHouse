import { Router } from "express";
import passport from "passport";
import { authorization } from "../utils/messageErrors.js";
import { passwordRecovery, registerUser, resetPassword, deleteUser, getUsers, uploadDocuments } from "../controllers/users.js";
import { upload } from "../config/config.js";

const routerUser = Router();

routerUser.get('/', passport.authenticate('jwt', { session: false }), getUsers);
routerUser.post('/', passport.authenticate('register'), registerUser);
routerUser.post('/password-recovery', passwordRecovery);
routerUser.post('/reset-password/:token', resetPassword);
routerUser.post('/:id/documents', passport.authenticate('jwt', { session: false }), authorization(['user']), upload.fields([{ name: 'documents' }]), uploadDocuments);

//Added for testing purposes
routerUser.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

export default routerUser;