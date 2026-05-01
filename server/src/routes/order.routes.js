const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.post("/", authenticate, orderController.placeOrder);
router.get("/", authenticate, orderController.getMyOrders);

module.exports = router;