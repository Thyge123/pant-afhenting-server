module.exports = (app) => {
  const chat = require("../controllers/chat.controller");
  var router = require("express").Router();
  // Create a new Chat
  router.post("/", chat.create);

  // Retrieve all Chats
  router.get("/", chat.findAll);

  // Retrieve a single Chat with id
  router.get("/:id", chat.findOne);

  // Retrieve Chats by Activity ID
  router.get("/activity/:activityId", chat.findByActivity);

  // Retrieve Chats by User ID
  router.get("/user/:senderId", chat.findByUser);

  // Update a Chat with id
  router.put("/:id", chat.update);

  // Delete a Chat with id
  router.delete("/:id", chat.delete);

  // Delete all Chats
  router.delete("/", chat.deleteAll);

  app.use("/api/chats", router);
};
