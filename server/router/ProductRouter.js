const { Router } = require("express");
const productRouter = Router();
const upload = require("../middleware/upload");
const uploadExcelFile = require("../middleware/uploadExcel");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bulkUploadProducts,
} = require("../controller/ProductController");
// const { uploadExcel } = require("../controller/ExcelController");

// Accept up to 5 images per product
productRouter.post("/", upload.array("images", 5), createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.post("/bulk", bulkUploadProducts);

// productRouter.post("/upload", uploadExcelFile.single('file'), uploadExcel);

module.exports = productRouter;
