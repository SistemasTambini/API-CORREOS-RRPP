/**
 * Registro de handlers de email — Strategy Pattern
 * Para agregar un nuevo tipo de correo:
 *   1. Crear src/handlers/miTipo.handler.js con { resolveCaseId, resolveSubject, resolveHtml }
 *   2. Registrarlo aquí con su clave de type
 */
const { EMAIL_TYPES } = require('../constants/emailTypes');

const handlers = {
  [EMAIL_TYPES.RRPP]:   require('./rrpp.handler'),
  [EMAIL_TYPES.RECIBO]: require('./recibo.handler'),
};

/**
 * Retorna el handler para el type dado, o lanza un error claro.
 * @param {string} type
 * @returns {{ resolveCaseId, resolveSubject, resolveHtml }}
 */
function getHandler(type) {
  const handler = handlers[type];
  if (!handler) throw new Error(`Tipo de envío no reconocido: "${type}". Tipos válidos: ${Object.keys(handlers).join(', ')}`);
  return handler;
}

module.exports = { getHandler };
