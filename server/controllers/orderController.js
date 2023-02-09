const ApiError = require('../error/ApiError');
const { Order } = require('../models/models');

class OrderController {

  // GET (user id) => (order)
  async getOne(req, res) {
    const { userId } = req.body;

    if (!userId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const order = await Order.findOne({
      where: { userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(order);
  }
}

module.exports = new OrderController();