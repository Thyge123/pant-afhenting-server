export default (sequelize, Sequelize) => {
  const ActivityStatus = sequelize.define("activityStatus", {
    statusId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return ActivityStatus;
};
