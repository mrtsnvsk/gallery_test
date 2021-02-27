const { Router } = require('express');
const router = Router();
const {
  authController,
  registerController,
} = require('../controllers/authControllers');

// http://localhost:8080/api/register
router.post('/register', registerController);

// http://localhost:8080/api/auth
router.post('/auth', authController);

module.exports = router;
