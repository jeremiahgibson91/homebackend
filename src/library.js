'use strict';

function Library(app) {
  return {
    getTokens: function(callback) {
      var db = app.adminDB;
      var ref = db.ref("registration_tokens");
      ref.once("value", function(snapshot) {
        callback(snapshot.val());
      });
    },
    set: function(token, ua) {
      var db = app.adminDB;
      var ref = db.ref("registration_tokens").child(token);
      ref.set({
        userAgent: ua 
      } , function(err){
        if (err) {
          app.logger.log('debug', err);
        }	
      });
    }
  }
}


module.exports = Library;
