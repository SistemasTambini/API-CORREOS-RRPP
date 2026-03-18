/**
 * EmailController
 * Responsabilidad única: parsear req → invocar service → responder.
 * Validación de campos y upload gestionados por middlewares.
 */
const { sendEmail }    = require('../services/email.service');
const emailLogRepo     = require('../repositories/emailLog.repository');
const { collectFiles } = require('../builders/attachment.builder');

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

module.exports = { enviarCorreoPrincipal, enviarCorreoSecundario, listarLogs, buscarLogs };