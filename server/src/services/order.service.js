const db = require("../config/db");
const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");

const placeOrder = async (user_id) => {
  const cart = await cartModel.findCartByUser(user_id);

  if (!cart) {
    throw new Error("Cart is empty");
  }

  const items = await cartModel.getCartItems(cart.id);

  if (items.length === 0) {
    throw new Error("Cart is empty");
  }

  let total = 0;

  const orderItems = items.map((item) => {
    const total_price = item.quantity * item.price_per_unit;
    total += total_price;

    return {
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.price_per_unit,
      total_price,
    };
  });

  const order_id = await orderModel.createOrder(user_id, total);

  for (let item of orderItems) {
    await orderModel.addOrderItem(order_id, item);
  }

  await cartModel.clearCart(cart.id);
  return { message: "Order placed successfully", order_id };
};

const getUserOrders = async (user_id) => {
  return await orderModel.getOrdersByUser(user_id);
};

const getAllOrders = async () => {
  const [orders] = await db.query(`
    SELECT 
      o.id,
      o.total_amount,
      o.status,
      o.created_at,
      u.name AS customer_name,
      u.email AS customer_email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
  `);

  for (const order of orders) {
    const [items] = await db.query(
      `
      SELECT 
        oi.id,
        oi.quantity,
        oi.total_price,
        p.name,
        p.image_url
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `,
      [order.id]
    );

    order.items = items;
  }

  return orders;
};

const updateOrderStatus = async (id, status) => {
  await db.query(
    `
    UPDATE orders
    SET status = ?
    WHERE id = ?
  `,
    [status, id]
  );
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
