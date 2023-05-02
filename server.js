const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
port = process.env.PORT || 3000;

const mysql = require("mysql");
// connection configurations
const mc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tournament",
});

// connect to database
mc.connect();

app.listen(port);
const cors = require("cors");
console.log("API server started on: " + port);
// Add headers
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  next();
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require("./appRoutes"); //importing route
routes(app); //register the route
