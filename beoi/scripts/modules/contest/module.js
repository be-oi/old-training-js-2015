'use strict';

/**
 * @ngdoc overview
 * @name app.modules.frontend
 * @description
 * # app.modules.frontend
 *
 * Frontend module of the application.
 */
angular
  .module(
    'beoi.modules.contest', 
    [
      'ui.router',
      'ngRoute'
    ]
  )
  .config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      
      console.log('configuring contest module')
      
      $stateProvider
        .state('contest', {
          parent: 'default',
          url: '/contest/:contest_id',
          templateUrl: 'scripts/modules/contest/views/contest.html',
          controller: 'ContestCtrl'
        });
  
      // $stateProvider
      //   .state('contest', {
      //     parent: 'default',
      //     templateUrl: 'scripts/modules/contest/views/module.html'
      //   })
      //   .state('contest.home', {
      //     url: '/homex',
      //     templateUrl: 'scripts/modules/contest/views/home.html',
      //     controller: 'HomeCtrl'
      //   })
      //   .state('contest.about', {
      //     url: '/about',
      //     templateUrl: 'scripts/modules/contest/views/about.html',
      //     controller: 'AboutCtrl'
      //   })
      //   .state('contest.contact', {
      //     url: '/contact',
      //     templateUrl: 'scripts/modules/contest/views/contact.html',
      //     controller: 'ContactCtrl'
      //   })
      
    }]);