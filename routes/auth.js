const express = require('express');
const router = express.Router();

const authmodel = require('./model/auth');

module.exports = () => {
  router.post("/register", (request, response) => {
    let decoded = Buffer.from(request.body.token, 'base64').toString();
    user = JSON.parse(decoded).user;
    user.password = Buffer.from(user.password).toString('base64');
    return authmodel.getUser(user)
      .then(oldUser => {
        if(!oldUser){
          return authmodel.register(user);
        }
        else{
          return Promise.reject("user already exists");
        }
      })
      .then(dbUser => {
        delete dbUser.password;
        console.log("dbUser");
        console.log(dbUser);
        response.json(authmodel.encode(dbUser));
      })
      .catch(err => {
        console.log(err);
        response.status(401);
        response.json(err);
      });
  });

  router.post("/login", (request, response) => {
    console.log(request.body.token);
    let decoded = Buffer.from(request.body.token, 'base64').toString();
    user = JSON.parse(decoded).user;
    authmodel.getUser(user)
      .then(dbUser => {
        if (dbUser) {
          dbUser = dbUser[Object.keys(dbUser)[0]];
          if (dbUser.username === user.username &&
            dbUser.password === Buffer.from(user.password).toString('base64')) {
            delete dbUser.password;
            response.json(authmodel.encode(dbUser));
          }
          else {
            console.log("invalid login attempt");
            response.status(401).send();
          }
        }
        else {
          console.log("account not found");
          response.status(401).send();
        }
      })
      .catch(err => {
        console.log(err);
        response.status(500).send();
      });
  });

  return router;
};