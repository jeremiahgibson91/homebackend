/* eslint-env node */
var rp = require("request-promise");
var secrets = require('./secrets');

function getClientToken() {
  var options = {
    method: 'POST',
    url: 'https://homebase.auth0.com/oauth/token',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(secrets)
  };
  return rp(options);
}

function sendFCM(message, token) {
  var options = {
    method: 'POST',
    uri: 'https://api.jeremiahgibson.io/message/send',
    headers: {
      contentType: 'application/json',
      authorization: 'Bearer ' + token
    },
    json: message
  };
  return rp(options);
}

getClientToken()
  .then((body) => {
    var token = JSON.parse(body).access_token;
    var message = {
      title: 'Hello',
      body: 'World'
    };

    sendFCM(message, token)
      .then((res) => {
        console.log(res);
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
