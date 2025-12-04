const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "railway",
  "root",
  "UCcCvCRNdyDSuOsOIrKpRvtkPyRFFOSh",
  {
    // database, username, password (skal måske ændres afhængig af setup)
    host: "shortline.proxy.rlwy.net",
    dialect: "mysql",
    port: 15685, // Ændre til din MySQL port
  }
);

sequelize
  .authenticate()
  .then(() => console.log("DB connection OK"))
  .catch((err) => console.error("DB connection error:", err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

db.users = require("./user.model.js")(sequelize, Sequelize);
db.activities = require("./activity.model.js")(sequelize, Sequelize);
db.reportReasons = require("./reportReason.model.js")(sequelize, Sequelize);
db.reports = require("./report.model.js")(sequelize, Sequelize);
db.activityItems = require("./activityItem.model.js")(sequelize, Sequelize);
db.activityStatus = require("./activityStatus.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.pickUps = require("./pickUp.model.js")(sequelize, Sequelize);
db.chats = require("./chat.model.js")(sequelize, Sequelize);

// One user can have many activities
db.users.hasMany(db.activities, {
  foreignKey: "userId",
  as: "activities",
});
db.activities.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

// One activity can have many activity items
db.activities.hasMany(db.activityItems, {
  foreignKey: "activityId",
  as: "activityItems",
});
db.activityItems.belongsTo(db.activities, {
  foreignKey: "activityId",
  as: "activity",
});

// One activity item belongs to one product
db.activityItems.belongsTo(db.products, {
  foreignKey: "productId",
  as: "product",
});

// One category can have many products
db.categories.hasMany(db.products, {
  foreignKey: "categoryId",
  as: "products",
});
db.products.belongsTo(db.categories, {
  foreignKey: "categoryId",
  as: "category",
});

// One activity belongs to one status
db.activities.belongsTo(db.activityStatus, {
  foreignKey: "statusId",
  as: "activityStatus",
});

// One activity can have one report
db.activities.hasOne(db.reports, {
  foreignKey: "activityId",
  as: "report",
});
db.reports.belongsTo(db.activities, {
  foreignKey: "activityId",
  as: "activity",
});

// One report belongs to one report reason
db.reports.belongsTo(db.reportReasons, {
  foreignKey: "reportReasonId",
  as: "reportReason",
});

// One activity can have one pick up
db.activities.hasOne(db.pickUps, {
  foreignKey: "activityId",
  as: "pickUp",
});
db.pickUps.belongsTo(db.activities, {
  foreignKey: "activityId",
  as: "activity",
});

// One pick up belongs to one user
db.pickUps.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

// One user can have many chats
db.users.hasMany(db.chats, {
  foreignKey: "senderId",
  as: "chats",
});
db.chats.belongsTo(db.users, {
  foreignKey: "senderId",
  as: "user",
});

// One activity can have many chats
db.activities.hasMany(db.chats, {
  foreignKey: "activityId",
  as: "chats",
});
db.chats.belongsTo(db.activities, {
  foreignKey: "activityId",
  as: "activity",
});

module.exports = db;
