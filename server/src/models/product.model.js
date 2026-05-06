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


const updateProduct = async (id, data) => {
  const { name, price_per_unit, unit, description, image_url } = data;

  await db.execute(
    `UPDATE products 
     SET name=?, price_per_unit=?, unit=?, description=?, image_url=COALESCE(?, image_url)
     WHERE id=?`,
    [name, price_per_unit, unit, description, image_url, id]
  );
};

const getAllProducts = async () => {
  const [rows] = await db.execute("SELECT * FROM products");
  return rows;
};

const deleteProduct = async (id) => {
  await db.execute("DELETE FROM products WHERE id=?", [id]);
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
