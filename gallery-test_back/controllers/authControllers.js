const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const registerController = async (req, res) => {
  try {
    const { login, phone, email, password } = req.body;

    const matchUser = await User.findOne({ phone });

    if (matchUser) {
      res.json({
        error: 'Пользователь с таким номером телефона уже создан',
      });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ email, login, phone, password: hashPassword });

    res.json({
      message: 'Учетная запись создана.',
    });
  } catch (e) {
    res.json({
      error: 'Ошибка при регистрации',
    });
  }
};

const authController = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      res.json({
        error: 'Неверный номер телефона или пароль123.',
      });
      return;
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      res.json({
        error: 'Неверный номер телефона или пароль.',
      });
      return;
    }

    const token = jwt.sign(
      {
        login: user.login,
        email: user.email,
        phone: user.phone,
        id: user._id,
      },
      config.get('jwtSecretKey')
    );

    res.json({
      token,
    });
  } catch (e) {
    res.json({
      error: 'Ошибка при авторизации.',
    });
  }
};

module.exports = { authController, registerController };
