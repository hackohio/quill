/**
 * IMPORTANT! READ FIRST!
 * 
 * Ensure your .env file is configured to the proper enviorment prior to 
 * running this script.
 */

// Connect to mongodb
require('dotenv').load({ silent: true });
const mongoose = require('mongoose');
const database = process.env.DATABASE || "mongodb://localhost:27017";
mongoose.connect(database);

const UserController = require('../app/server/controllers/UserController');

const users = 1000;
const username = 'hacker';

for (let i = 0; i < users; i++) {
  console.log(username, i);
  UserController
    .createUser(username + i + '@school.edu', 'foobar', function (err, { token, user }) {
      if (err) console.log(err);
    });
}
