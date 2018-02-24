const firebase = require(__base + "firebase/firebase.js");
module.exports = {
  create:function(game){
    //create a new game
    //game structure
    /*
    {
      name:"name of the game",
      platforms:{
        platformFirebaseID:{
          price:"price as a number",
          rating:"a number varying from 0 to 1"
        },
        platformFirebaseID:{
          price:"price as a number",
          rating:"a number varying from 0 to 1"
        }
      }
    }
    */
    return firebase.database().ref("games").push().set(game);
  },
  list:function(){
    //lists all games, returns a promise with the firebase snapshot when resolved
    return new Promise((resolve,reject)=>{
      firebase.database().ref("games").once("value").then(snapshot=>{
        resolve(snapshot);
      },err=>{
        reject(err);
      });
    });
  },
  update:function(game){
    return firebase.database().ref("games/"+game.uid).update(game);
  },
}