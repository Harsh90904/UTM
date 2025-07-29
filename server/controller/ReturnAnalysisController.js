const ReturnAnalysis = require('../models/ReturnAnalysis');

// Create a new return analysis record
const createReturnAnalysis = async (req, res) => {
  try {
    const { orderID, productID, reason, returnDate, remarks } = req.body;
    if (!orderID || !productID || !reason || !returnDate) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }
    const returnAnalysis = new ReturnAnalysis({ orderID, productID, reason, returnDate, remarks });
    await returnAnalysis.save();
    res.status(201).json({ message: "Return analysis record created successfully", returnAnalysis });
  } catch (error) {
    console.error("Error creating return analysis record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all return analysis records
const getAllReturnAnalysis = async (req, res) => {
  try {
    const records = await ReturnAnalysis.find()
      .populate('orderID', 'orderId')
      .populate('productID', 'name sku');
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching return analysis records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get return analysis record by ID
const getReturnAnalysisById = async (req, res) => {
  try {
    const record = await ReturnAnalysis.findById(req.params.id)
      .populate('orderID', 'orderId')
      .populate('productID', 'name sku');
    if (!record) return res.status(404).json({ message: "Return analysis record not found" });
    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching return analysis record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update return analysis record
const updateReturnAnalysis = async (req, res) => {
  try {
    const { orderID, productID, reason, returnDate, remarks } = req.body;
    const updated = await ReturnAnalysis.findByIdAndUpdate(
      req.params.id,
      { orderID, productID, reason, returnDate, remarks },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Return analysis record not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating return analysis record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete return analysis record
const deleteReturnAnalysis = async (req, res) => {
  try {
    const deleted = await ReturnAnalysis.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Return analysis record not found" });
    res.status(200).json({ message: "Return analysis record deleted successfully" });
  } catch (error) {
    console.error("Error deleting return analysis record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createReturnAnalysis,
  getAllReturnAnalysis,
  getReturnAnalysisById,
  updateReturnAnalysis,
  deleteReturnAnalysis,
};