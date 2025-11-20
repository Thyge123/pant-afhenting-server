export default (sequelize, DataTypes) => {
  const ReportReason = sequelize.define("reportReason", {
    reportReasonId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return ReportReason;
};
