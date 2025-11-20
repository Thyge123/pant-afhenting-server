export default (app) => {
  const pickUps = require("../controllers/pickUp.controller");

  var router = require("express").Router();

  // Create and Save a new PickUp
  router.post("/", pickUps.create);

  // Retrieve all PickUps
  router.get("/", pickUps.findAll);

  // Retrieve a single PickUp with id
  router.get("/:id", pickUps.findOne);

  // Update a PickUp with id
  router.put("/:id", pickUps.update);

  // Delete a PickUp with id
  router.delete("/:id", pickUps.delete);

  // Delete all PickUps
  router.delete("/", pickUps.deleteAll);

  app.use("/api/pickUps", router);
};
