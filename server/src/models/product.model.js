const db = require("../config/db");

const createProduct = async (product) => {
  const {
    name,
    description,
    price_per_unit,
    unit,
    min_order_quantity,
    is_available,
  } = product;

  const [result] = await db.execute(
    `INSERT INTO products 
    (name, description, price_per_unit, unit, min_order_quantity, is_available) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price_per_unit, unit, min_order_quantity, is_available]
  );

  return result;
};

const getAllProducts = async () => {
  const [rows] = await db.execute("SELECT * FROM products");
  return rows;
};

module.exports = {
  createProduct,
  getAllProducts,
};