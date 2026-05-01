const productService = require("../services/product.service");
const { success } = require("../utils/helpers");

const createProduct = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await productService.addProduct(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    return success(res, products, "Products fetched");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
};