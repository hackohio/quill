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
      var user = currentUser.data;
      $scope.user = user;

      $scope.pastConfirmation = Date.now() > user.status.confirmBy;

      $scope.formatTime = Utils.formatTime;

      _setupForm();

      $scope.fileName = user._id + "_" + user.profile.name.split(" ").join("_");

      // -------------------------------
      // All this just for dietary restriction checkboxes fml

      var dietaryRestrictions = {
        'Vegetarian': false,
        'Vegan': false,
        'Halal': false,
        'Kosher': false,
        'Nut Allergy': false
      };

      if (user.confirmation.dietaryRestrictions){
        user.confirmation.dietaryRestrictions.forEach(function(restriction){
          if (restriction in dietaryRestrictions){
            dietaryRestrictions[restriction] = true;
          }
        });
      }

      $scope.dietaryRestrictions = dietaryRestrictions;

      // -------------------------------

      function _updateUser(e){
        var confirmation = $scope.user.confirmation;
        // Get the dietary restrictions as an array
        var drs = [];
        Object.keys($scope.dietaryRestrictions).forEach(function(key){
          if ($scope.dietaryRestrictions[key]){
            drs.push(key);
          }
        });
        confirmation.dietaryRestrictions = drs;

        UserService
          .updateConfirmation(user._id, confirmation)
          .then(response => {
            swal("Woo!", "You're confirmed!", "success").then(value => {
              $state.go("app.dashboard");
            });
          }, response => {
            swal("Uh oh!", "Something went wrong.", "error");
          });
      }

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


      function uploadResume(){
          $("#resume").submit(function(e) {
             e.preventDefault();
             var formData = new FormData(this);
             formData.append('email',$scope.user.email);
             $.ajax({
                 url: "https://make-ohio-2020.s3.amazonaws.com",
                 type: 'POST',
                 data: formData,
                 success: function (data) {
                     console.log('sucess');
                     user.confirmation.resume = true;
                 },
                 error: function () {
                     console.log('err'); // replace with proper error handling
                 },
                 cache: false,
                 contentType: false,
                 processData: false
             });
         });
         let uiForm = $('.ui.form');
         if(!user.confirmation.resume){
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
        uploadResume();
        if ($('.ui.form').form('validate form')){
          _updateUser();
        }
        else{
          sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
        }
      };

    }]);
