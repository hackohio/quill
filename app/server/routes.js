const User = require("./models/User");

module.exports = function (app) {
  // Application ------------------------------------------
  app.get("/", function (req, res) {
    if (req.session.isAuthorized) {
      res.sendfile("./app/client/index.html");
    } else {
      res.sendfile("./app/client/login.html");
    }
  });
};
