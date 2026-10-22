const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.xlsx$/i.test(file.originalname) || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    cb(allowed ? null : new Error('Adjunta un archivo Excel .xlsx'), allowed);
  },
});

function bulkEmailUpload(req, res, next) {
  upload.single('file')(req, res, (error) => {
    if (error) return res.status(400).json({ success: false, message: error.message });
    next();
  });
}

module.exports = { bulkEmailUpload };
