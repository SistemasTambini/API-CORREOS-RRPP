const express = require('express');
const multer = require('multer');
const router = express.Router();
const { enviarCorreoPrincipal, enviarCorreoSecundario } = require('../controllers/email.controller');

// Multer en memoria
const upload = multer({ storage: multer.memoryStorage() });

router.post('/send-main', upload.single('pdf'), enviarCorreoPrincipal);
router.post('/send-second', upload.single('pdf'), enviarCorreoSecundario);

module.exports = router;
