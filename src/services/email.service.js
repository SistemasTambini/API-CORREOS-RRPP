const transporters = require('../config/transporter');
const rrppTemplates = require('../helpers/rrpp.template');
const reciboTemplates = require('../helpers/recibopago.template');
const EmailLogRp = require('../models/EmailLogRp'); // ✅ importamos el modelo

function sanitizeFilename(name, i) {
  const base = (name || `adjunto-${String(i + 1).padStart(2, '0')}.pdf`)
    .replace(/[\\/:*?"<>|]/g, '_')
    .trim();
  return base || `adjunto-${String(i + 1).padStart(2, '0')}.pdf`;
}

async function sendEmail({
  to,
  type,
  caseId,
  data = {},
  useAccount = 'main',
  subject,          // opcional: override del asunto
  pdf,              // compat: archivo único
  pdfs = [],        // nuevo: múltiples archivos
  cc,               // opcional
  bcc,              // opcional
  replyTo           // opcional
}) {
  try {
    if (!to) throw new Error('Campo "to" es requerido');
    if (!type) throw new Error('Campo "type" es requerido');

    let html;
    let finalSubject = subject;

    // --- Plantillas ---
    if (type === 'rrpp') {
      const template = rrppTemplates[caseId];
      if (!template) throw new Error(`CaseId ${caseId} no reconocido para RRPP`);
      finalSubject =
        finalSubject ||
        (typeof template.subject === 'function'
          ? template.subject(data) // ✅ ahora inyecta kardex, numeroTitulo, etc.
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

    // --- Normaliza adjuntos ---
    if (pdf && !pdfs.length) pdfs = [pdf];

    const attachments = (Array.isArray(pdfs) ? pdfs : [])
      .filter(Boolean)
      .map((f, i) => ({
        filename: sanitizeFilename(f.originalname, i),
        content: f.buffer,
        contentType: f.mimetype || 'application/pdf',
      }));

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

    // --- Enviar correo ---
    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo enviado con ${useAccount}:`, info.messageId);

    // ✅ Guardar log de éxito
    await EmailLogRp.create({
      destinatario: to,
      cc: cc || null,
      bcc: bcc || null,
      asunto: finalSubject,
      tipo: type,
      caseId: caseId || null,
      estado: 'SENT',
      messageId: info.messageId,
      cuenta: useAccount
    });

    return info;
  } catch (error) {
    console.error(`Error enviando correo con ${useAccount}:`, error);

    // ❌ Guardar log de error
    await EmailLogRp.create({
      destinatario: to || 'DESCONOCIDO',
      cc: cc || null,
      bcc: bcc || null,
      asunto: subject || 'SIN ASUNTO',
      tipo: type || 'DESCONOCIDO',
      caseId: caseId || null,
      estado: 'FAILED',
      errorMensaje: error.message,
      cuenta: useAccount
    });

    throw error;
  }
}

module.exports = { sendEmail };
