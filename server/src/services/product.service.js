const db = require("../config/db");
const productModel = require("../models/product.model");

const addProduct = async (data) => {
  const { name, description, price_per_unit, unit, min_order_quantity } = data;

  if (!name || !price_per_unit || !unit) {
    throw new Error("Required fields missing");
  }

  await productModel.addProduct({
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

const getProductById = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, name, price_per_unit, unit FROM products WHERE id = ?",
    [id],
  );

  return rows[0];
};

module.exports = {
  getProductById,
};

module.exports = {
  addProduct,
  getProducts,
  getProductById
};
