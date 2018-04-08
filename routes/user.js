const express = require('express');
const router = express.Router();

const usermodel = require('./model/user');

module.exports = () => {
  router.post("/getorders", (request, response) => {
    console.log(request.body.token);
    return usermodel.decode(request.body.token)
      .then((user) => {
        return usermodel.getOrders(user.uid);
      })
      .then((orders) => {
        response.json(orders);
      });
  });

  router.post("/checkout", (request, response) => {
    console.log(request.body.token);
    let order = {
      address:request.body.address,
      payment:request.body.payment,
      products:request.body.products,
      total:request.body.total
    };
    return usermodel.decode(request.body.token)
      .then((user) => {
        console.log(JSON.stringify(user));
        order.user = user.uid;
        return usermodel.newOrder(order);
      })
      .catch((err) => {
          console.log(err);
          return usermodel.newOrder(order);
      })
      .then(() => {
        response.status(200).send();
      });
  });

  router.post("/update", (request, response) => {
      console.log(request.body);
      let user = JSON.parse(request.body.user);
      if(user.password){
          user.password = Buffer.from(user.password).toString('base64');
      }
      return usermodel.update(user).then(()=>{
          response.status(200).send();
      },()=>{
          response.status(500).send({reason:"error trying to update user"});
      });
  });
  return router;
};