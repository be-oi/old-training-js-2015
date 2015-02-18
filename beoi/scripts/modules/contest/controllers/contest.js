'use strict';

angular
  .module(
    'beoi.modules.contest'
  )
  .controller(
    'ContestCtrl', [
    '$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http) {
      $scope.contest_id = $stateParams.contest_id;
      $scope.contest = { name: "Loading ..."};

      $http.get("/api/contest/"+$stateParams.contest_id, {})
        .success(function(data){
          $scope.contest = data;
        });

    }
  ]);
