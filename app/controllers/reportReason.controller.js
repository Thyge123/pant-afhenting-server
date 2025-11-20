const db = require("../models");
const ReportReason = db.reportReason;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.reason) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const reportReason = {
    reason: req.body.reason,
  };

  ReportReason.create(reportReason)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ReportReason.",
      });
    });
};

exports.findAll = (req, res) => {
  const reason = req.query.reason;
  let condition = reason ? { reason: { [Op.like]: `%${reason}%` } } : null;

  ReportReason.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reportReasons.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ReportReason.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ReportReason with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ReportReason with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ReportReason.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ReportReason was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ReportReason with id=${id}. Maybe ReportReason was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ReportReason with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ReportReason.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ReportReason was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ReportReason with id=${id}. Maybe ReportReason was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ReportReason with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  ReportReason.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} ReportReasons were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all reportReasons.",
      });
    });
};
