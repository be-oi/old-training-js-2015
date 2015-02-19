'use strict';

angular
  .module(
    'beoi.modules.main', 
    [
      'ui.router',
      'ngAnimate',
      'ngCookies',
      'ngResource',
      // 'ngRoute',
      'ngSanitize',
      'ngTouch',
      'gettext', 
      'auth0',
      'angular-jwt',
      'angular-storage'
    ]
  )
  .config([
    '$stateProvider', '$urlRouterProvider', '$httpProvider', 'jwtInterceptorProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, jwtInterceptorProvider) {
    
    console.log('configuring main module')
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('default', {
        // url: '/home',
        templateUrl: 'scripts/modules/main/views/main.html',
        controller: 'MainCtrl'
      });

      jwtInterceptorProvider.tokenGetter = function(config, auth) {
        if (config.url.indexOf('//localhost') > 0 || config.url.indexOf('.be-oi.be/') > 0 || config.url.indexOf('/api/') == 0) {
          return auth.idToken;
        } else {
          return
        }
      }
      $httpProvider.interceptors.push('jwtInterceptor');

    // $stateProvider
    //   .state('default', {
    //     templateUrl: 'scripts/modules/main/views/main.html',
    //     controller: 'MainCtrl'
    //   })
    
  }])
  .run([
    '$rootScope', 'auth', 'store', 'jwtHelper', '$location',
    function($rootScope, auth, store, jwtHelper, $location) {
    var refreshingToken = null;
    $rootScope.$on('$locationChangeStart', function() {
      var user = store.get('user');
      $rootScope.user = user; 
      if (!auth.isAuthenticated) {
        var token = store.get('token');
        var refreshToken = store.get('refreshToken');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            auth.authenticate(store.get('profile'), token);
          } else {
            if (refreshToken) {
              if (refreshingToken === null) {
                  refreshingToken =  auth.refreshIdToken(refreshToken).then(function(idToken) {
                    store.set('token', idToken);
                    auth.authenticate(store.get('profile'), idToken);
                  }).finally(function() {
                      refreshingToken = null;
                  });
              }
              return refreshingToken;
            } else {
              // $location.path('/login');
            }
          }
        }
      }

    });
  }]);
