const orderService = require("../services/order.service");

const placeOrder = async (req, res, next) => {
  try {
    const result = await orderService.placeOrder(req.user.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeOrder,
    getMyOrders,
};