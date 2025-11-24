const db = require("../models");
const ActivityItem = db.activityItems;
const Op = db.Sequelize.Op;

// Create and Save a new ActivityItem
exports.create = (req, res) => {
  // Validate request
  if (!req.body.activityId || !req.body.productId || !req.body.quantity) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a ActivityItem
  const activityItem = {
    activityId: req.body.activityId,
    productId: req.body.productId,
    quantity: req.body.quantity,
  };

  // Save ActivityItem in the database
  ActivityItem.create(activityItem)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ActivityItem.",
      });
    });
};

// Retrieve all ActivityItems from the database.
exports.findAll = (req, res) => {
  const activityId = req.query.activityId;
  const productId = req.query.productId;
  let condition = activityId
    ? { activityId: { [Op.like]: `%${activityId}%` } }
    : null;

  ActivityItem.findAll({
    where: condition,
    include: [
      { model: db.activities, as: "activity" },
      { model: db.products, as: "product" },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving activityItems.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ActivityItem.findByPk(id, {
    include: [
      { model: db.activities, as: "activity" },
      { model: db.products, as: "product" },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ActivityItem with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ActivityItem with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ActivityItem.update(req.body, {
    where: { itemId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ActivityItem was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ActivityItem with id=${id}. Maybe ActivityItem was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ActivityItem with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ActivityItem.destroy({
    where: { itemId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ActivityItem was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ActivityItem with id=${id}. Maybe ActivityItem was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ActivityItem with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  ActivityItem.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} ActivityItems were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all activityItems.",
      });
    });
};
