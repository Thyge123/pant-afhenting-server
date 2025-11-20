export default (sequelize, Sequelize) => {
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
    StatusId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "activityStatuses",
        key: "statusId",
      },
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
      },
    },
    PickUpDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
  return Activity;
};
