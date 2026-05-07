const db = require("../config/db");
const { productSchema } = require("../validators/product.validator");

const addProduct = async (data) => {
  const { name, price_per_unit, unit, min_order_quantity, is_available, description, image_url } = data;

  const query = `
  INSERT INTO products 
  (name, description, image_url, price_per_unit, unit, min_order_quantity, is_available)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

  const result = await db.execute(query, [
    data.name,
    data.description,
    data.image_url,
    data.price_per_unit,
    data.unit,
    data.min_order_quantity,
    data.is_available,
  ]);

  return { id: result.insertId, ...data };
};

const updateProduct = async (id, data) => {
  const { name, price_per_unit, unit, description, image_url } = data;

  await db.execute(
    `UPDATE products 
     SET name=?, price_per_unit=?, unit=?, description=?, image_url=COALESCE(?, image_url)
     WHERE id=?`,
    [name, price_per_unit, unit, description, image_url, id],
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
  deleteProduct,
};
