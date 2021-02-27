const multer = require('multer');

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
    cb({ error: 'Можно загружать только изображения!' }, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
  },
});

const upload = multer({ storage, fileFilter: imageFilter });

module.exports = upload.single('image');
