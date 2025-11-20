export default (app) => {
  const reportReason = require("../controllers/reportReason.controller");

  const router = require("express").Router();

  // Create a new ReportReason
  router.post("/", reportReason.create);

  // Retrieve all ReportReasons
  router.get("/", reportReason.findAll);

  // Retrieve a single ReportReason with id
  router.get("/:id", reportReason.findOne);

  // Update a ReportReason with id
  router.put("/:id", reportReason.update);

  // Delete a ReportReason with id
  router.delete("/:id", reportReason.delete);

  // Delete all ReportReasons
  router.delete("/", reportReason.deleteAll);

  app.use("/api/reportReasons", router);
};
