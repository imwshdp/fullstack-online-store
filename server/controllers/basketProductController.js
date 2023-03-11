const ApiError = require('../error/ApiError');
const { BasketProduct } = require('../models/models');

class BasketProductController {

  // CREATE (product id, basket id) => (status 204)
  async create(req, res) {
    const { productId, basketId } = req.body;

    if (!productId || !basketId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    let basketProduct = await BasketProduct.findOne({
      where: {
        productId,
        basketId,
      },
    });

    // if row founded
    if (basketProduct) {
      // update quantity
      await BasketProduct.upsert({
        id: basketProduct.id,
        quantity: basketProduct.quantity + 1,
      });

    } else {
      // else add for the first time
      basketProduct = await BasketProduct.create({
        productId,
        basketId,
        quantity: 1,
      });
    }

    return res.status(204).json();
  }

  // DELETE (product id, basket id) => (status 204)
  async delete(req, res, next) {
    const { productId, basketId } = req.body;

    if (!productId || !basketId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    // destroy product in basket
    await BasketProduct.destroy({
      where: {
        productId,
        basketId,
      },
    });

    return res.status(204).json();
  }

  // GET (basket id) => (all products in basket)
  async getAll(req, res) {
    const { basketId } = req.query;

    if (!basketId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const basketProducts = await BasketProduct.findAll({
      where: { basketId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(basketProducts);
  }

  // INCREASE (product id, basket id) => (status 204)
  async increase(req, res) {
    const { productId, basketId } = req.body;

    console.log(productId, basketId)

    if (!productId || !basketId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    let increasedProduct = await BasketProduct.findOne({
      where: {
        productId,
        basketId,
      },
    });

    await BasketProduct.upsert({
      id: increasedProduct.id,
      quantity: increasedProduct.quantity + 1,
    });

    increasedProduct = await BasketProduct.findOne({
      where: { productId, basketId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(increasedProduct);
  }

  // DECREASE (product id, basket id) => (status 204)
  async decrease(req, res) {
    const { productId, basketId } = req.body;

    if (!productId || !basketId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    let decreasedProduct = await BasketProduct.findOne({
      where: {
        productId,
        basketId,
      }
    });

    // delete product if quantity equals 1
    if (decreasedProduct.quantity === 1) {
      decreasedProduct.destroy();

    } else {
      // decrease product's quantity if quantity > 1
      decreasedProduct = await BasketProduct.upsert({
        id: decreasedProduct.id,
        quantity: decreasedProduct.quantity - 1,
      });
    }

    decreasedProduct = await BasketProduct.findOne({
      where: { productId, basketId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(decreasedProduct);
  }
}

module.exports = new BasketProductController();