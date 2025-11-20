export default (app) => {
  const activity = require("../controllers/activity.controller");

  var router = require("express").Router();

  // Create a new Activity
  router.post("/", activity.create);

  // Retrieve all Activities
  router.get("/", activity.findAll);

  // Retrieve a single Activity with id
  router.get("/:id", activity.findOne);

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
