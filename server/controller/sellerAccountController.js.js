const SA = require("../models/SellerAccount");

const createSellerAccount = async (req, res) => {
  try {
    const { name, marketplace, apiCredentials, xlsFilePath } = req.body;
    if (!name || !marketplace) {
      return res
        .status(400)
        .json({ message: "Name and marketplace are required" });
    }
    const newSellerAccount = new SA({
      name,
      marketplace,
      apiCredentials,
      xlsFilePath,
    });
    await newSellerAccount.save();
    res.status(201).send({
      message: "Seller account created successfully",
      sellerAccount: newSellerAccount,
    });
  } catch (error) {
    console.error("Error creating seller account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllSellerAccounts = async (req, res) => {
  try {
    const sellerAccounts = await SA.find();
    res.status(200).send({
      message: "Seller accounts fetched successfully",
      sellerAccounts,
    });
  } catch (error) {
    console.error("Error fetching seller accounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSellerAccountById = async (req, res) => {
  try {
    const account = await SellerAccount.findById(req.params.id);
    if (!account)
      return res.status(404).json({ error: "Seller account not found" });
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving seller account" });
  }
};

const updateSellerAccount = async (req, res) => {
  try {
    const updatedAccount = await SellerAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAccount)
      return res.status(404).json({ error: "Seller account not found" });
    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(500).json({ error: "Failed to update seller account" });
  }
};

const deleteSellerAccount = async (req, res) => {
  try {
    const deleted = await SellerAccount.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Seller account not found" });
    res.status(200).json({ message: "Seller account deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete seller account" });
  }
};

module.exports = {
    createSellerAccount,
    getAllSellerAccounts,
    getSellerAccountById,
    updateSellerAccount,
    deleteSellerAccount,
}