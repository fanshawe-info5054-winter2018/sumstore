const express = require('express');
const router = express.Router();

const gamemodel = require('./model/game');
const usermodel = require('./model/user');

module.exports = () => {
  router.post("/save", (request, response) => {
    console.log("saving", request.body);
    let game = JSON.parse(request.body.game);
    if (game.uid) {
      return gamemodel.update(game).then(() => {
        response.status(200).send();
      }, () => {
        response.status(500).send({ reason: "error trying to update game" });
      });
    }
    else {
      return gamemodel.create(game).then(() => {
        response.status(200).send();
      }, () => {
        response.status(500).send({ reason: "error trying to create game" });
      });
    }
  });

  router.post("/list", (request, response) => {
    gamemodel.list(request.body.platform).then(games => {
      response.json(games);
    });
  });

  router.post("/similar", (request, response) => {
    gamemodel.similar(request.body.gamelist).then(games => {
      // Initialize return array.
      let similargames = [];

      // Randomize and pick 3 games.
      if (games.length > 3) {
        do {
          similargames[similargames.length] = games.splice(
            Math.floor(Math.random() * games.length)
            , 1)[0];
        } while (similargames.length < 3);
      }
      else {
        similargames = games;
      }
      response.json(similargames);
    });
  });

  router.post("/fetch", (request, response) => {
    console.log("fetching", request.body);
    let gameuid = request.body.gameuid;
    let platformuid = request.body.platformuid;
    if (gameuid && platformuid) {
      return gamemodel.fetch({ platformuid, gameuid }).then((game) => {
        console.log(JSON.stringify(game));
        response.json(game);
      }, () => {
        response.status(500).send({ reason: "error trying to fetch a game" });
      });
    }
    else {
      response.status(500).send({ reason: "error trying to fetch a game" });
    }
  });

  router.post("/listall", (request, response) => {
    gamemodel.listAll().then(games => {
      response.json(games);
    });
  }, () => {
    response.status(500).send({ reason: "error trying to delete game" });
  });

  router.post("/remove", (request, response) => {
    console.log("deleting game:", request.body.game);
    let game = JSON.parse(request.body.game);
    gamemodel.remove(game).then(() => {
      response.status(200).send();
    });
  });

  router.post("/like", (request, response) => {
    let game = request.body.game;
    let like = request.body.like;
    return usermodel.decode(request.body.token)
      .then((user) => {
        return Promise.all([
          gamemodel.like(user, game, like),
          usermodel.likeGame(user, game, like)
        ]);
      })
      .then(() => {
        response.status(200).send();
      });
  });

  return router;
};