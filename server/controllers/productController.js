const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')
const { Product, ProductInfo, ProductImage, ProductReview } = require('../models/models')

class ProductController {
  async create(req, res, next) {
    let { name, price, categoryId, info, images } = req.body;
    const { imgMobile, imgDesktop } = req.files;

    if (!name || !price || !categoryId || !imgMobile || !imgDesktop || !isFinite(price))
      throw ApiError.badRequest('Некорректные данные')

    const candidate = await Product.findOne({
      where: { name }
    })
    if (candidate)
      throw ApiError.badRequest('Товар с таким названием уже есть в каталоге')

    // saving images to local storage
    let fileNameMobile = uuid.v4() + '-mobile.jpg'
    imgMobile.mv(path.resolve(__dirname, '..', 'static', fileNameMobile))

    let fileNameDesktop = uuid.v4() + '-desktop.jpg'
    imgDesktop.mv(path.resolve(__dirname, '..', 'static', fileNameDesktop))

    // instance creation
    const product = await Product.create({
      name,
      price,
      categoryId,
      imgMobile: fileNameMobile,
      imgDesktop: fileNameDesktop,
    })

    // images info saving
    await ProductImage.create({
      image: fileNameMobile,
      productId: product.id,
      primary: true,
    })

    await ProductImage.create({
      image: fileNameDesktop,
      productId: product.id,
      primary: true,
    })

    // info instances creation
    if (info) {
      info = JSON.parse(info)
      info.forEach(element =>
        ProductInfo.create({
          title: element.title,
          description: element.description,
          productId: product.id,
        })
      )
    }

    // image instances creation
    if (images) {
      images = JSON.parse(images)
      images.forEach(image => {
        let fileName = v4() + '.jpg'
        image.mv(resolve(__dirname, '..', 'static', fileName))

        ProductImage.create({
          image: fileName,
          productId: product.id,
          primary: false,
        })
      })
    }

    return res.json(product);
  }

  async delete(req, res, next) {
    const { id } = req.body;

    if (!id)
      throw ApiError.badRequest('Некорректные данные')

    // instance destroying
    const destroyed = await Product.destroy({
      where: { id }
    })
    if (!destroyed)
      throw ApiError.internal('Удаление несуществующего товара')

    // info destroying
    await ProductInfo.destroy({
      where: {
        productId: id,
      }
    })

    // extra images destroying
    await ProductImage.destroy({
      where: {
        productId: id,
      }
    })

    return res.json(destroyed);
  }

  async getAll(req, res, next) {
    let { categoryId } = req.query;

    if (!categoryId)
      throw ApiError.badRequest('Некорректные данные')

    const products = await Product.findAll({
      where: { categoryId },
    })

    return res.json(products);
  }

  async getOne(req, res, next) {
    const { id } = req.params;

    if (!id)
      throw ApiError.badRequest('Некорректные данные')

    const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductInfo, as: 'info' },
        { model: ProductImage, as: 'image' },
        { model: ProductReview, as: 'review' },
      ]
    })

    return res.json(product);
  }
}

module.exports = new ProductController();