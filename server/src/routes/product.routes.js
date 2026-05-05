const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const { authenticate, authorize } = require("../middleware/auth.middleware");
const upload = require("../config/upload");

// Admin only
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  productController.createProduct
);

// Public
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

module.exports = router;