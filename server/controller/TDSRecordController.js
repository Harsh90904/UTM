const TDSRecord = require('../models/TDSRecord');

// Create a new TDS record
const createTDSRecord = async (req, res) => {
  try {
    const { sellerID, orderID, tdsAmount, tdsDate, remarks } = req.body;
    if (!sellerID || !orderID || !tdsAmount || !tdsDate) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }
    const tdsRecord = new TDSRecord({ sellerID, orderID, tdsAmount, tdsDate, remarks });
    await tdsRecord.save();
    res.status(201).json({ message: "TDS record created successfully", tdsRecord });
  } catch (error) {
    console.error("Error creating TDS record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all TDS records
const getAllTDSRecords = async (req, res) => {
  try {
    const records = await TDSRecord.find().populate('sellerID', 'name').populate('orderID', 'orderId');
    res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching TDS records:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get TDS record by ID
const getTDSRecordById = async (req, res) => {
  try {
    const record = await TDSRecord.findById(req.params.id).populate('sellerID', 'name').populate('orderID', 'orderId');
    if (!record) return res.status(404).json({ message: "TDS record not found" });
    res.status(200).json(record);
  } catch (error) {
    console.error("Error fetching TDS record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update TDS record
const updateTDSRecord = async (req, res) => {
  try {
    const { sellerID, orderID, tdsAmount, tdsDate, remarks } = req.body;
    const updated = await TDSRecord.findByIdAndUpdate(
      req.params.id,
      { sellerID, orderID, tdsAmount, tdsDate, remarks },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "TDS record not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating TDS record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete TDS record
const deleteTDSRecord = async (req, res) => {
  try {
    const deleted = await TDSRecord.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "TDS record not found" });
    res.status(200).json({ message: "TDS record deleted successfully" });
  } catch (error) {
    console.error("Error deleting TDS record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createTDSRecord,
  getAllTDSRecords,
  getTDSRecordById,
  updateTDSRecord,
  deleteTDSRecord,
};