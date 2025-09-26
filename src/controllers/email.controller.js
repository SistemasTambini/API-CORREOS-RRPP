// controllers/email.controller.js
const { sendEmail } = require('../services/email.service');
const EmailLogRp = require('../models/EmailLogRp');
const { Op } = require('sequelize');

const parseData = (data) => {
  try {
    return typeof data === 'string' ? JSON.parse(data) : (data || {});
  } catch {
    return {};
  }
};

// controllers/email.controller.js (solo esta parte)
function collectFiles(req) {
  const files = Array.isArray(req.files) ? req.files : [];
  const numerados = [];  // pdfs[0], pdfs[1]...
  const sinIndice = [];  // pdfs, pdfs[], pdf

  for (const f of files) {
    if (f.fieldname === 'pdf' || f.fieldname === 'pdfs' || f.fieldname === 'pdfs[]') {
      sinIndice.push(f);
    } else {
      const m = f.fieldname.match(/^pdfs\[(\d+)\]$/);
      if (m) numerados.push({ idx: parseInt(m[1],10), file: f });
    }
  }

  numerados.sort((a,b) => a.idx - b.idx);
  return [...numerados.map(x => x.file), ...sinIndice];
}

// --- Cuenta principal ---
const enviarCorreoPrincipal = async (req, res) => {
  try {
    const { to, cc, type, caseId, subject, cliente, data } = req.body;

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
      cc, // 👉 se envía solo si viene en el body
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

// ✅ Listar todos los logs (ordenados por fecha descendente)
const listarLogs = async (req, res) => {
  try {
    const logs = await EmailLogRp.findAll({
      order: [['fechaCreacion', 'DESC']]
    });
    res.json({
      success: true,
      total: logs.length,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo logs',
      error: error.message
    });
  }
};

// ✅ Buscar logs con filtros (opcional)
const buscarLogs = async (req, res) => {
  try {
    const { destinatario, estado, desde, hasta } = req.query;
    const where = {};

    if (destinatario) where.destinatario = destinatario;
    if (estado) where.estado = estado;

    if (desde && hasta) {
      const startDate = new Date(`${desde}T00:00:00-05:00`); // inicio día en Lima
      const endDate = new Date(`${hasta}T23:59:59-05:00`);   // fin día en Lima

      where.fechaCreacion = {
        [Op.between]: [startDate, endDate]
      };
    }

    const logs = await EmailLogRp.findAll({
      where,
      order: [['fechaCreacion', 'DESC']]
    });

    res.json({
      success: true,
      total: logs.length,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error filtrando logs',
      error: error.message
    });
  }
};

module.exports = { enviarCorreoPrincipal, enviarCorreoSecundario, buscarLogs , listarLogs};
