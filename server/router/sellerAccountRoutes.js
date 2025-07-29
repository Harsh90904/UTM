const { Router } = require("express");
const sellerrouter = Router();
const {
  createSellerAccount,
  getAllSellerAccounts,
  getSellerAccountById,
  updateSellerAccount,
  deleteSellerAccount,
} = require("../controller/sellerAccountController.js");

sellerrouter.post("/", createSellerAccount);
sellerrouter.get("/", getAllSellerAccounts);
sellerrouter.get("/:id", getSellerAccountById);
sellerrouter.patch("/:id", updateSellerAccount);
sellerrouter.delete("/:id", deleteSellerAccount);

module.exports = sellerrouter;
