const express = require('express');
const router = express.Router();

const gamemodel = require('./model/game');

module.exports = ()=>{
  router.post("/save",(request,response)=>{
    console.log(request.body);
    let game = JSON.parse(request.body.game);
    if(game.uid){
      return gamemodel.update(game).then(()=>{
        response.status(200).send();
      },()=>{
        response.status(500).send({reason:"error trying to update game"});
      });
    }
    else{
      return gamemodel.create(game).then(()=>{
        response.status(200).send();
      },()=>{
        response.status(500).send({reason:"error trying to create game"});
      });
    }
  });

  router.post("/list",(request,response)=>{
    gamemodel.list(request.body.platform).then(games=>{
      response.json(games);
    });
  });

  router.post("/listall",(request,response)=>{
    gamemodel.listAll().then(games=>{
      response.json(games);
    });
  });

  return router;
};