"use strict";
module.exports = function (app) {
  var playersControler = require("./appControlerPlayers");

  // players
  app
    .route("/players")
    .get(playersControler.list_all_players)
    .post(playersControler.create_a_player);
};
