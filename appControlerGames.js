"use strict";

var Game = require("./appModelGames.js");

exports.list_all_games = function (req, res, next) {
  Game.getAllGame(function (err, game) {
    if (err) res.send(err);
    res.send(game);
  });
};

exports.create_a_game = function (req, res, next) {
  var new_game = new Game(req.body);
  //handles null error
  if (!new_game.first_player && !new_game.second_player) {
    res
      .status(400)
      .send({ error: true, message: "Please provide game/status" });
  } else {
    Game.createGame(new_game, function (err, game) {
      if (err) res.send(err);
      res.json(game);
    });
  }
};

exports.read_a_game = function (req, res, next) {
  Game.getGameById(req.params.gameId, function (err, game) {
    if (err) res.send(err);
    res.json(game);
  });
};

exports.update_a_game = function (req, res, next) {
  Game.updateById(req.params.gameId, new Game(req.body), function (err, game) {
    if (err) res.send(err);
    res.json(game);
  });
};

exports.delete_a_game = function (req, res, next) {
  Game.remove(req.params.gameId, function (err, game) {
    if (err) res.send(err);
    res.json({ message: "Game successfully deleted" });
  });
};

exports.delete_all_games = function (req, res, next) {
  Game.removeAllGame(function (err, game) {
    if (err) res.send(err);
    res.json({ message: "Games successfully deleted" });
  });
};
