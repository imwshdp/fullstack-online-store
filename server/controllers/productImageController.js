const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')
const { ProductImage } = require('../models/models')

class ProductImageController {
  async create(req, res, next) {
    const { productId } = req.body;
    const { image } = req.files;

    if (!image || !productId)
      throw ApiError.badRequest('Некорректные данные')

    // saving images to local storage
    let fileName = uuid.v4() + '.jpg'
    image.mv(path.resolve(__dirname, '..', 'static', fileName))

    const newImage = await ProductImage.create({
      productId,
      image: fileName,
      primary: false,
    })

    return res.json(newImage);
  }

  async delete(req, res, next) {
    const { id } = req.body;

    if (!id)
      throw ApiError.badRequest('Некорректные данные')

    const destroyed = await ProductImage.destroy({
      where: { id }
    })

    return res.json(destroyed);
  }

  async getAll(req, res) {
    const { productId } = req.query;

    if (!productId)
      throw ApiError.badRequest('Некорректные данные')

    const images = await ProductImage.findAll({
      where: {
        productId,
        primary: false,
      }
    })

    return res.json(images);
  }
}

module.exports = new ProductImageController();