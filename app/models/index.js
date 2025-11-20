const Sequelize = require("sequelize");
const sequelize = new Sequelize("pantafhentning", "root", "root", {
  // database, username, password (skal måske ændres afhængig af setup)
  host: "localhost",
  dialect: "mysql",
  port: 3307, // Ændre til din MySQL port
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;
