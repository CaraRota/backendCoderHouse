import nodemailer from 'nodemailer';
import 'dotenv/config'

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
    const storeName = 'Tienda Online';

    try {
        const mailOptions = {
            from: process.env.EMAIL_SERVICE,
            to: purchaser,
            subject: `Ticket de compra en ${storeName}`,
            html: `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f7f7f7;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 5px;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #0074D9; /* Blue color */
                            font-size: 28px;
                            margin-bottom: 20px;
                        }
                        p {
                            color: #333; /* Darker text color */
                            font-size: 16px;
                            line-height: 1.4;
                        }
                        strong {
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Ticket de compra</h1>
                        <p>Gracias por su compra en ${storeName}.</p>
                        <p><strong>Código de Ticket:</strong> ${code}</p>
                        <p><strong>Monto de Compra:</strong> $${amount}</p>
                        <p><strong>Fecha y Hora de Compra:</strong> ${purchase_datetime}</p>
                    </div>
                </body>
                </html>
            `,
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