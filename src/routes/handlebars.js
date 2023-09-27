import { Router } from "express";
import 'dotenv/config'

const routerHandlebars = Router();

//Auth para admin
const authAdmin = (req, res, next) => {
    if (req.session.user.email == process.env.ADMIN_EMAIL) {
        return next() //Continua con la ejecucion normal de la ruta
    }
    return res.send("No tenes acceso a este contenido")
}

//Auth para usuarios logueados
const authUser = (req, res, next) => {
    if (req.session.user) {
        return next() //Continua con la ejecucion normal de la ruta
    }
    return res.send("No tenes acceso a este contenido")
}

//HBs
routerHandlebars.get('/home', authUser, (req, res) => {
    res.render('home', {
        rutaCSS: "home",
        rutaJS: "home",
        email: req.user.email,
        userRole: req.session.user.userRole
    });
});

routerHandlebars.get('/realtimeproducts', authAdmin, (req, res) => {
    res.render('realTimeProducts', {
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts"
    });
});

routerHandlebars.get('/messages', authUser, (req, res) => {
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