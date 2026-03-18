/**
 * AttachmentBuilder
 * Centraliza la construcción del array de adjuntos para el correo:
 *  - Sanitiza nombres de archivo
 *  - Ordena los pdfs numerados (pdfs[0], pdfs[1]...) antes que los sin índice
 *  - Auto-adjunta devolucion.pdf para caseId=2 si montoDevolucion >= 10
 */
const fs   = require('fs');
const path = require('path');

const DEVOLUCION_PDF_PATH = path.resolve(__dirname, '../files/devolucion.pdf');

/**
 * @param {string|undefined} name  Nombre original del archivo
 * @param {number} i               Índice (para nombre de fallback)
 * @returns {string}
 */
function sanitizeFilename(name, i) {
  const base = (name || `adjunto-${String(i + 1).padStart(2, '0')}.pdf`)
    .replace(/[\\/:*?"<>|]/g, '_')
    .trim();
  return base || `adjunto-${String(i + 1).padStart(2, '0')}.pdf`;
}

/**
 * Ordena los archivos: primero los numerados (pdfs[0], pdfs[1]...) luego los sin índice.
 * @param {Express.Multer.File[]} files
 * @returns {Express.Multer.File[]}
 */
function collectFiles(files = []) {
  const numerados = [];
  const sinIndice = [];

  for (const f of files) {
    if (['pdf', 'pdfs', 'pdfs[]'].includes(f.fieldname)) {
      sinIndice.push(f);
    } else {
      const m = f.fieldname.match(/^pdfs\[(\d+)\]$/);
      if (m) numerados.push({ idx: parseInt(m[1], 10), file: f });
    }
  }

  numerados.sort((a, b) => a.idx - b.idx);
  return [...numerados.map(x => x.file), ...sinIndice];
}

/**
 * Construye el array de adjuntos listo para Nodemailer.
 * @param {{ pdfs?: Express.Multer.File[], caseId?: string, data?: object }} params
 * @returns {Promise<Array<{ filename: string, content: Buffer, contentType: string }>>}
 */
async function build({ pdfs = [], caseId, data = {} }) {
  const ordered = collectFiles(pdfs);

  const attachments = ordered
    .filter(Boolean)
    .map((f, i) => ({
      filename:    sanitizeFilename(f.originalname, i),
      content:     f.buffer,
      contentType: f.mimetype || 'application/pdf',
    }));

  // Auto-adjuntar devolucion.pdf en caseId=2 si montoDevolucion >= 10
  if (String(caseId) === '2') {
    const monto = Number(data.montoDevolucion || 0);
    if (!Number.isNaN(monto) && monto >= 10) {
      try {
        const buffer = await fs.promises.readFile(DEVOLUCION_PDF_PATH);
        attachments.push({ filename: 'devolucion.pdf', content: buffer, contentType: 'application/pdf' });
      } catch (err) {
        console.error('AttachmentBuilder — no se pudo adjuntar devolucion.pdf:', err.message);
      }
    }
  }

  return attachments;
}

module.exports = { build, collectFiles };
