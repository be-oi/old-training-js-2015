'use strict';

angular
  .module(
    'beoi.modules.contestant'
  )
  .controller(
    'ContestantCtrl', [
    '$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {
      $scope.contestant_id = $stateParams.contestant_id;
      $scope.contestant = { name: "Loading ..."};

      $http.get("/api/contestant/"+$stateParams.contestant_id, {})
        .success(function(data){
          $scope.contestant = data;
        });

    }
  ]);
