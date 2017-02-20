/* eslint-env node */
var request = require("request");

var opts = {
  method: 'POST',
  url: 'https://homebase.auth0.com/oauth/token',
  headers: {
    'content-type': 'application/json'
  },
  body: '{"client_id":"MEQNKprc6kunb5fHWjYsmsGINQ1s2YpZ","client_secret":"3_fpzUHPtLIgzmzNnA2zWlVZPtLGy73ts1DqOUq7J4wm5OcPJv0zAWHd7z4LeVXY","audience":"https://api.jeremiahgibson.io","grant_type":"client_credentials"}'
};

var postBody = {
  title: 'Hello',
  body: 'World'
};

request(opts, function requestFunction(error, response, body) {
  if (error) {
    throw new Error(error);
  }

  var options = {
    method: 'POST',
    uri: 'https://api.jeremiahgibson.io/message/send',
    headers: {
      contentType: 'application/json',
      authorization: 'Bearer ' + JSON.parse(body).access_token
    },
    json: postBody
  };

  request(options, function requestCallback(err, res, b) {
    if (err) {
      throw new Error(err);
    }
    console.log(body);
  });
});
