'use strict';

angular
  .module(
    'beoi.modules.dashboard', 
    [
      'ui.router',
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngTouch',
      'gettext', 
      'auth0'
    ]
  )
  .config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    
    console.log('configuring dashboard module')
    
    $stateProvider
      .state('dashboard', {
        parent: 'default',
        url: '/home',
        templateUrl: 'scripts/modules/dashboard/views/dashboard.html',
        // controller: 'DashboardCtrl'
      });

  }]);