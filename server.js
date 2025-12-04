const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

/*var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));*/
const db = require("./app/models");

//db.sequelize.sync();

// Use { force: true } to drop tables and recreate them with new schema
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to pant afhentning server." });
});

//require("./app/routes/tutorial.routes")(app);
require("./app/routes/activities.routes")(app);
require("./app/routes/activityItem.routes")(app);
require("./app/routes/activityStatus.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/pickUp.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/report.routes")(app);
require("./app/routes/reportReason.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/chat.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
