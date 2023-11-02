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
                res.status(400).send({ error: `Error al enviar ticket: ${error}` });
            } else {
                res.status(200).send({ resultado: 'OK', message: info });
            }
        });
    } catch (error) {
        res.status(400).send({ error: `Error al enviar ticket: ${error}` });
    }
}