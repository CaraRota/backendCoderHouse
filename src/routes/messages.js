import { Router } from "express";
import messagesModel from "../models/messages.js";

const routerMessages = Router();

routerMessages.get('/', async (req, res) => {
    try {
        const messages = await messagesModel.find();
        res.status(200).send({ resultado: 'OK', message: messages });
    }
    catch (error) {
        res.status(400).send({ error: `Error al consultar mensajes: ${error}` });
    }
});

routerMessages.post('/', async (req, res) => {
    const { email, message } = req.body;
    try {
        const respuesta = await messagesModel.create({
            email,
            message
        })
        res.status(200).send({ resultado: 'OK', message: respuesta });
    }
    catch (error) {
        res.status(400).send({ error: `Error al crear mensaje: ${error}` });
    }
});

export default routerMessages;