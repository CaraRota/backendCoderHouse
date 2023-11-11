import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import 'dotenv/config';

//IMPORT LOGGER
import logger from '../utils/loggers.js';

export const app = express();
export const PORT = 8080;

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => logger.info('Conectado a la BDD Mongo'))
    .catch(error => logger.fatal("Error en conexion con DB Atlas", error));

//CREATE SERVER
export const server = app.listen(PORT, async () => {
    logger.info(`Server listening on port ${PORT}`);
});

export const io = new Server(server);