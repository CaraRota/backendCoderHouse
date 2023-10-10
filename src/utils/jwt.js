import 'dotenv/config'
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.JWTSECRET, { expiresIn: '12h' });
    return token;
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        req.status(401).send("Usuario no autenticado");
    }
    const token = authHeader.split(' ')[1];

    jwt.sign(token, process.env.JWTSECRET, (err, user) => {
        if (err) {
            req.status(403).send("Token no valido");
        }
        req.user = user;
        next();
    })
}