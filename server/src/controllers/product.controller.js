const productService = require("../services/product.service");
const { success } = require("../utils/helpers");

const createProduct = async (req, res) => {
  try {
    const { name, price_per_unit, unit, description } = req.body;

    const image_url = req.file?.path; // Cloudinary URL

    const product = await productService.addProduct({
      name,
      price_per_unit,
      unit,
      description,
      image_url,
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating product" });
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
  getProductById
};