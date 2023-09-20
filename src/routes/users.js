import { Router } from "express";
import userModel from "../models/users.js";

const routerUser = Router();

routerUser.post('/', async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        const response = await userModel.create({
            first_name,
            last_name,
            email,
            password,
            age
        })
        res.status(200).send({ mensaje: 'Usuario creado', respuesta: response })
        // res.redirect('/static/home', 200, { mensaje: 'Usuario creado', respuesta: first_name });
    }
    catch (error) {
        res.status(400).send({ error: `Error al crear usuario: ${error}` });
    }
});

export default routerUser;