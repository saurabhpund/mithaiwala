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

router.put(
  "/products/:id",
  authenticate,
  authorize("ADMIN"),
  upload.single("image"),
  productController.updateProduct
);

router.delete(
  "/products/:id",
  authenticate,
  authorize("ADMIN"),
  productController.deleteProduct
);

// Public
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

module.exports = router;