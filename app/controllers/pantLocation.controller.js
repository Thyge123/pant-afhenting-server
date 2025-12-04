const db = require("../models");

const PantLocation = db.pantLocations;

const Op = db.Sequelize.Op;

// Create and Save a new PantLocation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  }

  if (!req.body.address) {
    res.status(400).send({ message: "Address can not be empty!" });
    return;
  }

  // Create a PantLocation
  const pantLocation = {
    name: req.body.name,
    address: req.body.address,
    openingHours: req.body.openingHours,
    contactPhone: req.body.contactPhone,
    isActive: req.body.isActive !== undefined ? req.body.isActive : true,
  };

  // Save PantLocation in the database
  PantLocation.create(pantLocation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PantLocation.",
      });
    });
};

// Find a single PantLocation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PantLocation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find PantLocation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving PantLocation with id=" + id,
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  const isActive = req.query.isActive;
  
  let condition = {};
  
  if (name) {
    condition.name = { [Op.like]: `%${name}%` };
  }
  
  if (isActive !== undefined) {
    condition.isActive = isActive === 'true';
  }

  PantLocation.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pantLocations.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  PantLocation.update(req.body, {
    where: { pantLocationId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PantLocation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update PantLocation with id=${id}. Maybe PantLocation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PantLocation with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  PantLocation.destroy({
    where: { pantLocationId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "PantLocation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete PantLocation with id=${id}. Maybe PantLocation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete PantLocation with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  PantLocation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} PantLocations were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pantLocations.",
      });
    });
};