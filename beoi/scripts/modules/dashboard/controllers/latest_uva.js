'use strict';

angular
  .module(
    'beoi.modules.main'
  )
  .controller(
    'LatestUVACtrl', [
      '$http', '$scope', '$log',
      function ($http, $scope, $log) {

        $scope.submit_uva_username = function() {
          var uva_username = $('#modal-uva-username').val();
          $http.get('http://uhunt.felix-halim.net/api/uname2uid/'+uva_username)
          .success(function(data){
            var userid = parseInt(data)
            if (userid > 0) {
              $http.post("/api/users/me", { 
                uva_user_id: userid
              }).
              success(function(data, status, headers, config) {
                $log.debug("/api/users/me ");
                alert("Thank you. Now refresh the page to appear in the list. (no, auto-refresh is not implemeted for now ;-)) ")
              });

            } else {
              alert("Invalid username")
            }
          })
        };


        $http.get('/api/uva_problems', {})
          .success(function(data){

            $scope.problem_sets = data;
            $scope.uva_pids = _.pluck(_.flatten(_.pluck(data,'problems')),'uva_pid');

            $http.get('/api/users-uva-ids', {})
              .success(function(data){
                var users = data;
                var uva_users_ids_csv = _.pluck(users, 'uva_user_id').join();
                var uva_pids_csv = $scope.uva_pids.join();
                $http.get('http://uhunt.felix-halim.net/api/subs-pids/'+uva_users_ids_csv+'/'+uva_pids_csv , {})
                  .success(function(data){

                    $scope.uva_results = _.map(users, function(user) {
                      var RESULT_NONE = 0, RESULT_TRIED = 1, RESULT_SUCCEEDED = 2;
                      var uva_user_id = user["uva_user_id"];
                      var user_submissions = data[uva_user_id]["subs"];
                      var user_results_list = _.map($scope.uva_pids, function(pid){
                        return _.reduce(user_submissions, function(memo, result) {
                          function compResult(verdictId) {
                            if (verdictId == 90) return RESULT_SUCCEEDED;
                            else return RESULT_TRIED;
                          }
                          return _.max([memo, (result[1] == pid)? compResult(result[2]) : RESULT_NONE]);
                        }, RESULT_NONE);
                      });
                      var user_results = _.object($scope.uva_pids, user_results_list);
                      return {
                        name: user["name"],
                        uva_user_id: uva_user_id,
                        uva_problem_results: user_results
                      }
                    });
                  });   

              });

            $scope.uva_problems = {};
            _.each($scope.uva_pids, function(pid){
              $http.get('http://uhunt.felix-halim.net/api/p/id/'+pid)
                .success(function(data){
                  var section = Math.floor(data.num/100);
                  data.ext_problem_url1 = 'http://uva.onlinejudge.org/external/'+section+'/'+data.num+'.html';
                  data.ext_problem_url2 = 'http://acm.uva.es/p/v'+section+'/'+data.num+'.html';
                  data.problem_url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem='+data.pid;
                  data.submit_url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=submit_problem&problemid='+data.pid+'&category=24';
                  data.stats_url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=problem_stats&problemid='+data.pid+'&category=24';
                  $scope.uva_problems[pid] = data;
                });
            });

          });

      }
    ]
  );

