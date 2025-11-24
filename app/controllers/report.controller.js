const db = require("../models");
const Report = db.reports;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const report = {
    reportReasonId: req.body.reportReasonId,
    activityId: req.body.activityId,
    description: req.body.description,
  };

  Report.create(report)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Report.",
      });
    });
};

exports.findAll = (req, res) => {
  const reportReasonId = req.query.reportReasonId;
  let condition = reportReasonId
    ? { reportReasonId: { [Op.like]: `%${reportReasonId}%` } }
    : null;

  Report.findAll({
    where: condition,
    include: [
      { model: db.activities, as: "activity" },
      { model: db.reportReasons, as: "reportReason" },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reports.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Report.findByPk(id, {
    include: [
      { model: db.activities, as: "activity" },
      { model: db.reportReasons, as: "reportReason" },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Report with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Report with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Report.update(req.body, {
    where: { reportId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Report was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Report with id=${id}. Maybe Report was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Report with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Report.destroy({
    where: { reportId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Report was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Report with id=${id}. Maybe Report was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Report with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Report.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Reports were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all reports.",
      });
    });
};
