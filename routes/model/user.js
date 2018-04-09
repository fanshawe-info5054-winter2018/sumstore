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
        .then(() => {
          resolve(user);
        });
    });
  },
  update: function (user) {
    return firebase.database().ref("users/" + user.uid).update(user);
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
        .then(() => {
          resolve(order);
        });
    });
  },
  cancelOrder: function (order) {
    return new Promise((resolve, reject) => {
      let orderref = firebase.database().ref("orders/"+order.uid);
      return orderref.once("value")
        .then(snapshot => {
          let order = snapshot.val();
          order.status = "Cancelled";
          orderref.update(order);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getOrders: function (user) {
    return new Promise((resolve, reject) => {
      return firebase.database().ref("orders").orderByChild('user').once("value")
        .then(snapshot => {
          let orders = Object.values(snapshot.val());
          resolve(orders.filter((order) => {
            return order.user == user;
          }));
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  likeGame: function (user, game, like) {
    return new Promise((resolve, reject) => {
      let likedgamesref = firebase.database().ref("users/" + user.uid + "/likedgames");
      return likedgamesref.once("value")
        .then(snapshot => {
          let likedgames = snapshot.val();
          for (let key in likedgames) {
            if (likedgames[key] == game.uid) {
              likedgamesref.child(key).remove();
            }
          }
          if (like) {
            likedgamesref.push().set(game.uid);
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getLikedGames: function (user) {
    return new Promise((resolve, reject) => {
      return firebase.database().ref("users/" + user.uid + "/likedgames").once("value")
        .then(snapshot => {
          let likedGames = snapshot.val() ? Object.values(snapshot.val()) : [];
          resolve(likedGames);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};