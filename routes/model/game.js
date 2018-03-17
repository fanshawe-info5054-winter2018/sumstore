const firebase = require(__base + "firebase/firebase.js");

const platformmodel = require('./platform');

module.exports = {
  create:function(game){
    //create a new game
    //game structure
    /*
    {
      name:"name of the game",
      platform:platformFirebaseID,
      price:10.0,
      rating:1,
      qty:10
    }
    */
    let newgame = firebase.database().ref("platforms/"+game.platform+"/games").push();
    game.uid = newgame.key;
    return newgame.set(game);
  },
  list:function(platform){
    //lists all games from a platform, returns a promise with an array when resolved
    return new Promise((resolve,reject)=>{
      firebase.database().ref("platforms/"+platform+"/games").once("value").then(snapshot=>{
        resolve(Object.values(snapshot.val()));
      },err=>{
        reject(err);
      });
    });
  },
  fetch:function({platformuid,gameuid}){
    //lists all games from a platform, returns a promise with an array when resolved
    return new Promise((resolve,reject)=>{
      return firebase.database().ref("platforms/"+platformuid+"/games/"+gameuid).once("value").then(snapshot=>{
        resolve(snapshot.val());
      },err=>{
        reject(err);
      });
    });
  },
  listAll:function(){
    //lists all games from all platforms and sorts them by name, returns a promise with an array when resolved
    return new Promise((resolve,reject)=>{
      return platformmodel.list().then(platforms=>{
        let games = [];
        for (let i = 0; i < platforms.length; i++) {
          let platformname = platforms[i].name;
          if(platforms[i].games){
            games = games.concat(Object.values(platforms[i].games).map(function(game){
              game.platform = {
                uid:game.platform,
                name:this
              };
              return game;
            },platformname));
          }
        }
        games.sort((a,b)=>{
          if(a.name > b.name){
            return 1;
          }
          else if(a.name < b.name){
            return -1;
          }
          return 0;
        });
        resolve(games);
      });
    });
  },
  update:function(game){
    return firebase.database().ref("platforms/"+game.platform+"/games/"+game.uid).update(game);
  },
  remove:function(game){
    return firebase.database().ref("platforms/"+game.platform+"/games/").child(game.uid).remove();
  },
};