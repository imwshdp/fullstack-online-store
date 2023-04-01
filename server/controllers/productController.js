const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const ApiError = require('../error/ApiError')
const { Product, ProductInfo, ProductImage, ProductReview } = require('../models/models')

class ProductController {

  // CREATE (name, price, category id, info, images) => (status 204)
  async create(req, res) {
    let { name, price, categoryId, info } = req.body;
    const { imgMobile, imgDesktop, images } = req.files;

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
    let fileNameMobile = uuid.v4() + '-mobile.jpg'
    imgMobile.mv(path.resolve(__dirname, '..', 'static', fileNameMobile))

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
      info.forEach(async (element) =>
        await ProductInfo.create({
          title: element.title,
          description: element.description,
          productId: product.id,
        })
      )
    }

    // image instances creation
    if (images) {

      if (Array.isArray(images)) {

        images.forEach(async (image) => {
          let fileName = uuid.v4() + '.jpg'
          image.mv(path.resolve(__dirname, '..', 'static', fileName))

          await ProductImage.create({
            image: fileName,
            productId: product.id,
            primary: false,
          })
        })

      } else {
        let fileName = uuid.v4() + '.jpg'
        images.mv(path.resolve(__dirname, '..', 'static', fileName))

        await ProductImage.create({
          image: fileName,
          productId: product.id,
          primary: false,
        })
      }
    }

    return res.status(204).json();
  }

  // DELETE (id) => (status 204)
  async delete(req, res) {
    const { id } = req.body;

    if (!id) {
      throw ApiError.badRequest('Некорректные данные');
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

    // instance destroying
    await Product.destroy({
      where: { id }
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
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        { model: ProductInfo, as: 'info' },
        { model: ProductImage, as: 'image' },
        { model: ProductReview, as: 'review' },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(product);
  }

  // PUT (id, params) => (new product with params)
  async changeBasics(req, res) {
    let { id, name, price, categoryId } = req.body;
    let imgMobile, imgDesktop;
    if (req.files) {
      imgMobile = req.files.imgMobile;
      imgDesktop = req.files.imgDesktop;
    }

    if (!id) {
      throw ApiError.badRequest('Некорректные данные');
    }

    let candidate = await Product.findOne({ where: { id } })

    if (name) { candidate.name = name }
    if (price) { candidate.price = price }
    if (categoryId) { candidate.categoryId = +categoryId }

    if (imgMobile) {
      await ProductImage.destroy({
        where: { image: candidate.imgMobile }
      });

      // delete old picture from static
      fs.unlinkSync(path.resolve(__dirname, '..', 'static', candidate.imgMobile))

      // save new photo to static
      let newFileNameMobile = uuid.v4() + '-mobile.jpg';
      imgMobile.mv(path.resolve(__dirname, '..', 'static', newFileNameMobile));

      // save new image to images table
      await ProductImage.create({
        image: newFileNameMobile,
        productId: candidate.id,
        primary: true,
      });

      // update new image in product instance
      candidate.imgMobile = newFileNameMobile
    }

    if (imgDesktop) {
      await ProductImage.destroy({
        where: { image: candidate.imgDesktop }
      })

      // delete old picture from static
      fs.unlinkSync(path.resolve(__dirname, '..', 'static', candidate.imgDesktop))

      // save new photo to static
      let newFileNameDesktop = uuid.v4() + '-desktop.jpg';
      imgDesktop.mv(path.resolve(__dirname, '..', 'static', newFileNameDesktop));

      // save new image to images table
      await ProductImage.create({
        image: newFileNameDesktop,
        productId: candidate.id,
        primary: true,
      });

      // update new image in product instance
      candidate.imgDesktop = newFileNameDesktop
    }

    await candidate.save()

    const updatedProduct = await Product.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        { model: ProductInfo, as: 'info' },
        { model: ProductImage, as: 'image' },
        { model: ProductReview, as: 'review' },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(updatedProduct);
  }

  // PUT (id, params) => (new product with params)
  async changeInfoImage(req, res) {
    let { id, info } = req.body;
    let images;
    if (req.files) { images = req.files.images; }

    const product = await Product.findOne({ where: { id } });
    if (!product) {
      throw ApiError.badRequest('Некорректные данные');
    }

    // info instances creation
    if (info) {
      info = await JSON.parse(info)

      for (let element of info) {
        await ProductInfo.create({
          title: element.title,
          description: element.description,
          productId: product.id,
        })
      }
    }

    // image instances creation
    if (images) {

      if (Array.isArray(images)) {

        images.forEach(async (image) => {
          let fileName = uuid.v4() + '.jpg'
          image.mv(path.resolve(__dirname, '..', 'static', fileName))

          await ProductImage.create({
            image: fileName,
            productId: product.id,
            primary: false,
          })
        })

      } else {
        let fileName = uuid.v4() + '.jpg'
        images.mv(path.resolve(__dirname, '..', 'static', fileName))

        await ProductImage.create({
          image: fileName,
          productId: product.id,
          primary: false,
        })
      }
    }

    const updatedProduct = await Product.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        { model: ProductInfo, as: 'info' },
        { model: ProductImage, as: 'image' },
        { model: ProductReview, as: 'review' },
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(updatedProduct);
  }
}

module.exports = new ProductController();