const firebase = require(__base + "firebase/firebase.js");
module.exports = {
  create:function(platform){
    //create a new platform
    /*platform is only a string with the name of that platform*/
    return firebase.database().ref("platforms").push().set(platform);
  },
  list:function(){
    //lists all platforms, returns a promise with the firebase snapshot when resolved
    return new Promise((resolve,reject)=>{
      firebase.database().ref("platforms").once("value").then(snapshot=>{
        resolve(snapshot);
      },err=>{
        reject(err);
      });
    });
  },
}