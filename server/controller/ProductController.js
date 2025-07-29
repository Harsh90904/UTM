const Product = require("../models/Product");

// Create a new product with multiple images
const createProduct = async (req, res) => {
  try {
    const { name, sku, description, price, sellerID, category, stock } =
      req.body;
    if (!name || !sku || !price || !sellerID) {
      return res
        .status(400)
        .json({ message: "Name, SKU, price, and sellerID are required" });
    }
    // Handle multiple images
    const images = req.files ? req.files.map((file) => file.path) : [];
    const product = new Product({
      name,
      sku,
      description,
      price,
      sellerID,
      category,
      stock,
      images,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "sellerID",
      "name marketplace"
    );
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "sellerID",
      "name marketplace"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, sku, description, price, sellerID, category, stock } =
      req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, sku, description, price, sellerID, category, stock },
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Bulk upload products from XLSX
const bulkUploadProducts = async (req, res) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided." });
    }

    // Validate and map products
    const validProducts = products
      .filter(
        (p) => p.name && p.sku && p.price && p.sellerID // required fields
      )
      .map((p) => ({
        name: p.name,
        sku: p.sku,
        description: p.description || "",
        price: p.price,
        sellerID: p.sellerID,
        category: p.category || "",
        stock: p.stock || 0,
        images: [], // XLSX can't upload images, leave empty or handle as needed
      }));

    if (validProducts.length === 0) {
      return res.status(400).json({ message: "No valid products in file." });
    }

    const inserted = await Product.insertMany(validProducts);
    res.status(201).json({
      message: `${inserted.length} products added successfully.`,
      products: inserted,
    });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkUploadProducts,
};
