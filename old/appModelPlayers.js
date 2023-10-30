"use strict";
var sql = require("./db.js");

//Player object constructor
var Player = function (Player) {
  this.lastname = Player.lastname;
  this.firstname = Player.firstname;
  this.license = Player.license;
};

Player.createPlayer = function (newPlayer, result) {
  sql.query("INSERT INTO players set ?", newPlayer, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Player.getAllPlayer = function (result) {
  sql.query("Select * from players", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("Player : ", res);
      result(null, res);
    }
  });
};

module.exports = Player;