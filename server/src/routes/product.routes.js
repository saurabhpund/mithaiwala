const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");

// Admin only
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  productController.createProduct
);

// Public
router.get("/", productController.getProducts);

module.exports = router;