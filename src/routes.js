var Library = require('./library');
const winston = require('winston')
		 
var appRouter = function(app) {
	var library = new Library(app);
  // Routes
  app.get("/", function(req, res) {
    res.send("Hello World");
	}); 

  app.post("/message/add/:token", function(req, res) {
		library.set(req.params.token);
    res.send(req.params.token);
  });

  app.post("/message/send", function(req, res) {
		var registrationTokens = [];
    var payload = {
      notification: {
        title: req.body.title,
        body: req.body.body
      }
    };
    library.getTokens(function(registrationTokensObject) {
			registrationTokens = Object.keys(registrationTokensObject);
			app.adminMessaging.sendToDevice(registrationTokens, payload);
			res.send('Message sent!');
		});
  });
}
 
module.exports = appRouter;
