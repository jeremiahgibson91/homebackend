/* eslint-env node */
'use strict';

function Library(app) {
  return {
    getTokens: function getTokens(callback) {
      var db = app.adminDB;
      var ref = db.ref("registration_tokens");
      ref.once("value", function snapShot(snapshot) {
        callback(snapshot.val());
      });
    },
    set: function set(user) {
      var db = app.adminDB;
      var ref = db.ref("registration_tokens").child(user.token);
      ref.set({
        userAgent: user.userAgent,
        userProfile: user.userProfile
      }, function error(err) {
        if (err) {
          app.logger.log('debug', err);
        }
      });
    }
  };
}


module.exports = Library;
