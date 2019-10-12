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

        $scope.user.confirmation.needsReimbursement && _addTravelRequirments();
      }

      function _addTravelRequirments(){
        let uiForm = $('.ui.form');
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
        let uiForm = $('.ui.form');
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

      $scope.needTravel = function(){
        let needsReimbursement = !$scope.user.confirmation.needsReimbursement;
        if (needsReimbursement) {
          _addTravelRequirments()
        } else {
          _removeTravelRequirments();
        }
      }

      $scope.submitForm = function(){
        if ($('.ui.form').form('validate form')){
          _updateUser();
        }
        else{
          sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
        }
      };

    }]);
