'use strict';

var firebase = require('firebase-admin');
var firebaseAdmin = require("firebase-admin");

function Firebase(app) {
  // Admin credentials
  const credentials = {
    credential: firebaseAdmin.credential.cert("serviceAccountKey.json"),
    databaseURL: "https://homebase-2e648.firebaseio.com"
  }

  app.adminApp = firebaseAdmin.initializeApp(credentials);
  app.adminDB = app.adminApp.database();
  app.adminMessaging = app.adminApp.messaging();
}

module.exports = Firebase;
