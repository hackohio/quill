const User = require("./models/User");

module.exports = function (app) {
  // Application ------------------------------------------
  app.get("/", function (req, res) {
    console.log(req.session);
    if (req.session.isAuthorized) {
      res.sendfile("./app/client/index.html");
    } else {
      res.sendfile("./app/client/login.html");
    }
  });
};
