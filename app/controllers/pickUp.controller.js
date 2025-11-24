const db = require("../models");

const PickUp = db.pickUps;

const Op = db.Sequelize.Op;

// Create and Save a new PickUp
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a PickUp
  const pickUp = {
    name: req.body.name,
    categoryId: req.body.categoryId,
  };

  // Save PickUp in the database
  PickUp.create(pickUp)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PickUp.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  PickUp.findByPk(id, {
    include: [{ model: db.users, as: "user" }],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PickUp with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PickUp with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  PickUp.findAll({
    where: condition,
    include: [{ model: db.users, as: "user" }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pickups.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  PickUp.update(req.body, {
    where: { pickUpId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PickUp was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update PickUp with id=${id}. Maybe PickUp was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PickUp with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PickUp.destroy({
    where: { pickUpId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PickUp was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete PickUp with id=${id}. Maybe PickUp was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PickUp with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  PickUp.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} PickUps were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pickups.",
      });
    });
};
