/**
 * EmailService — Orquestador
 * Aplica el handler correcto (Strategy), construye adjuntos y mail,
 * envía el correo y registra el log. Sin lógica de plantillas ni DB directa.
 */
const transporters     = require('../config/transporter');
const { getHandler }   = require('../handlers/index');
const attachmentBuilder = require('../builders/attachment.builder');
const mailBuilder      = require('../builders/mail.builder');
const emailLogRepo     = require('../repositories/emailLog.repository');

/**
 * Envía un correo y registra el resultado en la BD.
 *
 * @param {{ to, type, caseId, data, useAccount, subject, pdfs, cc, bcc, replyTo }} params
 * @returns {Promise<{ info, logSaved: boolean, logError: string|null }>}
 */
async function sendEmail({
  to,
  type,
  caseId,
  data     = {},
  useAccount = 'main',
  subject,
  pdfs     = [],
  cc,
  bcc,
  replyTo,
}) {
  if (!to)   throw new Error('Campo "to" es requerido');
  if (!type) throw new Error('Campo "type" es requerido');

  // --- Resolver plantilla mediante Strategy ---
  const handler       = getHandler(type);
  const finalCaseId   = handler.resolveCaseId(caseId, data);
  const finalSubject  = handler.resolveSubject(finalCaseId, data, subject);
  const html          = handler.resolveHtml(finalCaseId, data);

  // --- Construir adjuntos ---
  const attachments = await attachmentBuilder.build({ pdfs, caseId: finalCaseId, data });

  // --- Cuenta SMTP ---
  const fromUser = process.env[`SMTP_USER_${useAccount.toUpperCase()}`];
  if (!fromUser) throw new Error(`No se encontró SMTP_USER para la cuenta "${useAccount}"`);

  const transporter = transporters[useAccount];
  if (!transporter) throw new Error(`No existe transporter configurado para la cuenta "${useAccount}"`);

  // --- Construir opciones y enviar ---
  const mailOptions = mailBuilder.build({ from: fromUser, to, cc, bcc, replyTo, subject: finalSubject, html, attachments });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Correo enviado [${useAccount}]:`, info.messageId);

    const logResult = await emailLogRepo.trySave({
      destinatario: to,
      cc:           cc  || null,
      bcc:          bcc || null,
      asunto:       finalSubject,
      tipo:         type,
      caseId:       finalCaseId || null,
      estado:       'SENT',
      messageId:    info.messageId,
      cuenta:       useAccount,
    });

    return { info, logSaved: logResult.saved, logError: logResult.error };

  } catch (error) {
    console.error(`❌ Error enviando correo [${useAccount}]:`, error.message);

    const logResult = await emailLogRepo.trySave({
      destinatario: to || 'DESCONOCIDO',
      cc:           cc  || null,
      bcc:          bcc || null,
      asunto:       finalSubject || subject || 'SIN ASUNTO',
      tipo:         type || 'DESCONOCIDO',
      caseId:       finalCaseId || null,
      estado:       'FAILED',
      errorMensaje: error.message,
      cuenta:       useAccount,
    });

    error.logSaved = logResult.saved;
    error.logError = logResult.error;
    throw error;
  }
}

module.exports = { sendEmail };