/* eslint-env node */
var express = require("express");
var app = express();

app.logger = require("./src/logger.js")(app);
require("./src/firebase.js")(app);
app.library = require("./src/library.js")(app);
require("./src/config.js")(app);
require("./src/routes.js")(app);

var server = app.listen(process.env.NODE_PORT, function serverFunction() {
  app.logger.log('info', "Listening on port %s...", server.address().port);
});
