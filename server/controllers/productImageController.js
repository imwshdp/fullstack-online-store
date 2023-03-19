const uuid = require('uuid');
const path = require('path');
const fs = require('fs')

const ApiError = require('../error/ApiError')
const { ProductImage, Product } = require('../models/models')

class ProductImageController {

  // CREATE (product id, image) => (status 204)
  async create(req, res) {
    const { productId } = req.body;
    const { image } = req.files;

    if (!image || !productId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    // saving images to local storage
    let fileName = uuid.v4() + '.jpg';
    image.mv(path.resolve(__dirname, '..', 'static', fileName));

    await ProductImage.create({
      productId,
      image: fileName,
      primary: false,
    });

    return res.status(204).json();
  }

  // GET (product id) => (images)
  async getAll(req, res) {
    const { productId } = req.query;

    if (!productId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const images = await ProductImage.findAll({
      where: {
        productId,
        primary: false,
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(images);
  }

  // DELETE (img id) => (status 204)
  async delete(req, res) {
    const { id } = req.body;

    if (!id) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const candidate = await ProductImage.findOne({ where: { id } })

    // prevent primary images deleting
    if (!candidate.primary) {
      fs.unlinkSync(path.resolve(__dirname, '..', 'static', candidate.image))
      await ProductImage.destroy({ where: { id } })
    }

    return res.status(204).json();
  }

}

module.exports = new ProductImageController();