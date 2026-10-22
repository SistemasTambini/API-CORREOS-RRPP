/**
 * Email Routes — delgado, solo conecta middlewares con controllers.
 * Upload, validación de PDFs y validación de payload gestionados en middlewares/.
 */
const express = require('express');
const router  = express.Router();

const { uploadMiddleware, validatePdfFields } = require('../middlewares/upload.middleware');
const { validateEmailPayload }               = require('../middlewares/validateEmailPayload');
const { bulkEmailUpload } = require('../middlewares/bulkEmailUpload.middleware');
const { enviarCorreoPrincipal, enviarCorreoSecundario, listarLogs, buscarLogs, enviarCorreoMasivo } = require('../controllers/email.controller');

// POST /api/email/send-bulk — usa la cuenta secundaria (boletas y facturas)
router.post('/send-bulk', bulkEmailUpload, enviarCorreoMasivo);

// POST  /api/email/send-main
router.post('/send-main',   uploadMiddleware, validatePdfFields, validateEmailPayload, enviarCorreoPrincipal);

// POST  /api/email/send-second
router.post('/send-second', uploadMiddleware, validatePdfFields, validateEmailPayload, enviarCorreoSecundario);

// GET   /api/email/logs
router.get('/logs',         listarLogs);

// GET   /api/email/logs/search?destinatario=&estado=&desde=&hasta=
router.get('/logs/search',  buscarLogs);

module.exports = router;
