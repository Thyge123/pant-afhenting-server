module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    activityId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    statusId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "activityStatuses",
        key: "statusId",
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
      },
    },
    pickUpDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
  return Activity;
};
