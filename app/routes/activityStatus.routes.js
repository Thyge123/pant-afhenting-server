export default (app) => {
  const activityStatus = require("../controllers/activityStatus.controller");

  var router = require("express").Router();

  // Create a new ActivityStatus
  router.post("/", activityStatus.create);

  // Retrieve all ActivityStatuses
  router.get("/", activityStatus.findAll);

  // Retrieve a single ActivityStatus with id
  router.get("/:id", activityStatus.findOne);

  // Update a ActivityStatus with id
  router.put("/:id", activityStatus.update);

  // Delete a ActivityStatus with id
  router.delete("/:id", activityStatus.delete);

  // Delete all ActivityStatuses
  router.delete("/", activityStatus.deleteAll);

  app.use("/api/activityStatus", router);
};
