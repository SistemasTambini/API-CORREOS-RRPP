const transporters = require('../config/transporter');
const rrppTemplates = require('../helpers/rrpp.template');
const reciboTemplates = require('../helpers/recibopago.template');
const EmailLogRp = require('../models/EmailLogRp');
const fs = require('fs');
const path = require('path');

function sanitizeFilename(name, i) {
  const base = (name || `adjunto-${String(i + 1).padStart(2, '0')}.pdf`)
    .replace(/[\\/:*?"<>|]/g, '_')
    .trim();
  return base || `adjunto-${String(i + 1).padStart(2, '0')}.pdf`;
}

function resolveTemplateCaseId(type, caseId, data = {}) {
  const normalizedType = String(type || '').toLowerCase();
  const normalizedCaseId = String(caseId || '').trim();

  if (normalizedType !== 'rrpp') return normalizedCaseId;

  // Si llega caseId=3 y el kardex empieza con V, N, C, T o L,
  // realmente debe usar la plantilla 10
  if (normalizedCaseId === '3') {
    const kardex = String(data.kardex || '').trim().toUpperCase();

    if (/^[VNCTL]/.test(kardex)) {
      return '10';
    }
  }

  return normalizedCaseId;
}

async function trySaveLog(payload) {
  try {
    await EmailLogRp.create(payload);
    return { saved: true, error: null };
  } catch (error) {
    console.error('No se pudo guardar el log:', error.message);
    return { saved: false, error: error.message };
  }
}

async function sendEmail({
  to,
  type,
  caseId,
  data = {},
  useAccount = 'main',
  subject,
  pdf,
  pdfs = [],
  cc,
  bcc,
  replyTo
}) {
  if (!to) throw new Error('Campo "to" es requerido');
  if (!type) throw new Error('Campo "type" es requerido');

  let html;
  let finalSubject = subject;
  let finalCaseId = String(caseId || '').trim();

  // --- Plantillas ---
  if (type === 'rrpp') {
    finalCaseId = resolveTemplateCaseId(type, caseId, data);

    const template = rrppTemplates[finalCaseId];
    if (!template) throw new Error(`CaseId ${finalCaseId} no reconocido para RRPP`);

    finalSubject =
      finalSubject ||
      (typeof template.subject === 'function'
        ? template.subject(data)
        : template.subject);

    html = template.html(data);
  } else if (type === 'recibo') {
    const clienteNombre =
      data.cliente ??
      data.nombreCliente ??
      data.nombre ??
      'Cliente';

    finalSubject = finalSubject || 'COMPROBANTE DE PAGO - NOTARIA TAMBINI';
    html = reciboTemplates.envioReciboPago(clienteNombre);
  } else {
    throw new Error(`Tipo de envío no reconocido: ${type}`);
  }

  // --- Normaliza adjuntos que vienen del request ---
  if (pdf && !pdfs.length) pdfs = [pdf];

  let attachments = (Array.isArray(pdfs) ? pdfs : [])
    .filter(Boolean)
    .map((f, i) => ({
      filename: sanitizeFilename(f.originalname, i),
      content: f.buffer,
      contentType: f.mimetype || 'application/pdf',
    }));

  // --- Adjuntar devolucion.pdf si aplica ---
  if (type === 'rrpp' && String(finalCaseId) === '2') {
    const monto = Number(data.montoDevolucion || 0);

    if (!Number.isNaN(monto) && monto >= 10) {
      const devolucionPath = path.resolve(__dirname, '../files/devolucion.pdf');

      try {
        const buffer = await fs.promises.readFile(devolucionPath);

        attachments.push({
          filename: 'devolucion.pdf',
          content: buffer,
          contentType: 'application/pdf',
        });
      } catch (err) {
        console.error('No se pudo adjuntar devolucion.pdf:', err.message);
      }
    }
  }

  // --- Cuenta SMTP ---
  const fromUser = process.env[`SMTP_USER_${useAccount.toUpperCase()}`];
  if (!fromUser) throw new Error(`No se encontró SMTP_USER para la cuenta ${useAccount}`);

  const transporter = transporters[useAccount];
  if (!transporter) throw new Error(`No existe transporter configurado para la cuenta ${useAccount}`);

  // --- Opciones del correo ---
  const mailOptions = {
    from: fromUser,
    to,
    subject: finalSubject,
    html,
    ...(attachments.length ? { attachments } : {}),
    ...(cc ? { cc } : {}),
    ...(bcc ? { bcc } : {}),
    ...(replyTo ? { replyTo } : {}),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo enviado con ${useAccount}:`, info.messageId);

    const logResult = await trySaveLog({
      destinatario: to,
      cc: cc || null,
      bcc: bcc || null,
      asunto: finalSubject,
      tipo: type,
      caseId: finalCaseId || null,
      estado: 'SENT',
      messageId: info.messageId,
      cuenta: useAccount
    });

    return {
      info,
      logSaved: logResult.saved,
      logError: logResult.error
    };
  } catch (error) {
    console.error(`Error enviando correo con ${useAccount}:`, error.message);

    const logResult = await trySaveLog({
      destinatario: to || 'DESCONOCIDO',
      cc: cc || null,
      bcc: bcc || null,
      asunto: finalSubject || subject || 'SIN ASUNTO',
      tipo: type || 'DESCONOCIDO',
      caseId: finalCaseId || null,
      estado: 'FAILED',
      errorMensaje: error.message,
      cuenta: useAccount
    });

    error.logSaved = logResult.saved;
    error.logError = logResult.error;

    throw error;
  }
}

module.exports = { sendEmail };