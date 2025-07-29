import React, { useState } from "react";
import * as XLSX from "xlsx";

const AddProduct = () => {
  const [mode, setMode] = useState("manual"); // "manual" or "xlsx"
  const [form, setForm] = useState({
    name: "",
    sku: "",
    description: "",
    price: "",
    images: [],
    sellerID: "",
    category: "",
    stock: "",
  });
  const [xlsxProducts, setXlsxProducts] = useState([]);
  const [message, setMessage] = useState("");

  // Manual form handlers
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setForm({ ...form, images: Array.from(e.target.files) });
  };

  // XLSX file handler
  const handleXlsxChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const products = XLSX.utils.sheet_to_json(worksheet);
      setXlsxProducts(products);
    };
    reader.readAsArrayBuffer(file);
  };

  // Manual submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => formData.append("images", file));
        } else {
          formData.append(key, value);
        }
      });

      const res = await fetch("http://localhost:8090/api/product", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("Product added successfully!");
        setForm({
          name: "",
          sku: "",
          description: "",
          price: "",
          images: [],
          sellerID: "",
          category: "",
          stock: "",
        });
      } else {
        setMessage("Failed to add product.");
      }
    } catch (error) {
      setMessage("Server error.");
    }
  };

  // XLSX submit
  const handleXlsxSubmit = async (e) => {
    e.preventDefault();
    if (!xlsxProducts.length) {
      setMessage("No products found in file.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8090/api/product/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: xlsxProducts }),
      });
      if (res.ok) {
        setMessage("Products added from XLSX successfully!");
        setXlsxProducts([]);
      } else {
        setMessage("Failed to add products from XLSX.");
      }
    } catch (error) {
      setMessage("Server error.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 rounded-l ${
            mode === "manual" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("manual")}
        >
          Manual Entry
        </button>
        <button
          className={`flex-1 py-2 rounded-r ${
            mode === "xlsx" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("xlsx")}
        >
          Upload XLSX
        </button>
      </div>

      {mode === "manual" ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">SKU</label>
            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Seller ID</label>
            <input
              name="sellerID"
              value={form.sellerID}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      ) : (
        <form onSubmit={handleXlsxSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Upload XLSX File</label>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleXlsxChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          {xlsxProducts.length > 0 && (
            <div className="mb-2">
              <p className="font-medium mb-1">
                Preview ({xlsxProducts.length} products):
              </p>
              <div className="max-h-40 overflow-y-auto border rounded p-2 text-xs bg-gray-50">
                <pre>{JSON.stringify(xlsxProducts.slice(0, 5), null, 2)}</pre>
                {xlsxProducts.length > 5 && <div>...and more</div>}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Upload Products
          </button>
        </form>
      )}
      {message && (
        <p className="mt-4 text-center text-sm text-green-600">{message}</p>
      )}
    </div>
  );
};

export default AddProduct;
