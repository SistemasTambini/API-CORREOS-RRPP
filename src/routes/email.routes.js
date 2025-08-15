// routes/email.routes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const { enviarCorreoPrincipal, enviarCorreoSecundario } = require('../controllers/email.controller');

// Multer en memoria
const upload = multer({ storage: multer.memoryStorage() });

// Soporta:
// - varios PDFs en el campo "pdfs" (preferido)
// - un solo PDF en "pdf" (compatibilidad)
router.post(
  '/send-main',
  upload.fields([{ name: 'pdfs', maxCount: 20 }, { name: 'pdf', maxCount: 1 }]),
  enviarCorreoPrincipal
);

router.post(
  '/send-second',
  upload.fields([{ name: 'pdfs', maxCount: 20 }, { name: 'pdf', maxCount: 1 }]),
  enviarCorreoSecundario
);

module.exports = router;
