const User = require('./models/User');

module.exports = function (app) {

  // Application ------------------------------------------
  app.get('/', function (req, res) {
    res.sendfile('./app/client/index.html');
  });

  // Login
  app.get('*', function (req, res) {
    res.sendfile('./app/client/login.html');
  });

};
