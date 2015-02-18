'use strict';

angular
  .module(
    'beoi.modules.main'
  )
  .controller(
    'MainCtrl', [
    '$scope', 'auth', '$location', 'store', '$http', '$log',
    function ($scope, auth, $location, store, $http, $log) {

      $scope.auth = auth;

      $('#myModal').on('hidden.bs.modal', function (e) {
        $scope.logout();
      });

      $scope.signup_step1 = function() { 
        auth.signin({
          popup: true,
        }, function(profile, id_token, access_token, state, refresh_token) {
          store.set('profile', profile);
          store.set('token', id_token);
          $log.debug("auth0 login success (a)");
          $('#signup-token-modal').modal();
        }, function(err) {
          $log.debug("auth0 login failure");
        });
      };

      $scope.submit_token = function() {
        var signup_token = $('#modal-token').val();
        $http.post("/api/signup", { 
            token: signup_token,
            email: auth.profile.email,
            social_name: auth.profile.name,
            social_picture: auth.profile.picture
          }).
          success(function(data, status, headers, config) {
            $log.debug("/api/signup success ");
            $scope.connect();
          }).
          error(function(data, status, headers, config) {
            $log.debug("/api/signup error: "+status);
            if (status == 403) {
              alert("Wrong token");
            }
            else if (status == 418) {
              alert("Already signed in, just log in");
            }

            $scope.logout();
          });
        $('#signup-token-modal').modal('hide');
      } 

      $scope.login = function() {
        auth.signin({
          popup: true,
        }, function(profile, id_token, access_token, state, refresh_token) {
          store.set('profile', profile);
          store.set('token', id_token);
          $log.debug("auth0 login success (b)");
          $scope.connect();
        }, function(err) {
          $log.debug("auth0 login failure");
          delete $scope.user 
        });
      };

      $scope.connect = function() {
        $http.post("/api/me", {
            email: auth['profile']["email"],
            name: auth['profile']["name"],
            picture: auth['profile']["picture"]
          })
          .success(function(data, status, headers, config) {
            $log.debug("/api/me success: "+JSON.stringify(data));
            $scope.user = data
            store.set('user', data);
          })
          .error(function(data, status, headers, config) {
            $log.debug("/api/me error: "+status);
            if (status == 403) {
              alert("Cannot log in. Have you signed up?")
            } else {
              alert("Hum something went wrong... ")
            }
            $scope.logout();
          });
      };

      $scope.logout = function() {
        $log.debug("logout");
        delete $scope.user 
        store.remove('user');
        auth.signout();
      };

    }
  ]);
