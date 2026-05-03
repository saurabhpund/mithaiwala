import React, { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res?.data?.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Mithai Wala</h1>

      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Home;
