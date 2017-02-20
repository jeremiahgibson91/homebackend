/* eslint-env node */

var Router = function appRouter(app) {
  // Routes
  app.get("/", function get(req, res) {
    res.send("Hello World");
  });

  app.post("/message/add", function postMessageAdd(req, res) {
    var token = req.body.token;
    var userProfile = JSON.parse(req.body.userProfile);
    var ua = req.headers['user-agent'];
    app.library.set({
      token,
      userAgent: ua,
      userProfile: userProfile
    });
    res.send(JSON.stringify({token}));
  });

  app.post("/message/send", function postMessageSend(req, res) {
    var registrationTokens = [];
    var payload = {
      notification: {
        title: req.body.title,
        body: req.body.body
      }
    };
    app.library.getTokens(function getTokens(registrationTokensObject) {
      registrationTokens = Object.keys(registrationTokensObject);
      app.adminMessaging.sendToDevice(registrationTokens, payload);
      res.send('Message sent!');
    });
  });
};

module.exports = Router;
