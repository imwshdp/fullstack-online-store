const ApiError = require('../error/ApiError')
const { BasketProduct } = require('../models/models')

class BasketProductController {
  async create(req, res, next) {
    const { productId, basketId } = req.body;

    if (!productId || !basketId)
      throw ApiError.badRequest('Некорректные данные')

    let basketProduct = await BasketProduct.findOne({
      where: {
        productId,
        basketId,
      }
    })

    // if row founded
    if (basketProduct) {
      basketProduct = await BasketProduct.upsert({
        id: basketProduct.id,
        quantity: basketProduct.quantity + 1,
      });
      return res.json(basketProduct[0]);

    } else {
      // add for the first time
      basketProduct = await BasketProduct.create({
        productId,
        basketId,
        quantity: 1,
      })
      return res.json(basketProduct);
    }
  }

  async delete(req, res, next) {
    const { productId, basketId } = req.body;

    if (!productId || !basketId)
      throw ApiError.badRequest('Некорректные данные')

    const productReview = await BasketProduct.destroy({
      where: {
        productId,
        basketId,
      }
    })

    return res.json(productReview);
  }

  async getAll(req, res, next) {
    const { basketId } = req.query;

    if (!basketId)
      throw ApiError.badRequest('Некорректные данные')

    const basketProducts = await BasketProduct.findAll({
      where: { basketId }
    })

    return res.json(basketProducts);
  }

  async increase(req, res, next) {
    const { productId, basketId } = req.body;

    if (!productId || !basketId)
      throw ApiError.badRequest('Некорректные данные')

    let increasedProduct = await BasketProduct.findOne({
      where: {
        productId,
        basketId,
      }
    })

    increasedProduct = await BasketProduct.upsert({
      id: increasedProduct.id,
      quantity: increasedProduct.quantity + 1,
    });
    return res.json(increasedProduct[0]);
  }

  async decrease(req, res, next) {
    const { productId, basketId } = req.body;

    if (!productId || !basketId)
      throw ApiError.badRequest('Некорректные данные')

    let decreasedProduct = await BasketProduct.findOne({
      where: {
        productId,
        basketId,
      }
    })

    if (decreasedProduct.quantity === 1) {
      decreasedProduct.destroy();
      return res.json(decreasedProduct);

    } else {
      decreasedProduct = await BasketProduct.upsert({
        id: decreasedProduct.id,
        quantity: decreasedProduct.quantity - 1,
      });
      return res.json(decreasedProduct[0]);
    }
  }
}

module.exports = new BasketProductController();