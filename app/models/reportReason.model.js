module.exports = (sequelize, Sequelize) => {
  const ReportReason = sequelize.define("reportReason", {
    reportReasonId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return ReportReason;
};
