const swal = require('sweetalert');

angular.module('reg')
  .controller('AdminUserCtrl', [
    '$scope',
    '$http',
    'user',
    'UserService',
    function ($scope, $http, User, UserService) {
      $scope.selectedUser = User.data;

      // Populate the school dropdown
      populateSchools();
      populateMajors();
      _setupForm();

      /**
       * TODO: JANK WARNING
       */
      function populateSchools() {
        $http
          .get('assets/schools.json')
          .then(function (res) {
            const schools = res.data;
            const email = $scope.selectedUser.email.split('@')[1];

            if (schools[email]) {
              $scope.selectedUser.profile.school = schools[email].school;
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
                  $scope.selectedUser.profile.school = result.title.trim();
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
                  $scope.selectedUser.profile.major = result.title.trim();
                }
              });
          });
      }

      const dietaryRestrictions = {
        'Vegetarian': false,
        'Vegan': false,
        'Halal': false,
        'Kosher': false,
        'Nut Allergy': false
      };

      if ($scope.selectedUser.confirmation.dietaryRestrictions) {
        $scope.selectedUser.confirmation.dietaryRestrictions.forEach(function (restriction) {
          if (restriction in dietaryRestrictions) {
            dietaryRestrictions[restriction] = true;
          }
        });
      }

      $scope.dietaryRestrictions = dietaryRestrictions;

      $scope.submitProfile = function () {
        if ($('.ui.form#profile').form('validate form')) {
          _updateProfile();
        }
        else {
          sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
        }
      };


      /***
       * Upload the resume to the S3 bucket
       */
      function _uploadResume() {
        const resumeUploadData = new FormData($("#resume")[0]);
        return $.ajax({
          url: "https://hack-ohio-2020.s3.amazonaws.com",
          type: 'POST',
          data: resumeUploadData,
          cache: false,
          contentType: false,
          processData: false
        })
          .then(response => {
            $scope.selectedUser.confirmation.resume = true;
            return response;
          });
      }

      $scope.submitConfirmation = function () {
        if ($('.ui.form#confirmation').form('validate form')) {
          _uploadResume()
            .then(_updateConfirmation)
            .catch(_error => swal("Uh oh!", "Something went wrong.", "error"));
        }
        else {
          sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
        }
      };

      function _setupForm() {
        // Semantic-UI form validation
        $('.ui.form#profile').form({
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
                  type: 'checked',
                  prompt: 'You must be an adult, or an OSU student.'
                }
              ]
            }
          }
        });

        $('.ui.form#confirmation').form({
          inline: true,
          fields: {
            shirt: {
              identifier: 'shirt',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please give us a shirt size!'
                }
              ]
            },
            ethnicity: {
              identifier: 'ethnicity',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please select a race/ethnicity.'
                }
              ]
            },
            phone: {
              identifier: 'phone',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please enter a phone number.'
                }
              ]
            },
            signatureLiability: {
              identifier: 'signatureLiabilityWaiver',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please type your digital signature.'
                }
              ]
            },
            /*signaturePhotoRelease: {
              identifier: 'signaturePhotoRelease',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please type your digital signature.'
                }
              ]
            },*/
            signatureCodeOfConduct: {
              identifier: 'signatureCodeOfConduct',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please type your digital signature.'
                }
              ]
            },
          }
        });
      }

      function _updateProfile() {
        UserService
          .updateProfile($scope.selectedUser._id, $scope.selectedUser.profile)
          .then(response => {
            $selectedUser = response.data;
            swal("Updated!", "Profile updated.", "success");
          }, error => {
            swal(error.status === 423 ? error.data.message : "Oops, you forgot something.");
          });
      }

      function _updateConfirmation() {
        const confirmation = $scope.selectedUser.confirmation;
        // Get the dietary restrictions as an array
        const drs = [];
        Object.keys($scope.dietaryRestrictions).forEach(function (key) {
          if ($scope.dietaryRestrictions[key]) {
            drs.push(key);
          }
        });
        confirmation.dietaryRestrictions = drs;

        UserService
          .updateConfirmation($scope.selectedUser._id, $scope.selectedUser.confirmation)
          .then(response => {
            $selectedUser = response.data;
            swal("Updated!", "Confirmation updated.", "success");
          }, response => {
            swal("Oops, you forgot something.");
          });
      };

    }]);
