import ticketModel from '../models/ticket.js';
import 'dotenv/config'
import { randomUUID } from 'crypto';
import nodemailer from 'nodemailer';

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
        res.status(400).send({ error: `Error al generar ticket: ${error}` });
    }
}

//SEND TICKET BY EMAIL
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // host para gmail;
    port: 465, // puerto de gmail
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVICE,
        pass: process.env.PASSWORD_EMAIL,
        authMethod: 'LOGIN',
    },
});

export const sendTicket = async (req, res, { ticket }) => {
    const { code, amount, purchaser, purchase_datetime } = ticket;
    try {
        const mailOptions = {
            from: process.env.EMAIL_SERVICE,
            to: purchaser,
            subject: 'Ticket de compra en Tienda Online',
            html: `<h1>Ticket de compra</h1>
            <p>Gracias por su compra!</p>
            <p>El código de su ticket es: ${code}</p>
            <p>El monto de su compra es: ${amount}</p>
            <p>Fecha y hora de compra: ${purchase_datetime}</p>`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(400).send({ error: `Error al enviar ticket: ${error}` });
            } else {
                res.status(200).send({ resultado: 'OK', message: info });
            }
        });
    } catch (error) {
        res.status(400).send({ error: `Error al enviar ticket: ${error}` });
    }
}