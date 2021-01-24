import axios from 'axios';

const base = '/api/settings/';

/**
 * Returns a promise which resolves to the public settings
 * @returns {Promise}
 */
function getPublicSettings() {
  return axios.get(base);
};

/**
 * Set the registration open and close times.
 * @param {Number} open 
 * @param {Number} close 
 * @returns {Promise}
 */
function updateRegistrationTimes(open, close) {
  return axios.put(base + 'times', {
    timeOpen: open,
    timeClose: close,
  });
};

/**
 * Update the confirmation date.
 * @param {Number} time 
 * @returns {Promise}
 */
function updateConfirmationTime(time) {
  return axios.put(base + 'confirm-by', {
    time: time
  });
};

/**
 * Get the whitelisted emails.
 * @returns {Promise} Resolves to the whitelisted emails
 */
function getWhitelistedEmails() {
  return axios.get(base + 'whitelist');
};

/**
 * Updates the whitelisted emails to only those provided here
 * @param {[String]} emails 
 * @returns {Promise}
 */
function updateWhitelistedEmails(emails) {
  return axios.put(base + 'whitelist', {
    emails: emails
  });
};

/**
 * Update the waitlist text
 * @param {String} text 
 * @returns {Promise}
 */
function updateWaitlistText(text) {
  return axios.put(base + 'waitlist', {
    text: text
  });
};

/**
 * Update the acceptance text
 * @param {String} text 
 * @returns {Promise}
 */
function updateAcceptanceText(text) {
  return axios.put(base + 'acceptance', {
    text: text
  });
};

/**
 * Update the confirmation text
 * @param {String} text 
 * @returns {Promise}
 */
function updateConfirmationText(text) {
  return axios.put(base + 'confirmation', {
    text: text
  });
};

/**
 * Update the field to allow minors 
 * @param {Boolean} allowMinors 
 */
function updateAllowMinors(allowMinors) {
  return axios.put(base + 'minors', {
    allowMinors: allowMinors
  });
};

export default SettingsService = {
  getPublicSettings,
  updateRegistrationTimes,
  updateConfirmationTime,
  getWhitelistedEmails,
  updateWhitelistedEmails,
  updateWaitlistText,
  updateAcceptanceText,
  updateConfirmationText,
  updateAllowMinors
}
