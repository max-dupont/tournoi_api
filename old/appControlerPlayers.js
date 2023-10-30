"use strict";

var Player = require("./appModelPlayers.js");

exports.list_all_players = function (req, res, next) {
  Player.getAllPlayer(function (err, player) {
    if (err) res.send(err);
    res.send(player);
  });
};

exports.create_a_player = function (req, res, next) {
  var new_player = new Player(req.body);
  //handles null error
  if (!new_player.firstname || !new_player.lastname) {
    res
      .status(400)
      .send({ error: true, message: "Please provide player/status" });
  } else {
    Player.createPlayer(new_player, function (err, player) {
      if (err) res.send(err);
      res.json(player);
    });
  }
};