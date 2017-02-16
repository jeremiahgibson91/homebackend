var appRouter = function(app) {
  // Routes
  app.get("/", function(req, res) {
    res.send("Hello World");
	}); 

  app.post("/message/add", function(req, res) {
    var token = req.body.token;
		app.library.set(token);
    res.send(JSON.stringify({token}));
  });

  app.post("/message/send", function(req, res) {
		var registrationTokens = [];
    var payload = {
      notification: {
        title: req.body.title,
        body: req.body.body
      }
    };
    app.library.getTokens(function(registrationTokensObject) {
			registrationTokens = Object.keys(registrationTokensObject);
			app.adminMessaging.sendToDevice(registrationTokens, payload);
			res.send('Message sent!');
		});
  });
}
 
module.exports = appRouter;
