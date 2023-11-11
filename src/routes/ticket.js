import { Router } from "express";
import passport from "passport";
import { getTickets, generateTicket } from "../controllers/ticket.js";

const routerTicket = Router();

routerTicket.get('/', passport.authenticate('jwt', { session: false }), getTickets);
routerTicket.get('/create', passport.authenticate('jwt', { session: false }), generateTicket);

export default routerTicket;