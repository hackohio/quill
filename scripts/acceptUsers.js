require('dotenv').load();
const mongoose        = require('mongoose');
const database        = process.env.DATABASE || "mongodb://localhost:27017";

const ADMIN = { email: process.env.ADMIN_EMAIL };
const userArray = require('fs').readFileSync('./accepted.txt').toString().split('\n');

function logError(context, err) {
  console.log(`An error occured while ${context}: ${err}`)
}

// Setup the connection to the database
async function connectToDB() {
  try {
    await mongoose.connect(database);
    mongoose.connection.on('error', err => {
      logError('in connection', err);
    });
  } catch (error) {
    logError('connecting', error)
  }
}

// Accept the users in the userArray.
// Note: The database connection must be made prior to running this.
function acceptUsers(){
  const UserController = require('../app/server/controllers/UserController');
  let count = 0;
  userArray.forEach((rawID) => {
    const id = rawID.trim();
    UserController.admitUser( id, ADMIN, (err, user) => {
      if(err){
        logError(`admitting user ${id}`,err)
      }
      count += 1;
      if (count == userArray.length) {
        console.log("All Accepted");
      }
    });
  });
}

connectToDB().then(acceptUsers)
