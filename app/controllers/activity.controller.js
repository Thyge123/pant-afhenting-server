const db = require("../models");
const Activity = db.activity;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.date) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const activity = {
    date: req.body.date,
    StatusId: req.body.StatusId,
    UserId: req.body.UserId,
    PickUpDate: null,
  };

  // Save Tutorial in the database
  Activity.create(activity)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Activity.",
      });
    });

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Activity.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving activities.",
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;

    Activity.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Activity with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Activity with id=" + id,
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;

    Activity.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Activity was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Activity with id=" + id,
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;

    Activity.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Activity was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Activity with id=" + id,
        });
      });
  };

  exports.deleteAll = (req, res) => {
    Activity.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Activities were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all activities.",
        });
      });
  };

  exports.SetPickUpDate = (req, res) => {
    const id = req.params.id;

    Activity.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "PickUpDate was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Activity with id=" + id,
        });
      });
  };
};
