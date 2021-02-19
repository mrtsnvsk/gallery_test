const Image = require('../models/Image');
const Comment = require('../models/Comment');

const getCommentsController = async (req, res) => {
  try {
    const { id } = req.params;
    const currentImage = await Image.find({ _id: id });
    const imagesComments = await Comment.find({ imageId: id });
    const data = [currentImage, imagesComments];

    console.log('data', data);
    res.json(data);
  } catch (e) {
    console.log('Server error:', e.message);
    res.json({
      error: 'Ошибка при получении комментариев.',
    });
  }
};

const newCommentController = async (req, res) => {
  try {
    const { imageId, comment, login } = req.body;

    await Comment.create({
      imageId,
      comment,
      login,
    });

    console.log('Комментарий успешно опубликован.');
    res.json({
      message: 'Комментарий успешно опубликован.',
    });
  } catch (e) {
    console.log('Server error:', e.message);
    res.json({
      error: 'Ошибка при создании комментария.',
    });
  }
};

module.exports = { getCommentsController, newCommentController };
