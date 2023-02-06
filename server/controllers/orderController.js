const ApiError = require('../error/ApiError')
const { Order } = require('../models/models')

class OrderController {
  async getOne(req, res, next) {
    const { userId } = req.body;

    if (!userId)
      throw ApiError.badRequest('Некорректные данные')

    const order = await Order.findOne({
      where: { userId }
    })

    return res.json(order);
  }
}

module.exports = new OrderController();