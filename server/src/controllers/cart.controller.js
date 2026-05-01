const cartService = require("../services/cart.service");

const addToCart = async (req, res, next) => {
  try {
    const result = await cartService.addToCart(req.user.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getCart = async (req, res, next) => {
  try {
    const items = await cartService.getCart(req.user.id);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addToCart,
  getCart,
};