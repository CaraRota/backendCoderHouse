import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import swaggerJSDoc from 'swagger-jsdoc';
import { __dirname } from '../path.js';
import 'dotenv/config';
import multer from 'multer';

//IMPORT LOGGER
import logger from '../utils/loggers.js';

export const app = express();
export const PORT = process.env.APP_PORT;

mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => logger.info('Conectado a la BDD Mongo'))
    .catch(error => logger.fatal("Error en conexion con DB Atlas", error));

//CREATE SERVER
export const server = app.listen(PORT, async () => {
    logger.info(`Server listening on port ${PORT}`);
});

//SWAGGER CONFIGURATION
const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Tienda Online - API Docs',
            description: 'Official documentation for the Online Store API',
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions)
export const io = new Server(server);

//MULTER CONFIGURATION
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/documents');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'application/pdf', 'image/jpeg', 'image/jpg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PNG, JPEG, JPG, and PDF files are allowed.'));
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });