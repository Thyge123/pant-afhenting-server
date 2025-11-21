module.exports = (sequelize, Sequelize) => {
  const PickUp = sequelize.define("pickUp", {
    pickUpId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
      },
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

  return PickUp;
};
