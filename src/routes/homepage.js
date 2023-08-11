import { Router } from "express";

const routerHome = Router();

//HOME PAGE
routerHome.get('/', async (req, res) => {
    res.status(200).send('Home Page');
});

//ERROR HANDLING
routerHome.get("*", (req, res) => {
    res.status(404).send("Error 404");
});

export default routerHome;