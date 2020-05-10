ADMIN_EMAIL = process.env.ADMIN_EMAIL;
ADMIN_PASSWORD = process.env.ADMIN_PASS;

// Create a default admin user.
var User = require('../app/server/models/User');

const setupAdmin = () => {
  return User.findOne({
    email: ADMIN_EMAIL
  })
    .exec().then((user) => {
      if (!user) {
        console.log("Initial boot, setting up admin account.");
        const u = new User();
        u.email = ADMIN_EMAIL;
        u.password = User.generateHash(ADMIN_PASSWORD);
        u.admin = true;
        u.verified = true;
        return u.save();
      }
    });
};

// If there is already a user
module.exports = setupAdmin;
