/**
 * EmailController
 * Responsabilidad única: parsear req → invocar service → responder.
 * Validación de campos y upload gestionados por middlewares.
 */
const { sendEmail }    = require('../services/email.service');
const emailLogRepo     = require('../repositories/emailLog.repository');
const { collectFiles } = require('../builders/attachment.builder');
const { readRecipientsExcel, MAX_BULK_RECIPIENTS } = require('../helpers/readRecipientsExcel');

/**
 * Parsea el campo data (JSON string o objeto).
 * @param {any} data
 * @returns {object}
 */
const parseData = (data) => {
  try {
    return typeof data === 'string' ? JSON.parse(data) : (data || {});
  } catch {
    return {};
  }
};

// --- Cuenta principal ---
const enviarCorreoPrincipal = async (req, res) => {
  try {
    const { to, cc, type, caseId, subject, cliente, data } = req.body;
    const pdfs        = collectFiles(req.files);
    const payloadData = cliente ? { cliente } : parseData(data);

    const result = await sendEmail({ to, cc, type, caseId, data: payloadData, useAccount: 'main', subject, pdfs });

    return res.json({
      success: true,
      message: result.logSaved
        ? 'Correo enviado desde cuenta principal'
        : 'Correo enviado desde cuenta principal, pero no se pudo registrar el log',
      to:        result.info.accepted,
      messageId: result.info.messageId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error enviando correo desde cuenta principal', error: error.message });
  }
};

// --- Cuenta secundaria ---
const enviarCorreoSecundario = async (req, res) => {
  try {
    const { to, type, subject, caseId, cliente, data } = req.body;
    const pdfs        = collectFiles(req.files);
    const payloadData = cliente ? { cliente } : parseData(data);

    const result = await sendEmail({ to, type, caseId, data: payloadData, useAccount: 'second', subject, pdfs });

    return res.json({
      success: true,
      message: result.logSaved
        ? 'Correo enviado desde cuenta secundaria'
        : 'Correo enviado desde cuenta secundaria, pero no se pudo registrar el log',
      to:        result.info.accepted,
      messageId: result.info.messageId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error enviando correo desde cuenta secundaria', error: error.message });
  }
};

// --- Listar todos los logs ---
const listarLogs = async (req, res) => {
  try {
    const logs = await emailLogRepo.findAll();
    return res.json({ success: true, total: logs.length, data: logs });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error obteniendo logs', error: error.message });
  }
};

// --- Buscar logs con filtros ---
const buscarLogs = async (req, res) => {
  try {
    const { destinatario, estado, desde, hasta } = req.query;
    const logs = await emailLogRepo.findWithFilters({ destinatario, estado, desde, hasta });
    return res.json({ success: true, total: logs.length, data: logs });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error filtrando logs', error: error.message });
  }
};

// Envío masivo desde Excel, secuencialmente y usando la cuenta secundaria.
const enviarCorreoMasivo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Adjunta un archivo Excel en el campo "file"' });
    const subject = String(req.body.subject || '').trim();
    const message = String(req.body.message || '').trim();
    if (!subject || !message) {
      return res.status(400).json({ success: false, message: 'Los campos "subject" y "message" son obligatorios' });
    }

    const recipients = await readRecipientsExcel(req.file.buffer);
    if (recipients.length > MAX_BULK_RECIPIENTS) {
      return res.status(400).json({ success: false, message: `El máximo es ${MAX_BULK_RECIPIENTS} destinatarios por solicitud`, total: recipients.length });
    }

    const results = [];
    for (const recipient of recipients) {
      try {
        const result = await sendEmail({
          to: recipient.email,
          type: 'custom',
          data: { message },
          subject,
          useAccount: 'second',
        });
        results.push({ row: recipient.row, email: recipient.email, status: 'SENT', messageId: result.info.messageId, logSaved: result.logSaved });
      } catch (error) {
        results.push({ row: recipient.row, email: recipient.email, status: 'FAILED', error: error.message, logSaved: error.logSaved ?? false });
      }
    }

    const sent = results.filter((result) => result.status === 'SENT').length;
    return res.status(sent === results.length ? 200 : 207).json({
      success: sent === results.length,
      message: `Envío finalizado: ${sent} enviados, ${results.length - sent} fallidos`,
      account: 'second',
      total: results.length,
      sent,
      failed: results.length - sent,
      results,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { enviarCorreoPrincipal, enviarCorreoSecundario, listarLogs, buscarLogs, enviarCorreoMasivo };
