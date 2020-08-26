const $ = require('jquery');

const angular = require('angular');
const uiRouter = require('angular-ui-router');

const app = angular.module('reg', [
  'ui.router',
]);

const constants = require('./constants.js');

const AuthService = require('./services/AuthService.js');
const AuthInterceptor = require('./interceptors/AuthInterceptor.js');
const Session = require('./modules/Session.js');

const routes = require('./routes.js');

app
  .config([
    '$httpProvider',
    function ($httpProvider) {

      // Add auth token to Authorization header
      $httpProvider.interceptors.push('AuthInterceptor');

    }])
  .run([
    'AuthService',
    'Session',
    function (AuthService, Session) {

      // Startup, login if there's  a token.
      const token = Session.getToken();
      if (token) {
        AuthService.loginWithToken(token);
      }

    }]);
