const swal = require('sweetalert');

angular.module('reg')
  .controller('ConfirmationCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    'currentUser',
    'Utils',
    'UserService',
    function($scope, $rootScope, $state, currentUser, Utils, UserService){

      // Set up the user
      const user = currentUser.data;
      $scope.user = user;
      _setupDietaryRestictions();

      // Setup various constants
      $scope.pastConfirmation = Date.now() > user.status.confirmBy;
      $scope.formatTime = Utils.formatTime;
      $scope.fileName = user._id + "_" + user.profile.name.split(" ").join("_");

      // Setup Form Validation
      _setupForm();


      /**
       * Update dietary restriction checkboxes
       */
      function _setupDietaryRestictions(){
        const dietaryRestrictions = {
          'Vegetarian': false,
          'Vegan': false,
          'Halal': false,
          'Kosher': false,
          'Nut Allergy': false
        };
        const userDR = user.confirmation.dietaryRestrictions
        if (userDR != null){
          userDR.forEach(function(restriction){
            dietaryRestrictions[restriction] = true;
          });
        }
        $scope.dietaryRestrictions = dietaryRestrictions;
      }

      /**
       * Update the user confirmation using the user object in the scope.
       */
      function _updateUserConfirmation(){
        const confirmation = $scope.user.confirmation;

        // Transform dietary restrictions form JSON to Array
        const drs = [];
        Object.keys($scope.dietaryRestrictions).forEach(function(key){
          if ($scope.dietaryRestrictions[key] === true){
            drs.push(key);
          }
        });
        confirmation.dietaryRestrictions = drs;

        UserService
          .updateConfirmation(user._id, confirmation)
          .then(_response => {
            swal("Woo!", "You're confirmed!", "success").then(value => {
              $state.go("app.dashboard");
            });
          }, _error => {
            swal("Uh oh!", "Something went wrong.", "error");
          });
      }

      /**
       * Attach the sematntic UI form validations rules to the page. 
       */
      function _setupForm(){
        // Semantic-UI form validation
        $('.ui.form').form({
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

      /***
       * Upload the resume to the S3 bucket
       */
      function _uploadResume() {
        $("#resume").submit(function (e) {
          e.preventDefault();
          var formData = new FormData(this);
          formData.append('email', $scope.user.email);
          $.ajax({
            url: "https://make-ohio-2020.s3.amazonaws.com",
            type: 'POST',
            data: formData,
            success: function (data) {
              console.log('sucess');
              user.confirmation.resume = true;
            },
            error: function (e) {
              console.log('err'); // replace with proper error handling
              console.log(e)
            },
            cache: false,
            contentType: false,
            processData: false
          });
        });
        let uiForm = $('.ui.form');
        if (!user.confirmation.resume) {
          console.log('called');
          uiForm.form('add rule', 'resume', {
            identifier: 'resume_file',
            rules: [
              {
                type: 'empty',
                prompt: 'Please choose a file for your resume.'
              }
            ]
          });
        }
        console.log(user.confirmation.resume);
        console.log('submit');
        $("#resume").submit();
      }

      $scope.submitForm = function(){
        if ($('.ui.form').form('validate form')){
          _updateUserConfirmation();
          _uploadResume();
        }
        else{
          sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
        }
      };

    }]);
