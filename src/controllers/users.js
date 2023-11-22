import crypto from 'crypto';
import { sendRecoveryEmail } from '../config/nodemailer.js';
import logger from '../utils/loggers.js';

export const registerUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: 'Usuario ya existente' })
        }
        return res.status(200).send({ mensaje: 'Usuario creado' })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al crear usuario ${error}` })
    }
}

const recoveryLinks = {};

export const passwordRecovery = async (req, res) => {
    const { email } = req.body;

    try {
        //Verificacion de usuario existente
        const token = crypto.randomBytes(20).toString('hex');
        recoveryLinks[token] = { email, timestamp: Date.now() };

        const recoveryLink = `http://localhost:8080/api/users/reset-password/${token}`;

        sendRecoveryEmail(email, recoveryLink);
        logger.info(`Email enviado a ${email}`);
        res.status(200).send({ resultado: 'OK', message: 'Email enviado correctamente' });
    } catch (error) {
        logger.error(`Error al enviar email: ${error}`);
        res.status(500).send({ error: `Error al enviar email de recuperacion: ${error}` });
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, oldPassword } = req.body;

    try {
        const linkData = recoveryLinks[token];
        if (!linkData) {
            logger.error(`Token no encontrado: ${token}`);
            res.status(400).send({ error: `Token no encontrado: ${token}` });
        } else {
            const now = Date.now();
            const tokenTimestamp = linkData.timestamp;
            const tokenAge = now - tokenTimestamp;
            if (tokenAge > 3600000) {
                logger.error(`Token expirado: ${token}`);
                res.status(400).send({ error: `Token expirado: ${token}` });
            } else {
                const { email } = linkData;
                //Modify password

                //Check if 

                //Delete token
                delete recoveryLinks[token];
                logger.info(`Password actualizado correctamente para el usuario ${email}`);
                res.status(200).send({ resultado: 'OK', message: 'Password actualizado correctamente' });
            }
        }
    } catch (error) {
        logger.error(`Error al actualizar password: ${error}`);
        res.status(500).send({ error: `Error al actualizar password: ${error}` });
    }
}