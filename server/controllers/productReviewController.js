const ApiError = require('../error/ApiError')
const { ProductReview } = require('../models/models')

class ProductReviewController {
  async create(req, res, next) {
    const { productId, userId, score, review } = req.body;

    if (!review || !productId || !userId || !score)
      throw ApiError.badRequest('Некорректные данные')

    const candidate = await ProductReview.findOne({
      where: {
        productId,
        userId,
      }
    })

    let newReview

    // rewrite review or create new
    if (candidate) {
      newReview = await ProductReview.upsert({
        id: candidate.id,
        review: review,
        score: score,
      })
      return res.json(newReview[0]);

    } else {
      newReview = await ProductReview.create({
        productId,
        userId,
        score,
        review,
      })
      return res.json(newReview);
    }
  }

  async delete(req, res, next) {
    const { productId, userId } = req.body;

    if (!productId || !userId)
      throw ApiError.badRequest('Некорректные данные')

    const destroyed = await ProductReview.destroy({
      where: {
        productId,
        userId,
      }
    })

    return res.json(destroyed);
  }

  async getAll(req, res) {
    const { productId } = req.query;

    if (!productId)
      throw ApiError.badRequest('Некорректные данные')

    const reviews = await ProductReview.findAll({
      where: { productId },
    })

    return res.json(reviews);
  }
}

module.exports = new ProductReviewController();