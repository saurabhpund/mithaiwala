import API from "../api/axios";

function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/cart",
        {
          product_id: product.id,
          quantity: 250,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to cart");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
      <h3>{product.name}</h3>
      <p>₹{product.price_per_unit} per {product.unit}</p>
      <button onClick={addToCart}>Add 250g</button>
    </div>
  );
}

export default ProductCard;