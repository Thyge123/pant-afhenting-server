const db = require("../models");
const Chat = db.chats;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.message || !req.body.senderId || !req.body.activityId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Chat
  const chat = {
    message: req.body.message,
    senderId: req.body.senderId,
    activityId: req.body.activityId,
  };
  // Save Chat in the database
  Chat.create(chat)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Chat.",
      });
    });
};

exports.findAll = (req, res) => {
  const activityId = req.query.activityId;
  var condition = activityId ? { activityId: activityId } : null;
  Chat.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving chats.",
      });
    });
};

exports.findByActivity = (req, res) => {
  const activityId = req.params.activityId;
  Chat.findAll({ where: { activityId: activityId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving chats by activity.",
      });
    });
};

exports.findByUser = (req, res) => {
  const senderId = req.params.senderId;
  Chat.findAll({ where: { senderId: senderId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving chats by user.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Chat.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Chat with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Chat with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Chat.update(req.body, {
    where: { chatId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Chat was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Chat with id=${id}. Maybe Chat was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Chat with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Chat.destroy({
    where: { chatId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Chat was deleted successfully.",
        });
      } else {
        res.send({
          message: `Cannot delete Chat with id=${id}. Maybe Chat was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Chat with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Chat.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Chats were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all chats.",
      });
    });
};
