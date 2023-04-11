const ApiError = require('../error/ApiError');
const { Order, OrderProduct, BasketProduct, Basket } = require('../models/models');

class OrderController {

  // CREATE (userId, price) => (array of order products)
  async create(req, res) {
    const { userId, price } = req.body;

    if (!userId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    // create order instance
    const newOrder = await Order.create({ userId, price });

    // find basket
    const basket = await Basket.findOne({
      where: { userId },
    })

    // find basket's products
    const basketProducts = await BasketProduct.findAll({
      where: { basketId: basket.id },
    })

    // create order's products instances
    basketProducts.forEach(async (product) => {
      await OrderProduct.create({
        orderId: newOrder.id,
        productId: product.productId,
        quantity: product.quantity,
      })
    })

    // delete products from basket
    await BasketProduct.destroy({
      where: { basketId: basket.id },
    })

    // configure response data
    let orderProductsList = []

    const orderProducts = await OrderProduct.findAll({
      where: { orderId: newOrder.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    // push to list all founded products
    for (let orderProduct of orderProducts) {
      orderProductsList.push(orderProduct)
    }

    return res.json({ orderId: newOrder.id, orderPrice: newOrder.price, orderProductsList });
  }

  // GET ALL (user id) => (array of order's products)
  async getAll(req, res) {
    const { userId } = req.query;

    if (!userId) {
      throw ApiError.badRequest('Некорректные данные');
    }

    const orders = await Order.findAll({
      where: { userId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    let orderProductsList = []
    let orderIdsList = []
    let ordersPrices = []

    for (let order of orders) {
      // push all order's products
      const orderProducts = await OrderProduct.findAll({
        where: { orderId: order.id },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });

      // push to list all founded products
      for (let orderProduct of orderProducts) {
        orderProductsList.push(orderProduct)
      }

      // add order's id and price to lists
      orderIdsList.push(order.id)
      ordersPrices.push(order.price)
    }

    return res.json({ orderIdsList, ordersPrices, orderProductsList });
  }
}

module.exports = new OrderController();