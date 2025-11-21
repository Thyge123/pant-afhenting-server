module.exports = (app) => {
  const activityItem = require("../controllers/activityItem.controller");

  var router = require("express").Router();

  // Create a new ActivityItem
  router.post("/", activityItem.create);

  // Retrieve all ActivityItems
  router.get("/", activityItem.findAll);

  // Retrieve a single ActivityItem with activityItemId
  router.get("/:id", activityItem.findOne);

  // Update a ActivityItem with activityItemId
  router.put("/:id", activityItem.update);

  // Delete a ActivityItem with activityItemId
  router.delete("/:id", activityItem.delete);

  // Delete all ActivityItems
  router.delete("/", activityItem.deleteAll);

  app.use("/api/activityItem", router);
};
