const uuid = require('uuid');
const path = require('path');

const ApiError = require('../error/ApiError')
const { Product, ProductInfo, ProductImage, ProductReview } = require('../models/models')

class ProductController {

  // CREATE (name, price, category id, info, images) => (status 204)
  async create(req, res) {
    let { name, price, categoryId, info, images } = req.body;

    console.log("DATA: ", `${name}, ${price}`);

    const { imgMobile, imgDesktop } = req.files;

    console.log("IMAGES: ", `${imgMobile}, ${imgDesktop}`);

    if (!name || !price || !categoryId || !imgMobile || !imgDesktop || !isFinite(price)) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const candidate = await Product.findOne({
      where: { name }
    });
    if (candidate) {
      throw ApiError.badRequest('Товар с таким названием уже есть в каталоге');
    }

    // saving images to local storage
    let fileNameMobile = uuid.v4() + '-mobile.jpg';
    imgMobile.mv(path.resolve(__dirname, '..', 'static', fileNameMobile));

    let fileNameDesktop = uuid.v4() + '-desktop.jpg';
    imgDesktop.mv(path.resolve(__dirname, '..', 'static', fileNameDesktop));

    // product creation
    const product = await Product.create({
      name,
      price,
      categoryId,
      imgMobile: fileNameMobile,
      imgDesktop: fileNameDesktop,
    });

    // images info saving
    await ProductImage.create({
      image: fileNameMobile,
      productId: product.id,
      primary: true,
    });

    await ProductImage.create({
      image: fileNameDesktop,
      productId: product.id,
      primary: true,
    });

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

    return res.status(204).json();
  }

  // DELETE (id) => (status 204)
  async delete(req, res) {
    const { id } = req.body;

    if (!id) {
      throw ApiError.badRequest('Некорректные данные');
    }

    // instance destroying
    const destroyed = await Product.destroy({
      where: { id }
    });
    if (!destroyed) {
      throw ApiError.internal('Удаление несуществующего товара');
    }

    // info destroying
    await ProductInfo.destroy({
      where: {
        productId: id,
      }
    });

    // extra images destroying
    await ProductImage.destroy({
      where: {
        productId: id,
      }
    });

    return res.status(204).json();
  }

  // GET (category id) => (products)
  async getAll(req, res) {
    let { categoryId } = req.query;
    let products;

    if (categoryId) {
      products = await Product.findAll({
        where: { categoryId },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
    } else {
      products = await Product.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
    }

    return res.json(products);
  }

  // GET (id) => (product)
  async getOne(req, res) {
    const { id } = req.params;

    if (!id) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductInfo, as: 'info' },
        { model: ProductImage, as: 'image' },
        { model: ProductReview, as: 'review' },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(product);
  }
}

module.exports = new ProductController();