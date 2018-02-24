const express = require('express');
const router = express.Router();

const gamemodel = require('./model/game');
const platformmodel = require('./model/platform');

module.exports = ()=>{
  router.post("/create",(request,repsonse)=>{
    let newgame = request.body.game;
    platformmodel.list().then(snapshot=>{
      let platforms = snapshot.val();
      for (const key in newgame.platforms) {
        if (newgame.platforms.hasOwnProperty(key)) {
          if(platforms[key] == null){
            response.status(500).send({reason:"invalid platform id"});
            return;
          }
        }
      }
      gamemodel.create(newgame);
      response.status(200);
    });
  });

  router.post("/list",(request,response)=>{
    gamemodel.list().then(snapshot=>{
      response.json(snapshot.val());
    });
  });

  return router;
};