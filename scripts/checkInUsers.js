require('dotenv').load();
const mongoose = require('mongoose');
const database = process.env.DATABASE || "mongodb://localhost:27017";

const ADMIN = { email: process.env.ADMIN_EMAIL };
const emailsRaw = require('fs').readFileSync('./slack_members.txt').toString().split('\r\n');

function logError(context, err) {
  console.log(`An error occured while ${context}: ${err}`);
}

// Setup the connection to the database
async function connectToDB() {
  try {
    await mongoose.connect(database);
    mongoose.connection.on('error', err => {
      logError('in connection', err);
    });
  } catch (error) {
    logError('connecting', error);
  }
}

// Checkin the users in the emails array.
// Note: The database connection must be made prior to running this.
function checkInUsers() {
  const UserController = require('../app/server/controllers/UserController');
  const User = require('../app/server/models/User');
  const emails = emailsRaw.filter(email => email.substr(email.length - 4) === '.edu');
  // const emails = ['registerhackohio@gmail.com', 'faketest@temp.edu'];
  const unadmitted = [];
  let count = 0;
  emails.forEach(email => {
    // console.log(`Getting ${email}`);
    User.findOne({
      email: email
    }, (err, user) => {
      // console.log(`Got ${email}`);
      if (err) {
        logError(`getting user with email ${email}`, err);
      }
      console.log(email);
      count += 1;
      // if there is no user with that email do nothing
      if (user == null) {
        console.log('No user found');
        return;
      }
      if (user.status.confirmed) {
        // Admit user
        UserController.admitUser(user.id, { email: 'registerhackohio@gmail.com' });
      } else {
        // Add to list of un admited
        unadmitted.push(email);
      }
      if (count == emails.length) {
        console.log("All proccessed");
        require('fs').writeFile("./unadmitted.txt", unadmitted.join('\n'), function (err) {
          if (err) {
            console.log(`Error while writing unconfirmed to file`);
            console.log(err);
          }
        });
      }
    });
  });
}

connectToDB().then(checkInUsers);
