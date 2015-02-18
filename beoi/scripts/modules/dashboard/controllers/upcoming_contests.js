'use strict';

angular
  .module(
    'beoi.modules.main'
  )
  .controller(
    'UpcomingContestsCtrl', [
      '$http', '$scope',
      function ($http, $scope) {
        $scope.title = "AAAAAAAAAH!";
        $scope.results = [1,2];
        $http.get('/api/upcoming-contests', {})
          .success(function(data){
            $scope.results = data;
          });
      }
    ]
  );

