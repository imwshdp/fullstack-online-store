const ApiError = require('../error/ApiError')
const { ProductInfo } = require('../models/models')

class ProductInfoController {
  async create(req, res, next) {
    const { productId, title, description } = req.body;

    if (!productId || !title || !description)
      throw ApiError.badRequest('Некорректные данные')

    const candidate = await ProductInfo.findOne({
      productId,
      title,
    })
    if (candidate)
      throw ApiError.badRequest('Характеристика товара уже задана')

    const newInfo = await ProductInfo.create({
      productId,
      title,
      description,
    })

    return res.json(newInfo);
  }

  async delete(req, res, next) {
    const { id } = req.body;

    if (!id)
      throw ApiError.badRequest('Некорректные данные')

    const destroyed = await ProductInfo.destroy({
      where: { id }
    })

    return res.json(destroyed);
  }

  async getAll(req, res) {
    const { productId } = req.query;

    if (!productId)
      throw ApiError.badRequest('Некорректные данные')

    const images = await ProductInfo.findAll({
      where: { productId }
    })

    return res.json(images);
  }
}

module.exports = new ProductInfoController();