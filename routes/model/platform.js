const firebase = require(__base + "firebase/firebase.js");
module.exports = {
  create:function(platform){
    //create a new platform
    //platform structure
    /*
    {
      name:"name of the platform",
      games:[],
    }
    */
    let newplatform = firebase.database().ref("platforms").push();
    platform.uid = newplatform.key;
    return newplatform.set(platform);
  },
  list:function(){
    //lists all platforms, returns a promise with an array when resolved
    return new Promise((resolve,reject)=>{
      firebase.database().ref("platforms").once("value").then(snapshot=>{
        resolve(Object.values(snapshot.val()));
      },err=>{
        reject(err);
      });
    });
  },
  update:function(platform){
    //update platform
    return firebase.database().ref("platforms/"+platform.uid).update(platform);
  },
};