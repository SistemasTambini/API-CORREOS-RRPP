const multer = require('multer');
const path = require('path');

const IMAGE_TYPES = new Map([
  ['image/jpeg', ['.jpg', '.jpeg']],
  ['image/png', ['.png']],
  ['image/gif', ['.gif']],
  ['image/webp', ['.webp']],
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 2 },
  fileFilter: (_req, file, cb) => {
    if (file.fieldname === 'file') {
      const allowed = /\.xlsx$/i.test(file.originalname) && file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      return cb(allowed ? null : new Error('Adjunta un archivo Excel .xlsx en el campo "file"'), allowed);
    }

    if (file.fieldname === 'image') {
      const extensions = IMAGE_TYPES.get(file.mimetype) || [];
      const allowed = extensions.includes(path.extname(file.originalname).toLowerCase());
      return cb(allowed ? null : new Error('La imagen debe ser JPG, PNG, GIF o WEBP con extensión y tipo MIME válidos'), allowed);
    }

    return cb(new Error('Campos de archivo permitidos: "file" y "image"'), false);
  },
});

function bulkEmailUpload(req, res, next) {
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }])(req, res, (error) => {
    if (error) return res.status(400).json({ success: false, message: error.message });
    next();
  });
}

module.exports = { bulkEmailUpload };
