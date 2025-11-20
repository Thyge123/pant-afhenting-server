export default (sequelize, Sequelize) => {
  const Report = sequelize.define("report", {
    reportId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reportReasonId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "reportReasons",
        key: "reportReasonId",
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    activityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "activities",
        key: "activityId",
      },
    },
  });

  return Report;
};
