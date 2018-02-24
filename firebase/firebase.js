var firebase = require('firebase');
const authParameters = require('./firebase.json');

firebase.initializeApp(authParameters);

module.exports = firebase;