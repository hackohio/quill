const Settings = require('../app/server/models/Settings');

const setupSettings = () => {
  return Settings.findOne({})
    .exec().then((settings) => {
      if (!settings) {
        console.log("Initial boot, setting up settings.");
        const settings = new Settings();
        return settings.save();
      }
      return Promise.resolve();
    });
};

module.exports = setupSettings;
