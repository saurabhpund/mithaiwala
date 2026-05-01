const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().allow(""),
  price_per_unit: Joi.number().positive().required(),
  unit: Joi.string().valid("KG", "GRAM", "PIECE", "BOX").required(),
  min_order_quantity: Joi.number().positive().required(),
});

module.exports = { productSchema };