const Image = require('../models/Image');

const getImagesController = async (req, res) => {
  try {
    const images = await Image.find();

    console.log('images', images);
    res.json(images);
  } catch (e) {
    console.log('Server error:', e.message);
    res.json({
      error: 'Ошибка при загрузке изображений.',
    });
  }
};

const addImageController = async (req, res) => {
  try {
    const { login, image, location } = req.body;

    await Image.create({
      login,
      image,
      location,
    });
    console.log('Фотографи успешно загружена.');
    res.json({ message: 'Фотография успешно загружена.' });
  } catch (e) {
    console.log('Server error:', e.message);
    res.json({
      message: e.message,
    });
  }
};

module.exports = { getImagesController, addImageController };
