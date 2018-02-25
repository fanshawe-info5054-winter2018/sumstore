const express = require('express');
const router = express.Router();

const platformmodel = require('./model/platform');

module.exports = ()=>{
  router.post("/save",(request,response)=>{
    let platform = JSON.parse(request.body.platform);
    if(platform.uid){
      return platformmodel.update(platform).then(()=>{
        response.status(200).send();
      },()=>{
        response.status(500).send({reason:"error while updating platform"});
      });
    }
    else{
      return platformmodel.create(platform).then(()=>{
        response.status(200).send();
      },()=>{
        response.status(500).send({reason:"error while creating platform"});
      });
    }
  });

  router.post("/list",(request,response)=>{
    platformmodel.list().then(platforms=>{
      response.json(platforms);
    });
  });

  return router;
};