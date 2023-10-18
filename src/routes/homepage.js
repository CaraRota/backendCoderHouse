import { Router } from "express";

const routerHome = Router();

//HOME PAGE
routerHome.get('/', async (req, res) => {
    try {
        res.status(200).redirect('/static/login');
    } catch (error) {
        res.status(400).send({ error: `Error en login: ${error}` });
    }
});

//ERROR HANDLING
routerHome.get("*", (req, res) => {
    res.status(404).send("Error 404 - Pagina no encontrada");
});

export default routerHome;