module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define("chat", {
    chatId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    timeStamp: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    senderId: {
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
  return Chat;
};
