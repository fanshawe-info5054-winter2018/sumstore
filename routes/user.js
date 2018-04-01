const express = require('express');
const router = express.Router();

const usermodel = require('./model/user');

module.exports = () => {
  router.post("/getorders", (request, response) => {
    console.log(request.body.token);
    // let decoded = Buffer.from(request.body.token, 'base64').toString();
    usermodel.decode(request.body.token)
    .then((user)=>{
      console.log(JSON.stringify(user));
      //TODO: THIS IS A TEST CODE
      response.json([
        {
          number:123,date:new Date(),status:"Shipped",tracking:"CA241221",price:29.59
        },
        {
          number:124,date:new Date(),status:"Shipped",tracking:"CA14231",price:59.65
        },
        {
          number:125,date:new Date(),status:"Shipped",tracking:"CH13544353",price:21.99
        },
        {
          number:126,date:new Date(),status:"Shipped",tracking:"CA51342",price:23.88
        }
      ]);
    });
    // usermodel.getUser(user)
    //   .then(dbUser => {
    //     if (dbUser) {
    //       dbUser = dbUser[Object.keys(dbUser)[0]];
    //       if (dbUser.username === user.username &&
    //         dbUser.password === Buffer.from(user.password).toString('base64')) {
    //         delete dbUser.password;
    //         response.json(usermodel.encode(dbUser));
    //       }
    //       else {
    //         console.log("invalid login attempt");
    //         response.status(401).send();
    //       }
    //     }
    //     else {
    //       console.log("account not found");
    //       response.status(401).send();
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     response.status(500).send();
    //   });
  });

  return router;
};