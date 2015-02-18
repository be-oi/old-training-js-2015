'use strict';

angular
  .module(
    'beoi.modules.contestant', 
    [
      'ui.router',
      'ngRoute'
    ]
  )
  .config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      
      $stateProvider
        .state('contestant', {
          parent: 'default',
          url: '/contestant/:contestant_id',
          templateUrl: 'scripts/modules/contestant/views/contestant.html',
          controller: 'ContestantCtrl'
        });
  
    }]);