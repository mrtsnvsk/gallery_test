const Image = require('../models/Image');

const getImagesController = async (req, res) => {
  try {
    const images = await Image.find();

    res.json(images);
  } catch (e) {
    res.json({
      error: 'Ошибка при загрузке изображений.',
    });
  }
};

const addImageController = async (req, res) => {
  try {
    const { imageOwner, location } = req.body;

    const image = await Image.create({
      login: imageOwner,
      image: req.file.filename,
      location,
    });

    res.json(image);
  } catch (e) {
    res.json({
      error: 'Не удалось загрузить изображение',
    });
  }
};

module.exports = { getImagesController, addImageController };
