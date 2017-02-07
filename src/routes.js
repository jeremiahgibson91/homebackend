var appRouter = function(app) {
  // Routes
  app.get("/", function(req, res) {
    res.send("Hello World");
	}); 

  // TODO Store tokens sent to route in admin only database that /message/send reads from
  app.post("/message/add/:token", function(req, res) {
    res.send(req.params);
  });

  // Send message to all devices
  // TODO get tokens-devices from array available only to admin
  app.post("/message/send", function(req, res) {
    var payload = {
      notification: {
        title: "hello",
        body: "world"
      }
    };
    var registrationTokens = [
      "cHJYoxuWpUc:APA91bGuo2npGYNsMlGXaDmskptOUXbtAq36GyfV9pQkCxaNcAU7N73P8Pyox31iOdyUvl3l-LxfXGN1nrujeLWZ3GKKg25sJcHSPkvHaadRedWohQDJEEW8SVMZToZ7RTRjYtBDoNdh"
    ];
    app.adminMessaging.sendToDevice(registrationTokens, payload);
    res.send('Message sent!');
  });
}
 
module.exports = appRouter;
