import ticketModel from '../models/ticket.js';
import 'dotenv/config'
import { randomUUID } from 'crypto';
import { sendTicket } from '../config/nodemailer.js';
import logger from '../utils/loggers.js';

export const getTickets = async (req, res) => {
    try {
        const tickets = await ticketModel.find({});
        tickets ? res.status(200).send({ resultado: 'OK', message: tickets })
            : res.status(404).send({ error: `Tickets no encontrados: ${error}` });
    }
    catch (error) {
        res.status(400).send({ error: `Error al obtener tickets: ${error}` });
    }
}

export const generateTicket = async (req, res) => {
    const { amount, email } = req.query;

    try {
        //Add condition for purchases which have 0 amount (meaning there's not enough stock of the product)
        if (amount <= 0) {
            res.status(400).send({ error: `Error al generar ticket: El monto debe ser mayor a 0` });
            return;
        }
        if (!email) {
            res.status(400).send({ error: `Error al generar ticket: Debe ingresar un email` });
            return;
        };

        const code = randomUUID();
        const ticket = {
            code: code,
            amount: amount,
            purchaser: email,
            purchase_datetime: new Date()
        }
        await ticketModel.create(ticket);
        sendTicket(req, res, {
            ticket
        });
    } catch (error) {
        logger.error(`Error al generar ticket: ${error}`);
        res.status(400).send({ error: `Error al generar ticket: ${error}` });
    }
}