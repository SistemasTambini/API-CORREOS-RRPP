/**
 * Handler RRPP — Strategy para type='rrpp'
 * Encapsula la resolución de plantilla, caseId y asunto para trámites RRPP.
 */
const rrppTemplates = require('../helpers/rrpp/index');

/** Prefijos de kardex que redirigen caseId=3 → caseId=10 */
const KARDEX_ALIAS_PREFIXES = /^[VNCTL]/;

/**
 * Resuelve el caseId efectivo según la lógica de negocio.
 * Si caseId='3' y el kardex empieza con V, N, C, T o L → usa plantilla 10.
 * @param {string} caseId
 * @param {object} data
 * @returns {string}
 */
function resolveCaseId(caseId, data = {}) {
  const normalized = String(caseId || '').trim();
  if (normalized === '3') {
    const kardex = String(data.kardex || '').trim().toUpperCase();
    if (KARDEX_ALIAS_PREFIXES.test(kardex)) return '10';
  }
  return normalized;
}

/**
 * Resuelve el asunto del correo para un caseId dado.
 * @param {string} caseId  (ya resuelto por resolveCaseId)
 * @param {object} data
 * @param {string} [customSubject]
 * @returns {string}
 */
function resolveSubject(caseId, data, customSubject) {
  if (customSubject) return customSubject;
  const template = rrppTemplates[caseId];
  if (!template) throw new Error(`CaseId ${caseId} no reconocido para RRPP`);
  return typeof template.subject === 'function' ? template.subject(data) : template.subject;
}

/**
 * Genera el HTML del correo para un caseId dado.
 * @param {string} caseId
 * @param {object} data
 * @returns {string}
 */
function resolveHtml(caseId, data) {
  const template = rrppTemplates[caseId];
  if (!template) throw new Error(`CaseId ${caseId} no reconocido para RRPP`);
  return template.html(data);
}

module.exports = { resolveCaseId, resolveSubject, resolveHtml };
