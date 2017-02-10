var express = require("express");
var bodyParser = require("body-parser");
var firebase = require('firebase-admin');
var firebaseAdmin = require("firebase-admin");

var app = express();

// Logging
const winston = require('winston')
// winston.log('info', 'Hello distributed log files!');
// winston.info('Hello again distributed logs');
// winston.level = 'debug';
// winston.log('debug', 'Now my debug messages are written to console!');

// Admin credentials
const credentials = {
  credential: firebaseAdmin.credential.cert("serviceAccountKey.json"),
  databaseURL: "https://homebase-2e648.firebaseio.com"
}

app.adminApp = firebaseAdmin.initializeApp(credentials);
app.adminDB = app.adminApp.database();
app.adminMessaging = app.adminApp.messaging();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var routes = require("./src/routes.js")(app);

var server = app.listen(process.env.NODE_PORT, function () {
    console.log("Listening on port %s...", server.address().port);
});

