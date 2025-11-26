module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    barcode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "categoryId",
      },
    },
  });

  return Product;
};
