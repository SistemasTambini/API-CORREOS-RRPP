// controllers/email.controller.js
const { sendEmail } = require('../services/email.service');

const parseData = (data) => {
  try {
    return typeof data === 'string' ? JSON.parse(data) : (data || {});
  } catch {
    return {};
  }
};

// Normaliza archivos a un array: soporta fields, single y array
function collectFiles(req) {
  const files = [];

  // Caso fields: { pdfs: [..], pdf: [..] }
  if (req.files && !Array.isArray(req.files)) {
    if (Array.isArray(req.files.pdfs)) files.push(...req.files.pdfs);
    if (Array.isArray(req.files.pdf))  files.push(...req.files.pdf);
  }

  // Caso viejo: req.file (single)
  if (req.file) files.push(req.file);

  // Caso raro: req.files como array
  if (Array.isArray(req.files)) files.push(...req.files);

  return files;
}

// --- Cuenta principal ---
const enviarCorreoPrincipal = async (req, res) => {
  try {
    const { to, type, caseId, subject, cliente, data } = req.body;

    if (!to || !type) {
      return res.status(400).json({
        success: false,
        message: 'Campos requeridos: to, type'
      });
    }

    const pdfs = collectFiles(req);

    // Compatibilidad: si envías "cliente" plano lo envolvemos en data
    const payloadData = cliente ? { cliente } : parseData(data);

    const info = await sendEmail({
      to,
      type,
      caseId,
      data: payloadData,
      useAccount: 'main',
      subject: subject || undefined,
      pdfs
    });

    res.json({
      success: true,
      message: 'Correo enviado desde cuenta principal',
      to: info.accepted,
      messageId: info.messageId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error enviando correo desde cuenta principal',
      error: error.message
    });
  }
};

// --- Cuenta secundaria ---
const enviarCorreoSecundario = async (req, res) => {
  try {
    const { to, type, subject, caseId, cliente, data } = req.body;

    if (!to || !type) {
      return res.status(400).json({
        success: false,
        message: 'Campos requeridos: to, type'
      });
    }

    const pdfs = collectFiles(req);
    const payloadData = cliente ? { cliente } : parseData(data);

    const info = await sendEmail({
      to,
      type,
      caseId,
      data: payloadData,
      useAccount: 'second',
      subject: subject || undefined,
      pdfs
    });

    res.json({
      success: true,
      message: 'Correo enviado desde cuenta secundaria',
      to: info.accepted,
      messageId: info.messageId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error enviando correo desde cuenta secundaria',
      error: error.message
    });
  }
};

module.exports = { enviarCorreoPrincipal, enviarCorreoSecundario };
