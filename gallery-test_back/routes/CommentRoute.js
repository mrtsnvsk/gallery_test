const { Router } = require('express');
const router = Router();
const {
  getCommentsController,
  newCommentController,
} = require('../controllers/commentControllers');

// http://localhost:8080/api/newComment
router.post('/newComment', newCommentController);

// http://localhost:8080/api/:id
router.post('/comment/:id', getCommentsController);

module.exports = router;
