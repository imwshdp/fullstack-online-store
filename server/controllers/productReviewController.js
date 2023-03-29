const ApiError = require('../error/ApiError');
const { ProductReview } = require('../models/models');

class ProductReviewController {

  // CREATE (product id, user id, score, review) => (new review)
  async create(req, res) {
    const { productId, userId, score, review, username } = req.body;

    if (!review || !productId || !userId || !score) {
      throw ApiError.badRequest('Некорректные данные');
    }

    if (!username) username = "Пользователь"

    const candidate = await ProductReview.findOne({
      where: {
        productId,
        userId,
      },
    });

    // rewrite review or create new
    let newReview;
    if (candidate) {
      newReview = await ProductReview.upsert({
        id: candidate.id,
        review: review,
        score: score,
        username: username,
      });
      newReview = newReview[0]

    } else {
      newReview = await ProductReview.create({
        productId,
        userId,
        score,
        review,
        username,
      });
    }

    return res.json(newReview);
  }

  // DELETE (product id, user id) => (status 204)
  async delete(req, res) {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const candidate = await ProductReview.findOne({
      where: { productId, userId }
    });

    await ProductReview.destroy({
      where: { productId, userId }
    });

    return res.json(candidate.id);
  }

  // GET (product id) => (reviews)
  async getAll(req, res) {
    const { productId } = req.query;

    if (!productId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const reviews = await ProductReview.findAll({
      where: { productId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(reviews);
  }
}

module.exports = new ProductReviewController();