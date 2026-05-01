const cartModel = require("../models/cart.model");

const addToCart = async (user_id, data) => {
  const { product_id, quantity } = data;

  if (!product_id || !quantity) {
    throw new Error("Missing fields");
  }

  let cart = await cartModel.findCartByUser(user_id);

  let cart_id;

  if (!cart) {
    cart_id = await cartModel.createCart(user_id);
  } else {
    cart_id = cart.id;
  }

  const existingItem = await cartModel.findCartItem(cart_id, product_id);

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    await cartModel.updateCartItem(cart_id, product_id, newQuantity);

    return { message: "Cart updated" };
  }

  await cartModel.addCartItem(cart_id, product_id, quantity);

  return { message: "Item added to cart" };
};

const getCart = async (user_id) => {
  const cart = await cartModel.findCartByUser(user_id);

  if (!cart) {
    return [];
  }

  const items = await cartModel.getCartItems(cart.id);

  return items;
};

module.exports = {
  addToCart,
  getCart
};