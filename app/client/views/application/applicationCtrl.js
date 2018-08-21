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
    function($scope, $rootScope, $state, $http, currentUser, Settings, Session, UserService){

      // Set up the user
      $scope.user = currentUser.data;

      // Is the student from OSU?
      $scope.isOsuStudent = ($scope.user.email.split('@')[1] == 'osu.edu') || ($scope.user.email.split('@')[1] == 'buckeyemail.osu.edu');

      // If so, default them to adult: true
      if ($scope.isOsuStudent){
        $scope.user.profile.adult = true;
      }

      // Populate the school & major dropdown
      populateSchools();
	    populateMajors();
      _setupForm();

      $scope.regIsClosed = Date.now() > Settings.data.timeClose;

      //Where frank started to break shit.
      $scope.degree = {
        choices:[ "Associates", "Bachelors", "Masters", "Ph.D", "Other" ]
      }

      /**
       * TODO: JANK WARNING
       */
      function populateSchools(){
        $http
          .get('assets/schools.json')
          .then(function(res){
            var schools = res.data;
            var email = $scope.user.email.split('@')[1];

            if (schools[email]){
              $scope.user.profile.school = schools[email].school;
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
                  $scope.user.profile.school = result.title.trim();
                }
              })
          });
      }

      function populateMajors(){
        $http
          .get('/assets/majors.csv')
          .then(function(res){
            $scope.majors = res.data.split('\n');
            $scope.majors.push('Other');

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
                  $scope.user.profile.major = result.title.trim();
                }
              })
          });
      }

      function _updateUser(e){
        UserService
          .updateProfile(Session.getUserId(), $scope.user.profile)
          .success(function(data){
            sweetAlert({
              title: "Awesome!",
              text: "Your application has been saved.",
              type: "success",
              confirmButtonColor: "#e76482"
            }, function(){
              $state.go('app.dashboard');
            });
          })
          .error(function(res){
            sweetAlert("Uh oh!", "Something went wrong.", "error");
          });
      }

      function isMinor() {
        return !$scope.user.profile.adult;
      }

      function minorsAreAllowed() {
        return Settings.data.allowMinors;
      }

      function minorsValidation() {
        // Are minors allowed to register?
        if (isMinor() && !minorsAreAllowed()) {
          return false;
        }
        return true;
      }
      function _setupForm(){
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
            year: {
              identifier: 'year',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please select your anticipated graduation date.'
                }
              ]
            },
            degree: {
              identifier: 'degree',
              rules: [
                {
                  type: 'empty',
                  prompt: 'Please select your highest degree achieved or being pursued.'
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
            },
          }
        });
      }



      $scope.submitForm = function(){
        if ($('.ui.form').form('is valid')){
          _updateUser();
        }
        else{
          sweetAlert("Uh oh!", "Please Fill The Required Fields", "error");
        }
      };

    }]);
