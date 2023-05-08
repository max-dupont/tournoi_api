"use strict";
var sql = require("./db.js");

//Game object constructor
var Game = function (Game) {
  this.tower = Game.tower;
  this.number = Game.number;
  this.first_player = Game.first_player;
  this.second_player = Game.second_player;
  this.winner = Game.winner;
};

Game.createGame = function (newGame, result) {
  if (newGame.first_player != newGame.second_player) {
    sql.query("INSERT INTO games set ?", newGame, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  } else {
    result("Error : player 1 must be different of player 2", null);
  }
};
Game.getGameById = function (GameId, result) {
  sql.query("Select * from games where id = ? ", GameId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};
Game.getAllGame = function (result) {
  sql.query(
    "Select game.id, tower, number, p1.id as first_player, concat(p1.firstname, ' ', p1.lastname) as first_player_name, p2.id as second_player, concat(p2.firstname, ' ', p2.lastname) as second_player_name, winner from games join player p1 on p1.id=game.first_player join player p2 on p2.id=game.second_player",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("Game : ", res);
        result(null, res);
      }
    }
  );
};
Game.updateById = function (id, Game, result) {
  sql.query(
    "UPDATE Game SET tower = ?, number = ?, first_player = ?, second_player = ?, winner = ? WHERE id = ?",
    [Game.tower, Game.number, Game.first_player, Game.second_player, Game.winner, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Game.remove = function (id, result) {
  sql.query("DELETE FROM games WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Game.removeAllGame = function (result) {
  sql.query("DELETE FROM games", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Game;
