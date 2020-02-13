const swal = require('sweetalert');

angular.module('reg')
  .controller('AdminUserCtrl',[
    '$scope',
    '$http',
    'user',
    'UserService',
    function($scope, $http, User, UserService){
      $scope.selectedUser = User.data;

      // Populate the school dropdown
      populateSchools();
      populateMajors();
      _setupForm();

      /**
       * TODO: JANK WARNING
       */
      function populateSchools(){
        $http
          .get('assets/schools.json')
          .then(function(res){
            var schools = res.data;
            var email = $scope.selectedUser.email.split('@')[1];

            if (schools[email]){
              $scope.selectedUser.profile.school = schools[email].school;
              $scope.autoFilledSchool = true;
            }
          });

          $http
            .get('/assets/schools.csv')
            .then(function(res){
              $scope.schools = res.data.split('\n');
              $scope.schools.push('Other');

              var content = [];

              for(i = 0; i < $scope.schools.length; i++) {
                $scope.schools[i] = $scope.schools[i].trim();
                content.push({title: $scope.schools[i]})
              }

              $('#school.ui.search')
                .search({
                  source: content,
                  cache: true,
                  onSelect: function(result, response) {
                    $scope.selectedUser.profile.school = result.title.trim();
                  }
                })
            });
      }

      /**
       * TODO: JANK WARNING
       */
      function populateMajors(){
        $http
          .get('/assets/majors.csv')
          .then(function(res){
            $scope.majors = res.data.split('\n');

            var content = [];

            for(i = 0; i < $scope.majors.length; i++) {
              $scope.majors[i] = $scope.majors[i].trim();
              content.push({title: $scope.majors[i]})
            }

            $('#major.ui.search')
              .search({
                source: content,
                cache: true,
                onSelect: function(result, response) {
                  $scope.selectedUser.profile.major = result.title.trim();
                }
              })
          });
      }

      var dietaryRestrictions = {
        'Vegetarian': false,
        'Vegan': false,
        'Halal': false,
        'Kosher': false,
        'Nut Allergy': false
      };

      if ($scope.selectedUser.confirmation.dietaryRestrictions){
        $scope.selectedUser.confirmation.dietaryRestrictions.forEach(function(restriction){
          if (restriction in dietaryRestrictions){
            dietaryRestrictions[restriction] = true;
          }
        });
      }

      $scope.dietaryRestrictions = dietaryRestrictions;

      $scope.needTravel = function(){
        let needsReimbursement = !$scope.selectedUser.confirmation.needsReimbursement;
        if (needsReimbursement) {
          _addTravelRequirments()
        } else {
          _removeTravelRequirments();
        }
      }

      $scope.submitProfile = function(){
        if ($('.ui.form#profile').form('validate form')){
          _updateProfile();
        }
        else{
          sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
        }
      };

      $scope.submitConfirmation = function(){
        if ($('.ui.form#confirmation').form('validate form')){
          _updateConfirmation();
        }
        else{
          sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
        }
      }

      function _setupForm(){
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

        $scope.selectedUser.confirmation.needsReimbursement && _addTravelRequirments();
      }

      function _addTravelRequirments(){
        let uiForm = $('.ui.form#confirmation');
        uiForm.form('add rule', 'legalName', {
          identifier: 'legalName',
          rules: [
            {
              type: 'empty',
              prompt: 'Please type your full legal name.'
            }
          ]
        });
        uiForm.form('add rule', 'reimbursementType', {
          identifier: 'reimbursementType',
          rules: [
            {
              type: 'empty',
              prompt: 'Please indicate the kind of reimbursement.'
            }
          ]
        });
        uiForm.form('add rule', 'addressLine1', {
          identifier: 'addressLine1',
          rules: [
            {
              type: 'empty',
              prompt: 'Please type your address.'
            }
          ]
        });
        uiForm.form('add rule', 'city', {
          identifier: 'city',
          rules: [
            {
              type: 'empty',
              prompt: 'Please provide your city.'
            }
          ]
        });
        uiForm.form('add rule', 'state', {
          identifier: 'state',
          rules: [
            {
              type: 'empty',
              prompt: 'Please provide your state.'
            }
          ]
        });
        uiForm.form('add rule', 'zip', {
          identifier: 'zip',
          rules: [
            {
              type: 'empty',
              prompt: 'Please provide your zip.'
            }
          ]
        });
        uiForm.form('add rule', 'country', {
          identifier: 'country',
          rules: [
            {
              type: 'empty',
              prompt: 'Please provide your country.'
            }
          ]
        });
      }

      function _removeTravelRequirments(){
        let uiForm = $('.ui.form#confirmation');
        uiForm.form('remove fields', [
          'legalName',
          'reimbursementType',
          'addressLine1',
          'city',
          'state',
          'zip',
          'country'
        ])
      }

      function _updateProfile(){
        UserService
          .updateProfile($scope.selectedUser._id, $scope.selectedUser.profile)
          .then(response => {
            $selectedUser = response.data;
            swal("Updated!", "Profile updated.", "success");
          }, response => {
            swal("Oops, you forgot something.");
          });
      }

      function _updateConfirmation(){
        var confirmation = $scope.selectedUser.confirmation;
        // Get the dietary restrictions as an array
        var drs = [];
        Object.keys($scope.dietaryRestrictions).forEach(function(key){
          if ($scope.dietaryRestrictions[key]){
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
