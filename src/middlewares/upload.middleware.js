/**
 * Middleware de upload — Multer configurado para PDF en memoria.
 * Extrae de routes la configuración de multer y la validación de campos.
 */
const multer = require('multer');

const ALLOWED_FIELDNAMES = new Set(['pdf', 'pdfs', 'pdfs[]']);
const INDEXED_FIELD_PATTERN = /^pdfs\[\d+\]$/;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024, files: 30 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      return cb(null, true);
    }
    return cb(new Error('Solo PDF'));
  }
});

/**
 * Valida que los nombres de campos de archivo sean los permitidos.
 */
function validatePdfFields(req, res, next) {
  const files = Array.isArray(req.files) ? req.files : [];
  for (const f of files) {
    const isAllowed = ALLOWED_FIELDNAMES.has(f.fieldname) || INDEXED_FIELD_PATTERN.test(f.fieldname);
    if (!isAllowed) {
      return res.status(400).json({
        success: false,
        message: `Campo de archivo no permitido: "${f.fieldname}"`
      });
    }
  }
  next();
}

module.exports = { uploadMiddleware: upload.any(), validatePdfFields };
