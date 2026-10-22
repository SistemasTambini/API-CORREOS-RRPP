/** Handler para mensajes libres enviados desde la lista masiva. */
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

function resolveCaseId() { return ''; }

function resolveSubject(_caseId, _data, subject) {
  if (!String(subject || '').trim()) throw new Error('El asunto es requerido');
  if (/[\r\n]/.test(subject)) throw new Error('El asunto no puede contener saltos de línea');
  return String(subject).trim();
}

function resolveHtml(_caseId, data = {}) {
  if (!String(data.message || '').trim()) throw new Error('El mensaje es requerido');
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head><body><div style="font-family:Arial,sans-serif;white-space:pre-wrap">${escapeHtml(data.message)}</div></body></html>`;
}

module.exports = { resolveCaseId, resolveSubject, resolveHtml };
