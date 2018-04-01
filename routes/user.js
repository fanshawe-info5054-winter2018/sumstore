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
          number:123,date:new Date(),status:"Shipped",tracking:"CA241221",price:29.59,products:[{
            game:"-L69ycax8smuoj4RbMWy"
          }]
        },
        {
          number:124,date:new Date(),status:"Shipped",tracking:"CA14231",price:59.65, products:[]
        },
        {
          number:125,date:new Date(),status:"Shipped",tracking:"CH13544353",price:21.99, products:[]
        },
        {
          number:126,date:new Date(),status:"Shipped",tracking:"CA51342",price:23.88, products:[]
        }
      ]);
    });
  });

  return router;
};