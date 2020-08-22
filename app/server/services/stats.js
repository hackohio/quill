const _ = require('underscore');
const async = require('async');

const SettingsController = require('../controllers/SettingsController');
const User = require('../models/User');

// In memory stats.
let stats = {};

/**
 * This is a function used to filter the demographics stats between sumbitted,
 * confirmed, and checkedIn based on when in the registation timeline it
 * currently is. 
 * 
 * @param {*} user The user to check
 * @returns Whether or not this user should be included in demographic information
 */
const shouldCalculateDemo = (user, registrationTimes) => {
  const { timeClose = 0 } = registrationTimes == null ? {} : registrationTimes;
  const now = Date.now();
  let shouldCalculate = user.status.completedProfile;
  if (now > timeClose) {
    shouldCalculate = shouldCalculate && user.status.confirmed;
  }
  if (now > process.env.EVENT_START_TIME) {
    shouldCalculate = shouldCalculate && user.status.checkedIn;
  }
  return shouldCalculate;
};

function calculateStats(_err, registrationTimes) {
  console.log('Calculating stats...');
  const newStats = {
    lastUpdated: 0,

    total: 0,
    demo: {
      gender: {
        M: 0,
        F: 0,
        B: 0,
        O: 0,
        N: 0
      },
      schools: {},
      majors: {},
      month: {
        'January': 0,
        'February': 0,
        'March': 0,
        'April': 0,
        'May': 0,
        'June': 0,
        'July': 0,
        'August': 0,
        'September': 0,
        'October': 0,
        'November': 0,
        'December': 0,
      },
      year: {
        '2020': 0,
        '2021': 0,
        '2022': 0,
        '2023': 0,
      },
      degree: {
        'Associates': 0,
        'Bachelors': 0,
        'Masters': 0,
        'Doctorate': 0,
      }
    },

    teams: {},
    verified: 0,
    submitted: 0,
    admitted: 0,
    confirmed: 0,
    confirmedOsu: 0,
    declined: 0,

    confirmedFemale: 0,
    confirmedMale: 0,
    confirmedNonBinary: 0,
    confirmedOther: 0,
    confirmedNone: 0,

    shirtSizes: {
      'XS': 0,
      'S': 0,
      'M': 0,
      'L': 0,
      'XL': 0,
      'XXL': 0,
      'WXS': 0,
      'WS': 0,
      'WM': 0,
      'WL': 0,
      'WXL': 0,
      'WXXL': 0,
      'None': 0
    },

    dietaryRestrictions: {},

    /*hostNeededFri: 0,
    hostNeededSat: 0,
    hostNeededUnique: 0,

    hostNeededFemale: 0,
    hostNeededMale: 0,
    hostNeededOther: 0,
    hostNeededNone: 0,*/


    wantsHardware: 0,
    wantsSwag: 0,

    checkedIn: 0,
  };

  User
    .find({})
    .exec(function (err, users) {
      if (err || !users) {
        throw err;
      }

      newStats.total = users.length;

      async.each(users, function (user, callback) {

        // Grab the email extension
        var email = user.email.split('@')[1];

        // Count verified
        newStats.verified += user.verified ? 1 : 0;

        // Count submitted
        newStats.submitted += user.status.completedProfile ? 1 : 0;

        // Count accepted
        newStats.admitted += user.status.admitted ? 1 : 0;

        // Count confirmed
        newStats.confirmed += user.status.confirmed ? 1 : 0;

        // Count confirmed that are osu
        newStats.confirmedOsu += (user.status.confirmed && (email === "osu.edu") || (email === "buckeyemail.osu.edu"));

        newStats.confirmedFemale += user.status.confirmed && user.profile.gender == "F" ? 1 : 0;
        newStats.confirmedMale += user.status.confirmed && user.profile.gender == "M" ? 1 : 0;
        newStats.confirmedNonBinary += user.status.confirmed && user.profile.gender == "B" ? 1 : 0;
        newStats.confirmedOther += user.status.confirmed && user.profile.gender == "O" ? 1 : 0;
        newStats.confirmedNone += user.status.confirmed && user.profile.gender == "N" ? 1 : 0;

        // Count declined
        newStats.declined += user.status.declined ? 1 : 0;

        // Count checked in
        newStats.checkedIn += user.status.checkedIn ? 1 : 0;

        // Count the number of people who want hardware
        newStats.wantsHardware += user.confirmation.wantsHardware ? 1 : 0;

        // Count the number of people who want hardware
        newStats.wantsSwag += user.profile.swag ? 1 : 0;

        // Count shirt sizes
        if (user.confirmation.shirtSize in newStats.shirtSizes) {
          newStats.shirtSizes[user.confirmation.shirtSize] += 1;
        }

        // Dietary restrictions
        if (user.confirmation.dietaryRestrictions) {
          user.confirmation.dietaryRestrictions.forEach(function (restriction) {
            if (!newStats.dietaryRestrictions[restriction]) {
              newStats.dietaryRestrictions[restriction] = 0;
            }
            newStats.dietaryRestrictions[restriction] += 1;
          });
        }

        // If the user should not have demographic information calculated for
        // it, skip the remaining stat calculations
        if (!shouldCalculateDemo(user, registrationTimes)) {
          callback();
          return;
        }

        // Add to the gender
        newStats.demo.gender[user.profile.gender] += 1;

        // Count schools
        if (!newStats.demo.schools[email]) {
          newStats.demo.schools[email] = {
            submitted: 0,
            admitted: 0,
            confirmed: 0,
            declined: 0,
          };
        }
        newStats.demo.schools[email].submitted += user.status.completedProfile ? 1 : 0;
        newStats.demo.schools[email].admitted += user.status.admitted ? 1 : 0;
        newStats.demo.schools[email].confirmed += user.status.confirmed ? 1 : 0;
        newStats.demo.schools[email].declined += user.status.declined ? 1 : 0;

        // Count graduation months
        if (user.profile.graduationMonth) {
          newStats.demo.month[user.profile.graduationMonth] += 1;
        }

        // Count graduation years
        if (user.profile.graduationYear) {
          newStats.demo.year[user.profile.graduationYear] += 1;
        }

        // Count degrees
        if (user.profile.degree) {
          newStats.demo.degree[user.profile.degree] += 1;
        }

        // Grab the team name if there is one
        // if (user.teamCode && user.teamCode.length > 0){
        //   if (!newStats.teams[user.teamCode]){
        //     newStats.teams[user.teamCode] = [];
        //   }
        //   newStats.teams[user.teamCode].push(user.profile.name);
        // }

        /*// Host needed counts
        newStats.hostNeededFri += user.confirmation.hostNeededFri ? 1 : 0;
        newStats.hostNeededSat += user.confirmation.hostNeededSat ? 1 : 0;
        newStats.hostNeededUnique += user.confirmation.hostNeededFri || user.confirmation.hostNeededSat ? 1 : 0;

        newStats.hostNeededFemale
          += (user.confirmation.hostNeededFri || user.confirmation.hostNeededSat) && user.profile.gender == "F" ? 1 : 0;
        newStats.hostNeededMale
          += (user.confirmation.hostNeededFri || user.confirmation.hostNeededSat) && user.profile.gender == "M" ? 1 : 0;
        newStats.hostNeededOther
          += (user.confirmation.hostNeededFri || user.confirmation.hostNeededSat) && user.profile.gender == "O" ? 1 : 0;
        newStats.hostNeededNone
          += (user.confirmation.hostNeededFri || user.confirmation.hostNeededSat) && user.profile.gender == "N" ? 1 : 0;*/


        // Majors
        if (user.profile.major) {
          if (!newStats.demo.majors[user.profile.major]) {
            newStats.demo.majors[user.profile.major] = 0;
          }
          newStats.demo.majors[user.profile.major] += 1;
        }

        callback(); // let async know we've finished
      }, function () {
        // Transform dietary restrictions into a series of objects
        var restrictions = [];
        _.keys(newStats.dietaryRestrictions)
          .forEach(function (key) {
            restrictions.push({
              name: key,
              count: newStats.dietaryRestrictions[key],
            });
          });
        newStats.dietaryRestrictions = restrictions;

        // Transform majors into a series of objects
        var majors = [];
        _.keys(newStats.demo.majors)
          .forEach(function (key) {
            majors.push({
              name: key,
              count: newStats.demo.majors[key],
            });
          });
        newStats.demo.majors = majors;

        // Transform schools into an array of objects
        var schools = [];
        _.keys(newStats.demo.schools)
          .forEach(function (key) {
            schools.push({
              email: key,
              count: newStats.demo.schools[key].confirmed,
              stats: newStats.demo.schools[key]
            });
          });
        newStats.demo.schools = schools;

        const demoSummary = {
          basedOff: 'Submitted',
          count: newStats.submitted
        };
        const now = Date.now();
        if (now > registrationTimes.timeClose) {
          demoSummary.basedOff = 'Confirmed';
          demoSummary.count = newStats.confirmed;
        }
        if (now > process.env.EVENT_START_TIME) {
          demoSummary.basedOff = 'Checked In';
          demoSummary.count = newStats.checkedIn;
        }
        newStats.demoSummary = demoSummary;

        // Likewise, transform the teams into an array of objects
        // var teams = [];
        // _.keys(newStats.teams)
        //   .forEach(function(key){
        //     teams.push({
        //       name: key,
        //       users: newStats.teams[key]
        //     });
        //   });
        // newStats.teams = teams;

        console.log('Stats updated!');
        newStats.lastUpdated = new Date();
        stats = newStats;
      });
    });

}

// Calculate once every five minutes.
SettingsController.getRegistrationTimes(calculateStats);
setInterval(SettingsController.getRegistrationTimes.bind(this, calculateStats), 300000);

const Stats = {};

Stats.getUserStats = function () {
  return stats;
};

module.exports = Stats;
