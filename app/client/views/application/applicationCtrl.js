const angular = require("angular");
const swal = require("sweetalert");

angular.module('reg')
  .controller('ApplicationCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$http',
    'currentUser',
    'settings',
    'Session',
    'UserService',
    function ($scope, $rootScope, $state, $http, currentUser, settings, Session, UserService) {

      // Set up the user
      $scope.user = currentUser.data;

      /*// Is the student from OSU?
      $scope.isOsuStudent = ($scope.user.email.split('@')[1] == 'osu.edu') || ($scope.user.email.split('@')[1] == 'buckeyemail.osu.edu');

      // If so, default them to adult: true
      if ($scope.isOsuStudent){
        $scope.user.profile.adult = true;
      }*/

      // Populate the school & major dropdowns
      populateSchools();
      populateMajors();
      _setupForm();

      $scope.regIsClosed = Date.now() > settings.data.timeClose;

      /**
       * TODO: JANK WARNING
       */
      function populateSchools() {
        $http
          .get('/assets/schools.json')
          .then(function (res) {
            const schools = res.data;
            const email = $scope.user.email.split('@')[1];

            if (schools[email]) {
              $scope.user.profile.school = schools[email].school;
              $scope.autoFilledSchool = true;
            }
          });

        $http
          .get('/assets/schools.csv')
          .then(function (res) {
            $scope.schools = res.data.split('\n');
            $scope.schools.push('Other');

            const content = [];

            for (i = 0; i < $scope.schools.length; i++) {
              $scope.schools[i] = $scope.schools[i].trim();
              content.push({ title: $scope.schools[i] });
            }

            $('#school.ui.search')
              .search({
                source: content,
                cache: true,
                onSelect: function (result, response) {
                  $scope.user.profile.school = result.title.trim();
                }
              });
          });
      }

      /**
       * TODO: JANK WARNING
       */
      function populateMajors() {
        $http
          .get('/assets/majors.csv')
          .then(function (res) {
            $scope.majors = res.data.split('\n');

            const content = [];

            for (i = 0; i < $scope.majors.length; i++) {
              $scope.majors[i] = $scope.majors[i].trim();
              content.push({ title: $scope.majors[i] });
            }

            $('#major.ui.search')
              .search({
                source: content,
                cache: true,
                onSelect: function (result, response) {
                  $scope.user.profile.major = result.title.trim();
                }
              });
              // This needs to be separate from above because of line 103, it may be combined but I have not tested it.
            $('#secondMajor.ui.search').search({
              source: content,
              cache: true,
              onSelect: function(result, response){
                $scope.user.profile.secondMajor = result.title.trim();
              }
            });
          });
      }

      function _updateUser(e) {
        UserService
          .updateProfile(Session.getUserId(), $scope.user.profile)
          .then(response => {
            swal("Awesome!", "Your application has been saved.", "success").then(value => {
              $state.go("app.dashboard");
            });
          }, response => {
            swal("Uh oh!", "Something went wrong.", "error");
          });
      }

      function isMinor() {
        return !$scope.user.profile.adult;
      }

      function minorsAreAllowed() {
        return settings.data.allowMinors;
      }

      function minorsValidation() {
        // Are minors allowed to register?
        if (isMinor() && !minorsAreAllowed()) {
          return false;
        }
        return true;
      }

      function _setupForm() {
        // Custom minors validation rule
        $.fn.form.settings.rules.allowMinors = function (value) {
          return minorsValidation();
        };

        // Semantic-UI form validation
        $('.ui.form').form({
          inline: true,
          fields: {
            name: {
              identifier: 'name',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter your name.'
                }
              ]
            },
            school: {
              identifier: 'school',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter your school name.'
                }
              ]
            },
            major: {
              identifier: 'major',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter your major.'
                }
              ]
            },
            month: {
              identifier: 'month',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please select your anticipated graduation month.'
                }
              ]
            },
            year: {
              identifier: 'year',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please select your anticipated graduation year.'
                }
              ]
            },
            degree: {
              identifier: 'degree',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please select your anticipated degree.'
                }
              ]
            },
            gender: {
              identifier: 'gender',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please select a gender.'
                }
              ]
            },
            adult: {
              identifier: 'adult',
              rules: [
                {
                  type: 'allowMinors',
                  prompt: 'You must be an adult, or an OSU student.'
                }
              ]
            }
          }
        });
      }

      $scope.submitForm = function () {
        if ($('.ui.form').form('validate form')) {
          _updateUser();
        } else {
          swal("Uh oh!", "Please Fill The Required Fields", "error");
        }
      };
    }]);
