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

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    res.json(orders);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await orderService.updateOrderStatus(id, status);

    res.json({
      message: "Order status updated",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update order status",
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};