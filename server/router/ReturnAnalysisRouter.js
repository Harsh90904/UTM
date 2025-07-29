const { Router } = require("express");
const returnAnalysisRouter = Router();
const {
  createReturnAnalysis,
  getAllReturnAnalysis,
  getReturnAnalysisById,
  updateReturnAnalysis,
  deleteReturnAnalysis,
} = require("../controller/ReturnAnalysisController");

returnAnalysisRouter.post("/", createReturnAnalysis);
returnAnalysisRouter.get("/", getAllReturnAnalysis);
returnAnalysisRouter.get("/:id", getReturnAnalysisById);
returnAnalysisRouter.put("/:id", updateReturnAnalysis);
returnAnalysisRouter.delete("/:id", deleteReturnAnalysis);

module.exports = returnAnalysisRouter;