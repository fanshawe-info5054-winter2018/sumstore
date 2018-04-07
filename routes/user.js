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

  return router;
};