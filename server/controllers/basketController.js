const ApiError = require('../error/ApiError')
const { Basket } = require('../models/models')

class BasketController {
  async getOne(req, res, next) {
    const { userId } = req.query;

    if (!userId)
      throw ApiError.badRequest('Некорректные данные')

    const basket = await Basket.findOne({
      where: { userId }
    })

    return res.json(basket);
  }
}

module.exports = new BasketController();