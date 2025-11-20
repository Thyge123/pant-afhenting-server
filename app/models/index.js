const Sequelize = require("sequelize");
const sequelize = new Sequelize("pantafhentning", "root", "root", {
  // database, username, password (skal måske ændres afhængig af setup)
  host: "localhost",
  dialect: "mysql",
  port: 3306, // Ændre til din MySQL port
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

db.users = require("./user.model.js").default(sequelize, Sequelize);
db.activities = require("./activity.model.js").default(sequelize, Sequelize);
db.reportReasons = require("./reportReason.model.js").default(
  sequelize,
  Sequelize
);
db.reports = require("./report.model.js").default(sequelize, Sequelize);
db.activityItems = require("./activityItem.model.js").default(
  sequelize,
  Sequelize
);
db.activityStatus = require("./activityStatus.model.js").default(
  sequelize,
  Sequelize
);
db.categories = require("./category.model.js").default(sequelize, Sequelize);
db.products = require("./product.model.js").default(sequelize, Sequelize);
db.pickUps = require("./pickUp.model.js").default(sequelize, Sequelize);

module.exports = db;
