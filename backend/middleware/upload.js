const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = path.join(__dirname, '..', 'uploads', 'complaints', 'images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    let folder = 'uploads/complaints/others';

    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    folder = 'uploads/complaints/images';
    } else if (['.mp4', '.mov', '.avi', '.mkv'].includes(ext)) {
    folder = 'uploads/complaints/videos';
    } else if (['.zip', '.rar'].includes(ext)) {
    folder = 'uploads/complaints/archives';
    }

    cb(null, folder);
}
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.zip', '.rar', '.mp4', '.mov', '.avi', '.mkv'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return cb(new Error('images or ZIP/RAR files are allowed'));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
