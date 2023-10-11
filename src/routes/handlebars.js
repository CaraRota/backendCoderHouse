import { Router } from "express";
import { authorization } from "../utils/messageErrors.js";
import 'dotenv/config'

const routerHandlebars = Router();

//HBs
routerHandlebars.get('/home', authorization(['admin', 'user']), (req, res) => {
    res.render('home', {
        rutaCSS: "home",
        rutaJS: "home",
        email: req.user.email,
        userRole: req.user.role
    });
});

routerHandlebars.get('/realtimeproducts', authorization(['admin']), (req, res) => {
    res.render('realTimeProducts', {
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    });
});

routerHandlebars.get('/messages', authorization(['admin', 'user']), (req, res) => {
    res.render('messages', {
        rutaCSS: "messages",
        rutaJS: "messages"
    });
});

routerHandlebars.get('/login', (req, res) => {
    res.render('login', {
        rutaCSS: "login",
        rutaJS: "login",
    });
});

routerHandlebars.get('/register', (req, res) => {
    res.render('register', {
        rutaCSS: "register",
        rutaJS: "register"
    });
});

export default routerHandlebars;