const firebase = require(__base + "firebase/firebase.js");
const jwt = require("jsonwebtoken");
const secret = "not so secret";
module.exports = {
  decode: function (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(decoded);
        }
      });
    });
  },
  encode: function (payload) {
    return jwt.sign(payload, secret);
  },
  register: function (user) {
    return new Promise((resolve, reject) => {
      let newuser = firebase.database().ref("users").push();
      user.uid = newuser.key;
      return newuser.set(user)
      .then(()=>{
        resolve(user);
      });
    });
  },
  update: function (user) {
      return firebase.database().ref("users/"+user.uid).update(user);
  },
  getUser: function (user) {
    return new Promise((resolve, reject) => {
      return firebase.database().ref("users").orderByChild('username').equalTo(user.username).once("value")
        .then(snapshot => {
          resolve(snapshot.val());
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  newOrder: function (order) {
    return new Promise((resolve, reject) => {
      let neworder = firebase.database().ref("orders").push();
      order.uid = neworder.key;
      order.status = "Placed";
      order.date = new Date().toDateString();
      return neworder.set(order)
      .then(()=>{
        resolve(order);
      });
    });
  },
  getOrders: function (user) {
    return new Promise((resolve, reject) => {
      return firebase.database().ref("orders").orderByChild('user').once("value")
        .then(snapshot => {
          let orders = Object.values(snapshot.val());
          resolve(orders.filter((order)=>{
            return order.user == user;
          }));
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};