import logger from '../utils/loggers.js';
import nodeMailer from 'nodemailer';
import 'dotenv/config';

const storeName = 'Tienda Online';

export const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com', // host para gmail;
    port: 465, // puerto de gmail
    secure: true,
    auth: {
        user: process.env.EMAIL_SERVICE,
        pass: process.env.PASSWORD_EMAIL,
        authMethod: 'LOGIN',
    },
});

//Funcion para enviar recovery

export const sendRecoveryEmail = async (email, recoveryLink) => {
    const mailOptions = {
        from: process.env.EMAIL_SERVICE,
        to: email,
        subject: 'Recuperar contraseña',
        html: `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
        
                .container {
                    background-color: #fff;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    border-radius: 8px;
                }
        
                h1 {
                    font-size: 24px;
                    text-align: center;
                    color: #333;
                }
        
                p {
                    font-size: 16px;
                    margin: 10px 0;
                }
        
                strong {
                    font-weight: bold;
                }
        
                .code {
                    background-color: #007bff;
                    color: #fff;
                    padding: 5px 10px;
                    border-radius: 4px;
                }
        
                .amount {
                    font-size: 18px;
                    color: #007bff;
                    font-weight: bold;
                }
        
                .purchase {
                    font-size: 14px;
                    color: #333;
                }
        
                .footer {
                    margin-top: 20px;
                    text-align: center;
                }
        
                .footer p {
                    font-size: 12px;
                    color: #333;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <h1>Recuperar contraseña</h1>
                <p>Para recuperar tu contraseña, haz click en el siguiente enlace:</p>
                <p><a href="${recoveryLink}">Recuperar contraseña</a></p>
                <p>Si no has solicitado recuperar tu contraseña, ignora este mensaje.</p>
                <div class="footer">
                    <p>© 2023 Tienda Online. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Email enviado a ${email}`);
        return true;
    } catch (error) {
        logger.error(`Error al enviar email: ${error}`);
        return false;
    }
}



//Funcion para enviar ticket

export const sendTicket = async (req, res, { ticket }) => {
    const { code, amount, purchaser, purchase_datetime } = ticket;

    try {
        const mailOptions = {
            from: process.env.EMAIL_SERVICE,
            to: purchaser,
            subject: `Ticket de compra en ${storeName}`,
            html: `
            <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            background-color: #fff;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 8px;
        }

        h1 {
            font-size: 24px;
            text-align: center;
            color: #333;
        }

        p {
            font-size: 16px;
            margin: 10px 0;
        }

        strong {
            font-weight: bold;
        }

        .code {
            background-color: #007bff;
            color: #fff;
            padding: 5px 10px;
            border-radius: 4px;
        }

        .amount {
            font-size: 18px;
            color: #007bff;
        }

        .datetime {
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Ticket de compra</h1>
        <p>Gracias por su compra en <span class="storeName">${storeName}</span>.</p>
        <p><strong>Código de Ticket:</strong> <span class="code">${code}</span></p>
        <p><strong>Monto de Compra:</strong> <span class="amount">$${amount}</span></p>
        <p><strong>Fecha y Hora de Compra:</strong> <span class="datetime">${purchase_datetime}</span></p>
    </div>
</body>
</html>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(`Error al enviar ticket: ${error}`);
                res.status(400).send({ error: `Error al enviar ticket: ${error}` });
            } else {
                logger.info(`Ticket enviado a ${purchaser}`);
                res.status(200).send({ resultado: 'OK', message: info });
            }
        });
    } catch (error) {
        logger.error(`Error al enviar ticket: ${error}`);
        res.status(400).send({ error: `Error al enviar ticket: ${error}` });
    }
}

export const sendAccountDeletion = async (email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_SERVICE,
            to: email,
            subject: 'Cuenta eliminada',
            html: `
            <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh; /* Use min-height instead of height for responsiveness */
        }

        .container {
            background-color: #fff;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 8px;
        }

        h1 {
            font-size: 24px;
            text-align: center;
            color: #333;
            margin-bottom: 20px; /* Add some margin below the heading */
        }

        p {
            font-size: 16px;
            margin: 10px 0;
        }

        .storeName {
            color: #007bff;
            font-weight: bold;
        }

        /* Use a shared style for code elements */
        .code, .amount {
            font-size: 18px;
            color: #007bff;
            padding: 5px 10px;
            border-radius: 4px;
            display: inline-block; /* Make inline with surrounding text */
            margin-top: 5px; /* Add some space above the code */
        }

        .datetime {
            color: #555;
            font-style: italic; /* Italics for datetime */
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Cuenta eliminada por inactividad</h1>
        <p>Se ha eliminado su cuenta de usuario en <span class="storeName">${storeName}</span>.</p>
    </div>
</body>

</html>
`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(`Error al enviar email: ${error}`);
                res.status(400).send({ error: `Error al enviar email: ${error}` });
            } else {
                logger.info(`Email enviado a ${email}`);
                res.status(200).send({ resultado: 'OK', message: info });
            }
        });
    } catch (error) {
        logger.error(`Error al enviar email: ${error}`);
        res.status(400).send({ error: `Error al enviar email: ${error}` });
    }
}