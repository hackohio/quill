/**
 * IMPORTANT! READ FIRST!
 * 
 * Ensure your .env file is configured to the proper enviorment prior to 
 * running this script.
 */

// Connect to mongodb
require('dotenv').load({silent: true});
var mongoose        = require('mongoose');
var database        = process.env.DATABASE || "mongodb://localhost:27017";
mongoose.connect(database);

var UserController = require('../app/server/controllers/UserController');

var users = 1000;
var username = 'hacker';

for (var i = 0; i < users; i++){
  console.log(username, i);
  UserController
    .createUser(username + i + '@school.edu', 'foobar', function(err, {token, user}){
      if (err) console.log(err);      
    });
}
