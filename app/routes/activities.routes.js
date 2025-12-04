module.exports = (app) => {
  const activity = require("../controllers/activity.controller");

  var router = require("express").Router();

  // Create a new Activity
  router.post("/", activity.create);

  // Retrieve all Activities
  router.get("/", activity.findAll);

  // Retrieve a single Activity with id
  router.get("/:id", activity.findOne);

  // Get all activities with statusId 1 for a specific userId
  router.get("/user/:userId/status/1", activity.findByUserIdAndStatusId);

  // Get activities by userId
  router.get("/user/:userId", activity.findByUserId);

  // Update a Activity with id
  router.put("/:id", activity.update);

  // Delete a Activity with id
  router.delete("/:id", activity.delete);

  // Delete all Activities
  router.delete("/", activity.deleteAll);

  // Set PickUpDate
  router.put("/:id", activity.SetPickUpDate);

  app.use("/api/activities", router);
};
