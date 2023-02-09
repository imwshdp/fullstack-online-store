const ApiError = require('../error/ApiError');
const { Category } = require('../models/models');

class CategoryController {

  // CREATE (name) => (status 204)
  async create(req, res) {
    const { name } = req.body;

    if (!name) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const candidate = await Category.findOne({ where: { name } });
    if (candidate) {
      throw ApiError.badRequest('Раздел с таким названием уже существует');
    }

    await Category.create({ name });

    return res.status(204).json();
  }

  // DELETE (name) => (status 204)
  async delete(req, res) {
    const { name } = req.body;

    if (!name) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const category = await Category.destroy({
      where: { name },
    });

    if (!category) {
      throw ApiError.badRequest('Раздел с таким названием не найден');
    }

    return res.status(204).json();
  }

  // GET () => (array of ategories)
  async getAll(req, res) {
    const categories = await Category.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    return res.json(categories);
  }
}

module.exports = new CategoryController();