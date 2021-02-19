const { Router } = require('express');
const router = Router();
const {
  authController,
  addUserController,
} = require('../controllers/authControllers');

// http://localhost:8080/api/newUser
router.post('/newUser', addUserController);

// http://localhost:8080/api/auth
router.post('/auth', authController);

module.exports = router;
