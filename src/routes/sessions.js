import { Router } from "express";
import userModel from "../models/users.js";

const routerSession = Router();

routerSession.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        if (req.session.login)
            res.status(200).send({ resultado: 'Login ya existente' })
        const user = await userModel.findOne({ email: email })

        if (user) {
            if (user.password == password) {
                req.session.login = true
                req.session.email = user.email
                res.status(200).send({ resultado: 'Login valido', message: user })
                //res.redirect('ruta', 200, {'info': user}) Redireccion
            } else {
                res.status(401).send({ resultado: 'Unauthorized', message: user })
            }
        } else {
            res.status(404).send({ resultado: 'Not Found', message: user })
        }
    } catch (error) {
        res.status(400).send({ error: `Error en login: ${error}` })
    }
})

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
        // res.redirect('/static/home', 200, { mensaje: 'Usuario creado', respuesta: first_name });
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
    // res.redirect('/static/login');
})

export default routerSession;
