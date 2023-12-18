import { generateToken } from "../utils/jwt.js";
import logger from "../utils/loggers.js";

export const register = async (req, res) => {    
    try {
        if (!req.user) {
            res.status(401).send({ error: `Error al registrar usuario` });
        }
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role
        }
        res.status(200).send({ payload: req.user })
    }
    catch (error) {
        logger.error(`Error al registrar usuario: ${error}`);
        res.status(500).send({ mensaje: `Error al registrar usuario ${error}` });
    }
}

export const login = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ mensaje: "Invalidate user" })
        }

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        const token = generateToken(req.user)
        res.cookie('jwtCookie', token, {
            maxAge: 43200000
        })
        res.status(200).send({ payload: req.user })
    } catch (error) {
        logger.error(`Error al iniciar sesion: ${error}`);
        res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` })
    }
}

export const logout = async (req, res) => {
    if (req.session.user) {
        try {
            req.session.destroy()
            res.status(200).send({ resultado: 'Has cerrado sesion' })
            // res.redirect('/static/login');
        }
        catch (error) {
            res.status(400).send({ error: `Error al cerrar sesion: ${error}` });
        }
    } else {
        res.status(400).send({ error: `No hay sesion iniciada` });
    }
}

export const registerGithub = async (req, res) => {
    res.status(200).send({ mensaje: 'Usuario creado' })
}

export const githubSession = async (req, res) => {
    req.session.user = req.user
    res.redirect('/static/home'); //Redirigimos al usuario a home una vez inicia sesion correctamente
    // res.status(200).send({ mensaje: 'Sesion creada' })
}

export const currentJWTUser = async (req, res) => {
    res.status(200).send({ mensaje: req.user })
}