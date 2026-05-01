const db = require("../config/db");

const findCartByUser = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM cart WHERE user_id = ?",
    [user_id]
  );
  return rows[0];
};

const createCart = async (user_id) => {
  const [result] = await db.execute(
    "INSERT INTO cart (user_id) VALUES (?)",
    [user_id]
  );
  return result.insertId;
};

const addCartItem = async (cart_id, product_id, quantity) => {
  const [result] = await db.execute(
    "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
    [cart_id, product_id, quantity]
  );
  return result;
};

const findCartItem = async (cart_id, product_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
    [cart_id, product_id]
  );
  return rows[0];
};

const updateCartItem = async (cart_id, product_id, quantity) => {
  const [result] = await db.execute(
    "UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?",
    [quantity, cart_id, product_id]
  );
  return result;
};

const getCartItems = async (cart_id) => {
  const [rows] = await db.execute(
    `SELECT ci.product_id, ci.quantity, p.name, p.price_per_unit, p.unit
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.cart_id = ?`,
    [cart_id]
  );
  return rows;
};

const clearCart = async (cart_id) => {
  await db.execute("DELETE FROM cart_items WHERE cart_id = ?", [cart_id]);
};

module.exports = {
  findCartByUser,
  createCart,
  addCartItem,
  findCartItem,
  updateCartItem,
  getCartItems,
  clearCart
};