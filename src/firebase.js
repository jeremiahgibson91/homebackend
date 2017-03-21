/* eslint-env node */
'use strict';

var firebaseAdmin = require("firebase-admin");
var serviceAccount = require('../serviceAccountKey.json');

function Firebase(app) {
  // Admin credentials
  const credentials = {
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://homebase-2e648.firebaseio.com"
  };

  app.adminApp = firebaseAdmin.initializeApp(credentials);
  app.adminDB = app.adminApp.database();
  app.adminMessaging = app.adminApp.messaging();
}

module.exports = Firebase;
