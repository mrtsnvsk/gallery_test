const { Router } = require('express');
const router = Router();
const {
  getImagesController,
  addImageController,
} = require('../controllers/imageControllers');
const uploadImageMiddleware = require('../middleware/newImageMiddleware');

//http:localhost:8080/api/newImage
router.post('/newImage', uploadImageMiddleware, addImageController);

// http://localhost:8080/api/images
router.get('/images', getImagesController);

module.exports = router;
