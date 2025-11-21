module.exports = (sequelize, Sequelize) => {
  const ActivityItem = sequelize.define("activityItem", {
    itemId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    activityId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "activities",
        key: "activityId",
      },
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "productId",
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return ActivityItem;
};
