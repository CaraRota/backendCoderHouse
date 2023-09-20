import { Router } from "express";
import userModel from "../models/users.js";

const routerSession = Router();

routerSession.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (req.session.login) {
            res.status(400).send({ error: `Ya hay una sesión iniciada` });
            const user = await userModel.findOne({ email });

            if (user) {
                if (user.password === password) {
                    req.session.login = true;
                    req.session.email = email;
                    res.status(200).send({ resultado: 'OK', message: 'Sesión iniciada correctamente' });
                    res.redirect('/static/home', 200, { user: req.session.email });
                } else {
                    res.status(400).send({ error: `Contraseña incorrecta` });
                }
            } else {
                res.status(400).send({ error: `Usuario no encontrado` });
            }
        }
    }
    catch (error) {
        res.status(400).send({ error: `Error al iniciar sesión: ${error}` });
    }
});

routerSession.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    if (req.session.login) {
        res.status(400).send({ error: `Ya hay una sesión iniciada` });
    }

    try {
        const response = await userModel.create({
            first_name,
            last_name,
            email,
            password,
            age
        })
        res.status(200).send({ mensaje: 'Usuario creado', respuesta: response })
        res.redirect('/static/home', 200, { mensaje: 'Usuario creado', respuesta: first_name });
    }
    catch (error) {
        res.status(400).send({ error: `Error al crear usuario: ${error}` });
    }
});

routerSession.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    res.status(200).send({ resultado: 'Has cerrado sesion' })
    res.redirect('/static/home');
})

export default routerSession;
