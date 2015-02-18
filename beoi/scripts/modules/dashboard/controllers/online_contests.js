'use strict';

angular
  .module(
    'beoi.modules.main'
  )
  .controller(
    'OnlineContestsCtrl', [
      '$http', '$scope',
      function ($http, $scope) {
        $scope.results = [1,2];
        $http.get('/api/online-results', {})
          .success(function(data){
            $scope.results = data;
          });
      }
    ]
  );

