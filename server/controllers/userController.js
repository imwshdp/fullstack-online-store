const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role, username) => {
  return jwt.sign(
    { id, email, role, username },
    process.env.SECRET_KEY,
    { expiresIn: '24h' },
  )
}

class UserController {

  // REGISTRATION (email, password, role) => (token)
  async registration(req, res) {
    const { email, password, role, username } = req.body;

    if (!email || !password) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const candidate = await User.findOne({
      where: { email }
    });
    if (candidate) {
      throw ApiError.badRequest('Пользователь с данным адресом электронной почты уже зарегистрирован');
    }

    // user instance creation
    const hashPassword = await bcrypt.hash(password, 5);

    if (!username) {
      username = 'Пользователь'
    }

    const user = await User.create({ email, role, password: hashPassword, username });

    // basket instance creation
    const basket = await Basket.create({ userId: user.id });

    // user token creation
    const token = generateJwt(user.id, user.email, user.role, user.username);
    return res.json({ token });
  }

  // LOGIN (email, password) => (token)
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      throw ApiError.internal('Пользователь с таким адресом электронной почты не найден');
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw ApiError.internal('Неверные данные для входа');
    }

    const token = generateJwt(user.id, user.email, user.role, user.username);
    return res.json({ token });
  }

  // CHECK (id, email, role) => (token)
  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.username);
    return res.json({ token });
  }
}

module.exports = new UserController();