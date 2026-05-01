const db = require("../config/db");
const { productSchema } = require("../validators/product.validator");

const createProduct = async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const result = await productService.addProduct(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getAllProducts = async () => {
  const [rows] = await db.execute("SELECT * FROM products");
  return rows;
};

module.exports = {
  createProduct,
  getAllProducts,
};