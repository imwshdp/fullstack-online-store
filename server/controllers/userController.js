const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');
const { User, Basket, BasketProduct, Order, OrderProduct } = require('../models/models');

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
    const { email, password, role } = req.body;

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

    const user = await User.create({ email, role, password: hashPassword, username: 'Пользователь' });

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

  // DELETE (id) => (status 204)
  async delete(req, res) {
    const { id } = req.body;
    if (!id) {
      throw ApiError.badRequest('Некорректные данные');
    }

    // clean all basket products
    const basket = await Basket.findOne({ where: { userId: id } });
    await BasketProduct.destroy({ where: { basketId: basket.id } });
    await Basket.destroy({ where: { userId: id } });

    // clean all orders and order's products
    const orders = await Order.findAll({ where: { userId: id } });
    for (let order of orders) {
      await OrderProduct.destroy({ where: { orderId: order.id } });
    }
    await Order.destroy({ where: { userId: id } });

    // destroy user
    await User.destroy({ where: { id } });

    return res.status(204).json();
  }

  // CHANGE EMAIL (id, email) => (token)
  async changeEmail(req, res) {
    const { id, email } = req.body;
    if (!id || !email) {
      throw ApiError.badRequest('Некорректные данные');
    }

    await User.update(
      { email: email },
      { where: { id: id } }
    );

    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    const token = generateJwt(user.id, user.email, user.role, user.username);
    return res.json({ token });
  }

  // CHANGE PASSWORD (id, email) => (token)
  async changePassword(req, res) {
    const { id, password, oldPassword } = req.body;
    if (!id || !password) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const candidate = await User.findOne({ where: { id: id } });

    if (!bcrypt.compareSync(oldPassword, candidate.password)) {
      throw ApiError.badRequest('Неверный пароль от учетной записи');
    }

    const hashPassword = await bcrypt.hash(password, 5);
    await User.update(
      { password: hashPassword },
      { where: { id: id } }
    );

    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    const token = generateJwt(user.id, user.email, user.role, user.username);
    return res.json({ token });
  }

  // CHANGE USERNAME (id, email) => (token)
  async changeUsername(req, res) {
    const { id, username } = req.body;
    if (!id || !username) {
      throw ApiError.badRequest('Некорректные данные');
    }

    await User.update(
      { username: username },
      { where: { id: id } }
    );

    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    const token = generateJwt(user.id, user.email, user.role, user.username);
    return res.json({ token });
  }
}

module.exports = new UserController();