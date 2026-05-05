const db = require("../config/db");
const { productSchema } = require("../validators/product.validator");

const addProduct = async (data) => {
  const { name, price_per_unit, unit, description, image_url } = data;

  const [result] = await db.execute(
    `INSERT INTO products (name, price_per_unit, unit, description, image_url)
     VALUES (?, ?, ?, ?, ?)`,
    [name, price_per_unit, unit, description, image_url]
  );

  return { id: result.insertId, ...data };
};

const getAllProducts = async () => {
  const [rows] = await db.execute("SELECT * FROM products");
  return rows;
};

module.exports = {
  addProduct,
  getAllProducts,
};