/**
 * Handler Recibo — Strategy para type='recibo'
 * Encapsula la resolución de plantilla y asunto para recibos de pago.
 */
const reciboTemplates = require('../helpers/recibopago.template');

const DEFAULT_SUBJECT = 'COMPROBANTE DE PAGO - NOTARIA TAMBINI';

/**
 * No aplica para recibo — retorna caseId sin cambios.
 * @param {string} caseId
 * @returns {string}
 */
function resolveCaseId(caseId) {
  return String(caseId || '').trim();
}

/**
 * Retorna el asunto del recibo.
 * @param {string} _caseId   No usado para recibo
 * @param {object} _data     No usado para recibo
 * @param {string} [customSubject]
 * @returns {string}
 */
function resolveSubject(_caseId, _data, customSubject) {
  return customSubject || DEFAULT_SUBJECT;
}

/**
 * Genera el HTML del recibo de pago.
 * @param {string} _caseId
 * @param {object} data
 * @returns {string}
 */
function resolveHtml(_caseId, data) {
  const clienteNombre = data.cliente ?? data.nombreCliente ?? data.nombre ?? 'Cliente';
  return reciboTemplates.envioReciboPago(clienteNombre);
}

module.exports = { resolveCaseId, resolveSubject, resolveHtml };
