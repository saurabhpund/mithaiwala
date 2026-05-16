const db = require("../config/db");

exports.getOverview = async () => {
  const [orders] = await db.query(`
    SELECT COUNT(*) AS totalOrders
    FROM orders
  `);

  // Total Revenue
  const [revenue] = await db.query(`
    SELECT IFNULL(SUM(total_amount), 0) AS totalRevenue
    FROM orders
    WHERE status != 'CANCELLED'
  `);

  // Total Products
  const [products] = await db.query(`
    SELECT COUNT(*) AS totalProducts
    FROM products
  `);

  // Total Customers
  const [customers] = await db.query(`
    SELECT COUNT(*) AS totalCustomers
    FROM users
    WHERE role = 'CUSTOMER'
  `);

  return {
    totalOrders: orders[0].totalOrders,
    totalRevenue: revenue[0].totalRevenue,
    totalProducts: products[0].totalProducts,
    totalCustomers: customers[0].totalCustomers,
  };
};