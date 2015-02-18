'use strict';
/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular.module('beoi', [
  'beoi.modules.main',
  'beoi.modules.dashboard',
  'beoi.modules.contest',
  'beoi.modules.contestant',
  'auth0'
]).config([
  'authProvider', '$httpProvider', '$logProvider',
  function (authProvider, $httpProvider, $logProvider) {
  console.log('app.config');
  $logProvider.debugEnabled(true);
  authProvider.init({
    domain: 'beoi.auth0.com',
    clientID: 'dmr6gDogihnwo6O47BD6eclcqjvITc8q',
    callbackURL: location.href
  });
}])
.run(['auth',function(auth) {
  console.log('app.run');
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
}]);
