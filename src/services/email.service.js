// services/email.service.js
const transporters = require('../config/transporter');
const rrppTemplates = require('../helpers/rrpp.template');
const reciboTemplates = require('../helpers/recibopago.template');

async function sendEmail({ to, type, caseId, data, useAccount = 'main', pdf }) {
    try {
        let html;
        let subject;

        if (type === 'rrpp') {
            const template = rrppTemplates[caseId];
            if (!template) {
                throw new Error(`CaseId ${caseId} no reconocido para RRPP`);
            }
            subject = template.subject;
            html = template.html(data);
        } else if (type === 'recibo') {
            const clienteNombre = data.cliente || 'Cliente';
            subject = subject || 'COMPROBANTE DE PAGO - NOTARIA TAMBINI';
            html = reciboTemplates.envioReciboPago(clienteNombre);
        } else {
            throw new Error(`Tipo de envío no reconocido: ${type}`);
        }

        // Configuración base del correo
        const mailOptions = {
            from: process.env[`SMTP_USER_${useAccount.toUpperCase()}`],
            to,
            subject,
            html,
        };

        // Si viene un PDF, lo adjuntamos
        if (pdf) {
            mailOptions.attachments = [
                {
                    filename: pdf.originalname,
                    content: pdf.buffer, // Lo enviamos en memoria
                },
            ];
        }

        const transporter = transporters[useAccount];
        const info = await transporter.sendMail(mailOptions);

        console.log(`Correo enviado con ${useAccount}:`, info.messageId);
        return info;
    } catch (error) {
        console.error(`Error enviando correo con ${useAccount}:`, error);
        throw error;
    }
}

module.exports = { sendEmail };
