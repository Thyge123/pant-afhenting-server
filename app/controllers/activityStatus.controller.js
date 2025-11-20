const db = require("../models");
const ActivityStatus = db.activityStatus;
const op = db.Sequelize.Op;

// Create and Save a new ActivityStatus
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ActivityStatus
  const activityStatus = {
    name: req.body.name,
  };

  // Save ActivityStatus in the database
  ActivityStatus.create(activityStatus)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the ActivityStatus.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  ActivityStatus.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving activityStatuses.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ActivityStatus.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ActivityStatus with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ActivityStatus with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ActivityStatus.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ActivityStatus was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ActivityStatus with id=${id}. Maybe ActivityStatus was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ActivityStatus with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ActivityStatus.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ActivityStatus was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ActivityStatus with id=${id}. Maybe ActivityStatus was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ActivityStatus with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  ActivityStatus.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} ActivityStatuses were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all activityStatuses.",
      });
    });
};
