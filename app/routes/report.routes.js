export default (app) => {
  const report = require("../controllers/report.controller");

  const router = require("express").Router();

  // Create a new Report
  router.post("/", report.create);

  // Retrieve all Reports
  router.get("/", report.findAll);

  // Retrieve a single Report with id
  router.get("/:id", report.findOne);

  // Update a Report with id
  router.put("/:id", report.update);

  // Delete a Report with id
  router.delete("/:id", report.delete);

  // Delete all Reports
  router.delete("/", report.deleteAll);

  app.use("/api/reports", router);
};
