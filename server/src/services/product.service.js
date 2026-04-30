const productModel = require("../models/product.model");

const addProduct = async (data) => {
  const {
    name,
    description,
    price_per_unit,
    unit,
    min_order_quantity,
  } = data;

  if (!name || !price_per_unit || !unit) {
    throw new Error("Required fields missing");
  }

  await productModel.createProduct({
    name,
    description,
    price_per_unit,
    unit,
    min_order_quantity: min_order_quantity || 1,
    is_available: true,
  });

  return { message: "Product added successfully" };
};

const getProducts = async () => {
  return await productModel.getAllProducts();
};

module.exports = {
  addProduct,
  getProducts,
};