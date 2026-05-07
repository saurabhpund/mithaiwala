const productService = require("../services/product.service");
const { success } = require("../utils/helpers");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price_per_unit,
      unit,
      description,
      min_order_quantity,
      is_available,
    } = req.body;

    const image_url = req.file?.path;

    const product = await productService.addProduct({
      name,
      price_per_unit,
      unit,
      description,
      min_order_quantity: parseInt(min_order_quantity) || 1,
      is_available: is_available === "true",
      image_url,
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price_per_unit, unit, description } = req.body;

    const image_url = req.file?.path;

    await productService.updateProduct(id, {
      name,
      price_per_unit,
      unit,
      description,
      image_url,
    });

    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductService.deleteProduct(id);

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();
    return success(res, products, "Products fetched");
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
