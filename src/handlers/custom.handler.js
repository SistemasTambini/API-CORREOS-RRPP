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
  const message = String(data.message || '').replace(/\r\n?/g, '\n').trim();
  if (!message) throw new Error('El mensaje es requerido');

  const paragraphs = message
    .split(/\n[ \t]*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const lines = paragraph.split('\n').map(escapeHtml).join('<br />');
      return `<p style="margin:0 0 16px 0;padding:0;font-family:Arial,sans-serif;font-size:14px;line-height:21px;mso-line-height-rule:exactly;color:#222222">${lines}</p>`;
    })
    .join('');

  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head><body style="margin:0;padding:0"><div style="font-family:Arial,sans-serif;font-size:14px;line-height:21px;color:#222222">${paragraphs}</div></body></html>`;
}

module.exports = { resolveCaseId, resolveSubject, resolveHtml };
