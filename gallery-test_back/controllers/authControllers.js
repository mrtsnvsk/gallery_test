const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const authController = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      console.log('Неверный номер телефона или пароль.');
      return res.json({
        error: 'Неверный номер телефона или пароль.',
      });
    }

    if (user.password !== password) {
      console.log('Неверный номер телефона или пароль.');
      return res.json({
        error: 'Неверный номер телефона или пароль.',
      });
    }

    const token = jwt.sign(
      {
        login: user.login,
        phone: user.phone,
        password: user.password,
        id: user._id,
      },
      config.get('jwtSecretKey')
    );
    console.log('token', token);
    res.json({
      token,
    });
  } catch (e) {
    console.log('Server error:', e.message);
    res.json({
      error: 'Ошибка при авторизации.',
    });
  }
};

const addUserController = async (req, res) => {
  try {
    const { login, phone, password } = req.body;

    await User.create({ login, phone, password });

    console.log('Учетная запись создана.');
    res.json({
      message: 'Учетная запись создана.',
    });
  } catch (e) {
    console.log('Server error:', e.message);
    res.json({
      message: 'Ошибка при создании пользователя',
    });
  }
};

module.exports = { authController, addUserController };
