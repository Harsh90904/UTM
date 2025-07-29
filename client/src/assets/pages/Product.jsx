import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext"; // adjust path if needed

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser(); // get current user
console.log("Current user:", user); // Debugging line to check user state
  useEffect(() => {
    fetch("http://localhost:8090/api/product")
      .then((res) => res.json())
      .then((data) => {
        // Support both { products: [...] } and [...] API responses
        const prods = Array.isArray(data.products)
          ? data.products
          : Array.isArray(data)
          ? data
          : [];
        setProducts(prods);
        setLoading(false);
        console.log("API response:", prods); // Debugging line to check API response
        console.log("API response:", prods.map((prod) => prod.sellerID)); // Debugging line to check API response

      })

      .catch(() => setLoading(false));
  }, []);

  // Filter products by sellerID if user is logged in
  const filteredProducts = user
    ? products.filter(
        (prod) =>
          prod.sellerID === user._id ||
          (typeof prod.sellerID === "object" && prod.sellerID?._id === user._id)
      )
    : products;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Product Page</h2>
      <div className="bg-white p-6 rounded-xl shadow">
        <h4 className="text-lg font-semibold mb-2">Product List</h4>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">SKU</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => (
                <tr key={prod._id}>
                  <td className="border px-4 py-2">{prod.name}</td>
                  <td className="border px-4 py-2">{prod.sku}</td>
                  <td className="border px-4 py-2">{prod.price}</td>
                  <td className="border px-4 py-2">{prod.category}</td>
                  <td className="border px-4 py-2">{prod.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Product;
