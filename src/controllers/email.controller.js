const { sendEmail } = require('../services/email.service');

const parseData = (data) => {
  try {
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch {
    return data;
  }
};

const enviarCorreoPrincipal = async (req, res) => {
  try {
    const { to, type, caseId, data } = req.body;

    const info = await sendEmail({
      to,
      type,
      caseId,
      data: parseData(data), // 🔹 Aseguramos que sea objeto
      useAccount: 'main',
      pdf: req.file || null // El PDF opcional
    });

    res.json({
      success: true,
      message: `Correo enviado desde cuenta principal`,
      info
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error enviando correo desde cuenta principal',
      error: error.message
    });
  }
};


// Enviar correo desde cuenta secundaria (recibos de pago)
const enviarCorreoSecundario = async (req, res) => {
  try {
    const { to, type, subject, data } = req.body;

    // Parsear data correctamente
    const emailData = parseData(data);

    const info = await sendEmail({
      to,
      type,
      data: emailData,       // aquí van los datos del recibo
      useAccount: 'second',
      pdf: req.file || null, // PDF opcional
      subject: subject || undefined
    });

    res.json({
      success: true,
      message: `Correo enviado desde cuenta secundaria`,
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
