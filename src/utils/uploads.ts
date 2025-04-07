// src/utils/uploads.ts

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ruta de destino para los archivos subidos
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Crea la carpeta si no existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

export default storage;
