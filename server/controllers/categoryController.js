const ApiError = require('../error/ApiError')
const { Category } = require('../models/models')

class CategoryController {
  // CREATE (name) => (Category Object | ApiError)
  async create(req, res, next) {
    const { name } = req.body;

    if (!name)
      throw ApiError.badRequest('Некорректные данные')

    const candidate = await Category.findOne({ where: { name } })
    if (candidate)
      throw ApiError.badRequest('Раздел с таким названием уже существует')

    const category = await Category.create({ name });
    return res.json(category);
  }

  async delete(req, res, next) {
    const { name } = req.body;

    if (!name)
      throw ApiError.badRequest('Некорректные данные')

    const category = await Category.destroy({
      where: {
        name,
      }
    });

    if (!category)
      throw ApiError.badRequest('Раздел с таким названием не найден')

    return res.json(category);
  }

  async getAll(req, res, next) {
    const categories = await Category.findAll()
    return res.json(categories);
  }
}

module.exports = new CategoryController();