const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

router.post("/", authenticate, orderController.placeOrder);
router.get("/", authenticate, orderController.getMyOrders);

//Admin routes
router.get(
  "/admin",
  authenticate,
  authorize("ADMIN"),
  orderController.getAllOrders
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  orderController.updateOrderStatus
);

module.exports = router;