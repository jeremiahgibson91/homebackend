/* eslint-env node */
'use strict';

var bodyParser = require("body-parser");
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

function Config(app) {
  app.use(bodyParser.json({
    type: function type() {
      return true;
    }
  }));
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(function appUse(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://jeremiahgibson.io');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  // Middleware JWT Authentication
  var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://homebase.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://api.jeremiahgibson.io',
    issuer: "https://homebase.auth0.com/",
    algorithms: ['RS256']
  });

  // Middleware added to routes/unless
  app
    // Add security to all routes
    .use(jwtCheck
    // Routes that don't need to be secured
    .unless({path: [
      '/message/add'// block get
    ]}));

  app.use(function appUse(req, res, next) {
    app.logger.log('info', 'Request URL:' + req.url);
    next();
  });
}

module.exports = Config;
