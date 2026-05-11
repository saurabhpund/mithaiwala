
import { FiSearch } from "react-icons/fi";
import Kajukatli from "../../assets/kajukatli.jpg";
import Motichoor from "../../assets/motichoor.jpg";
import Gulabjam from "../../assets/gulabjam.jpg";
import Pista from "../../assets/rasmalai.jpg";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import ProductCard from "../../components/user/ProductCard";
import Navbar from "../../components/user/Navbar";

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#fffdf7] text-[#5d4037]">
      <Navbar />

      {/* HEADER */}
      <div className="text-center py-16  bg-[#fff1f2]">
        <h1 className="text-3xl font-bold">Our Sweet Collection</h1>
        <p className="text-sm text-[#8c7b75] mt-2">
          Handcrafted with love and tradition. Choose from our wide range of
          authentic Indian sweets and savories.
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center py-6">
        <div className="flex items-center border rounded-full px-4 py-2 w-[400px] bg-white shadow-sm">
          <FiSearch />
          <input
            type="text"
            placeholder="Search sweets..."
            className="ml-2 w-full outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="px-12 pb-12 grid grid-cols-4 gap-8">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-4 text-[#8c7b75]">
            No sweets found
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}


