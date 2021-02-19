const { Router } = require('express');
const router = Router();
const {
  getImagesController,
  addImageController,
} = require('../controllers/imageControllers');

// http://localhost:8080/api/newImage
router.post('/newImage', addImageController);

// http://localhost:8080/api/images
router.get('/images', getImagesController);

module.exports = router;
