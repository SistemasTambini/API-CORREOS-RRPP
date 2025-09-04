// routes/email.routes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { enviarCorreoPrincipal, enviarCorreoSecundario } = require('../controllers/email.controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024, files: 30 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) return cb(null, true);
    return cb(new Error('Solo PDF'));
  }
});

// Valida que solo lleguen nombres de campo permitidos
function validarCamposPDF(req, res, next) {
  const files = Array.isArray(req.files) ? req.files : [];
  for (const f of files) {
    const ok =
      f.fieldname === 'pdf' ||
      f.fieldname === 'pdfs' ||
      f.fieldname === 'pdfs[]' ||
      /^pdfs\[\d+\]$/.test(f.fieldname);
    if (!ok) {
      return res.status(400).json({ success:false, message:`Campo de archivo no permitido: "${f.fieldname}"` });
    }
  }
  next();
}

router.post('/send-main',   upload.any(), validarCamposPDF, enviarCorreoPrincipal);
router.post('/send-second', upload.any(), validarCamposPDF, enviarCorreoSecundario);

module.exports = router;