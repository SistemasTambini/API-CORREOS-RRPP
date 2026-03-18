/**
 * Middleware de validación del payload de email.
 * Extrae del controller la validación de campos obligatorios.
 */
function validateEmailPayload(req, res, next) {
  const { to, type } = req.body;

  if (!to || !type) {
    return res.status(400).json({
      success: false,
      message: 'Campos requeridos: to, type'
    });
  }

  next();
}

module.exports = { validateEmailPayload };
