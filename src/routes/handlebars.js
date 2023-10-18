import { Router } from "express";
import { renderHomepage, renderLogin, renderMessages, renderRealTimeProducts, renderRegister } from "../controllers/handlebars.js";
import { authorization } from "../utils/messageErrors.js";

const routerHandlebars = Router();

//HBs
routerHandlebars.get('/home', authorization(['admin', 'user']), renderHomepage);
routerHandlebars.get('/realtimeproducts', authorization(['admin']), renderRealTimeProducts);
routerHandlebars.get('/messages', authorization(['admin', 'user']), renderMessages);
routerHandlebars.get('/login', renderLogin);
routerHandlebars.get('/register', renderRegister);

export default routerHandlebars;