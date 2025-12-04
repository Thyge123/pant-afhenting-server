module.exports = (sequelize, Sequelize) => {
  const PantLocation = sequelize.define("pantLocation", {
    pantLocationId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    openingHours: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    contactPhone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return PantLocation;
};