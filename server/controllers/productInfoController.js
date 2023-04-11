const ApiError = require('../error/ApiError');
const { ProductInfo } = require('../models/models');

class ProductInfoController {

  // CREATE (product id, title, description) => (status 204)
  async create(req, res) {
    const { productId, title, description } = req.body;

    if (!productId || !title || !description) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const candidate = await ProductInfo.findOne({
      where: {
        productId,
        title,
      },
    });
    if (candidate) {
      throw ApiError.badRequest('Характеристика товара уже задана');
    }

    await ProductInfo.create({
      productId,
      title,
      description,
    });

    return res.status(204).json();
  }

  // DELETE (id) => (status 204)
  async delete(req, res) {
    const { id } = req.body;
    if (!id) {
      throw ApiError.badRequest('Некорректные данные');
    }

    await ProductInfo.destroy({
      where: { id }
    });

    return res.status(204).json();
  }

  // GET (product id) => (infos)
  async getAll(req, res) {
    const { productId } = req.query;

    if (!productId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const images = await ProductInfo.findAll({
      where: { productId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(images);
  }
}

module.exports = new ProductInfoController();