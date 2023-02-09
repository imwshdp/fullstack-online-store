const ApiError = require('../error/ApiError');
const { Basket } = require('../models/models');

class BasketController {

  // GET (user id) => (basket)
  async getOne(req, res) {
    const { userId } = req.query;

    if (!userId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const basket = await Basket.findOne({
      where: { userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(basket);
  }
}

module.exports = new BasketController();