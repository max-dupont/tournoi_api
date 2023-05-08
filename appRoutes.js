"use strict";
module.exports = function (app) {
  var playersControler = require("./appControlerPlayers");
  var gamesControler = require("./appControlerGames");

  // players
  app
    .route("/players")
    .get(playersControler.list_all_players)
    .post(playersControler.create_a_player);

  // games
  app
    .route("/games")
    .get(gamesControler.list_all_games)
    .post(gamesControler.create_a_game);

  };
