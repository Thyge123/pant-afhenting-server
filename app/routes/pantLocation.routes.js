module.exports = (app) => {
  const pantLocations = require("../controllers/pantLocation.controller");

  var router = require("express").Router();

  // Create and Save a new PantLocation
  router.post("/", pantLocations.create);

  // Retrieve all PantLocations
  router.get("/", pantLocations.findAll);

  // Retrieve a single PantLocation with id
  router.get("/:id", pantLocations.findOne);

  // Update a PantLocation with id
  router.put("/:id", pantLocations.update);

  // Delete a PantLocation with id
  router.delete("/:id", pantLocations.delete);

  // Delete all PantLocations
  router.delete("/", pantLocations.deleteAll);

  app.use("/api/pantLocations", router);
};