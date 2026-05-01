const db = require("../config/db");

const createOrder = async (user_id, total_amount) => {
  const [result] = await db.execute(
    "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
    [user_id, total_amount]
  );
  return result.insertId;
};

const addOrderItem = async (order_id, item) => {
    console.log(item)
  const { product_id, quantity, unit_price, total_price } = item;

  await db.execute(
    `INSERT INTO order_items 
     (order_id, product_id, quantity, unit_price, total_price)
     VALUES (?, ?, ?, ?, ?)`,
    [order_id, product_id, quantity, unit_price, total_price]
  );
};

const getOrdersByUser = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [user_id]
  );
  return rows;
};

module.exports = {
  createOrder,
  addOrderItem,
  getOrdersByUser
};