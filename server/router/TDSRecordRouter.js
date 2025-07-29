const { Router } = require("express");
const tdsRecordRouter = Router();
const {
  createTDSRecord,
  getAllTDSRecords,
  getTDSRecordById,
  updateTDSRecord,
  deleteTDSRecord,
} = require("../controller/TDSRecordController");

tdsRecordRouter.post("/", createTDSRecord);
tdsRecordRouter.get("/", getAllTDSRecords);
tdsRecordRouter.get("/:id", getTDSRecordById);
tdsRecordRouter.put("/:id", updateTDSRecord);
tdsRecordRouter.delete("/:id", deleteTDSRecord);

module.exports = tdsRecordRouter;